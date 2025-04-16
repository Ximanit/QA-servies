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
import { motion } from 'framer-motion';

const TicketsListPage = () => {
	const navigate = useNavigate();
	const userId = useSelector((state) => state.auth.id);
	const { data: tickets = [], isLoading } = useGetUserTicketsQuery(userId);

	const handleCardClick = (ticketId) => {
		navigate(`/tickets/${ticketId}`);
	};

	if (isLoading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100vh',
				}}>
				<CircularProgress />
				<Typography sx={{ ml: 2 }}>Загрузка заявок...</Typography>
			</Box>
		);
	}

	const inProgressTickets = tickets.filter(
		(ticket) =>
			ticket.status === 'В работе' && ticket.assignedTo?._id === userId
	);

	return (
		<Box
			component={motion.div}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: 'easeInOut' }}
			sx={{ p: 3 }}>
			<Typography variant="h5" fontWeight={600} gutterBottom>
				Заявки в работе
			</Typography>
			{inProgressTickets.length === 0 ? (
				<Typography color="text.secondary" sx={{ mt: 2 }}>
					Нет заявок в работе.
				</Typography>
			) : (
				<Grid container spacing={3}>
					{inProgressTickets.map((ticket) => (
						<Grid item xs={12} sm={6} md={4} key={ticket._id}>
							<Card
								sx={{
									cursor: 'pointer',
									minHeight: 200,
									transition: 'all 0.2s ease',
									'&:hover': {
										boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
										transform: 'translateY(-2px)',
									},
								}}
								onClick={() => handleCardClick(ticket._id)}>
								<CardHeader
									title={ticket.title}
									titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
									action={
										<Typography variant="body2" color="text.secondary">
											{ticket.status}
										</Typography>
									}
								/>
								<CardContent>
									<Typography
										variant="body2"
										color="text.secondary"
										sx={{ mb: 1 }}>
										<strong>Автор:</strong>{' '}
										{ticket.author?.username || 'Неизвестно'}
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
										sx={{ mb: 1 }}>
										<strong>Исполнитель:</strong>{' '}
										{ticket.assignedTo?.username || 'Не назначен'}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										<strong>Дата создания:</strong>{' '}
										{new Date(ticket.createdAt).toLocaleDateString()}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			)}
		</Box>
	);
};

export default TicketsListPage;
