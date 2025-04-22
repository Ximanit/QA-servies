import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCreateTicketMutation } from '../../features/tickets/ticketsApi';
import { useGetUsersQuery } from '../../features/auth/authApi';
import TicketForm from '../../features/tickets/components/TicketForm';
import { useToast } from '../../utils/ToastContext';

const CreateTicketPage = () => {
	const navigate = useNavigate();
	const [createTicket, { isLoading: createLoading }] =
		useCreateTicketMutation();
	const { data: users, isLoading: usersLoading } = useGetUsersQuery();
	const { showToast } = useToast();

	const handleSubmit = async (values) => {
		try {
			const newTicket = await createTicket(values).unwrap();
			showToast('Заявка успешно создана!', 'success');
			navigate(`/tickets/${newTicket._id}`);
		} catch (error) {
			showToast(error.data?.message || 'Ошибка при создании заявки', 'error');
		}
	};

	return (
		<Box
			component={motion.div}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: 'easeInOut' }}
			sx={{ maxWidth: 850, mt: 3, px: 3 }}>
			<Link
				href="#"
				onClick={() => window.history.back()}
				sx={{
					display: 'block',
					mb: 2,
					color: '#1976d2',
					textDecoration: 'none',
				}}>
				← Назад
			</Link>
			<Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
				Создать заявку
			</Typography>
			<TicketForm
				onSubmit={handleSubmit}
				users={users}
				isLoading={createLoading}
			/>
		</Box>
	);
};

export default CreateTicketPage;
