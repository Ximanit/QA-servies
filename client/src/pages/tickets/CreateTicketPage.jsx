import React, { useState } from 'react';
import {
	Card,
	CardHeader,
	CardContent,
	CircularProgress,
	Box,
	Snackbar,
	Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCreateTicketMutation } from '../../features/tickets/ticketsApi';
import { useGetUsersQuery } from '../../features/auth/authApi';
import TicketForm from '../../features/tickets/components/TicketForm';

const CreateTicketPage = () => {
	const navigate = useNavigate();
	const [createTicket, { isLoading }] = useCreateTicketMutation();
	const { data: users, isLoading: usersLoading } = useGetUsersQuery();
	const [alert, setAlert] = useState({
		open: false,
		message: '',
		severity: 'success',
	});

	const onSubmit = async (values) => {
		try {
			const newTicket = await createTicket(values).unwrap();
			setAlert({
				open: true,
				message: 'Заявка успешно создана!',
				severity: 'success',
			});
			navigate(`/tickets/${newTicket._id}`);
		} catch (error) {
			setAlert({
				open: true,
				message: 'Ошибка при создании заявки',
				severity: 'error',
			});
		}
	};

	const handleCloseAlert = () => {
		setAlert({ ...alert, open: false });
	};

	if (usersLoading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<>
			<Card sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
				<CardHeader title="Создать заявку" />
				<CardContent>
					<TicketForm onSubmit={onSubmit} users={users} isLoading={isLoading} />
				</CardContent>
			</Card>
			<Snackbar
				open={alert.open}
				autoHideDuration={6000}
				onClose={handleCloseAlert}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<Alert
					onClose={handleCloseAlert}
					severity={alert.severity}
					sx={{ width: '100%' }}>
					{alert.message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default CreateTicketPage;
