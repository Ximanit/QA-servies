import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUserTicketsQuery } from '../../features/tickets/ticketsApi';
import {
	Box,
	Card,
	CardHeader,
	CardContent,
	Typography,
	Grid,
	CircularProgress,
} from '@mui/material';

const TicketsListPage = () => {
	const navigate = useNavigate();
	const userId = useSelector((state) => state.auth.id);
	const { data: tickets = [], isLoading: ticketsLoading } =
		useGetUserTicketsQuery(userId);

	const handleCardClick = (ticketId) => {
		navigate(`/tickets/${ticketId}`);
	};

	if (ticketsLoading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}>
				<CircularProgress />
				<Typography sx={{ ml: 2 }}>Загрузка...</Typography>
			</Box>
		);
	}

	const inProgressTickets = tickets.filter(
		(ticket) =>
			ticket.status === 'В работе' && ticket.assignedTo?._id === userId
	);

	return (
		<Box sx={{ p: 2.5 }}>
			<Typography variant="h5" gutterBottom>
				Заявки в работе
			</Typography>
			<Grid container spacing={3}>
				{inProgressTickets.map((ticket) => (
					<Grid item xs={12} sm={6} md={4} key={ticket._id}>
						<Card
							sx={{
								cursor: 'pointer',
								minWidth: 340, // Увеличиваем минимальную ширину
								minHeight: 220, // Увеличиваем минимальную высоту
								'&:hover': {
									boxShadow: 8, // Усиленный эффект наведения
								},
							}}
							onClick={() => handleCardClick(ticket._id)}>
							<CardHeader
								title={ticket.title}
								titleTypographyProps={{ variant: 'h5' }} // Увеличенный заголовок
								action={
									<Typography variant="body1">{ticket.status}</Typography>
								}
								sx={{ pb: 1 }} // Меньший отступ снизу для плотности
							/>
							<CardContent sx={{ pt: 1, pb: 2 }}>
								<Typography
									variant="body1"
									color="text.secondary"
									sx={{ mb: 1 }}>
									<strong>Автор:</strong> {ticket.author?.username}
								</Typography>
								<Typography
									variant="body1"
									color="text.secondary"
									sx={{ mb: 1 }}>
									<strong>Исполнитель:</strong> {ticket.assignedTo?.username}
								</Typography>
								<Typography variant="body1" color="text.secondary">
									<strong>Дата создания:</strong>{' '}
									{new Date(ticket.createdAt).toLocaleDateString()}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default TicketsListPage;
