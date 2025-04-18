import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Button, Box } from '@mui/material';
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
			sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
			<Button
				variant="text"
				onClick={() => window.history.back()}
				sx={{ mb: 2, textTransform: 'none' }}>
				&lt; Назад
			</Button>
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
		</Box>
	);
};

export default CreateTicketPage;
