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
import { motion } from 'framer-motion';
import { useCreateTicketMutation } from '../../features/tickets/ticketsApi';
import { useGetUsersQuery } from '../../features/auth/authApi';
import TicketForm from '../../features/tickets/components/TicketForm';

const CreateTicketPage = () => {
	const navigate = useNavigate();
	const [createTicket, { isLoading: createLoading }] =
		useCreateTicketMutation();
	const { data: users, isLoading: usersLoading } = useGetUsersQuery();
	const [alert, setAlert] = useState({
		open: false,
		message: '',
		severity: 'success',
	});

	const handleSubmit = async (values) => {
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
				message: error.data?.message || 'Ошибка при создании заявки',
				severity: 'error',
			});
		}
	};

	const handleCloseAlert = () => {
		setAlert({ ...alert, open: false });
	};

	return (
		<Box
			component={motion.div}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: 'easeInOut' }}
			sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
			<Card sx={{ boxShadow: 3 }}>
				<CardHeader
					title="Создать заявку"
					titleTypographyProps={{ fontWeight: 600 }}
				/>
				<CardContent>
					<TicketForm
						onSubmit={handleSubmit}
						users={users}
						isLoading={createLoading}
					/>
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
					sx={{
						width: '100%',
						borderRadius: 2,
						bgcolor:
							alert.severity === 'success' ? 'success.light' : 'error.light',
					}}>
					{alert.message}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default CreateTicketPage;
