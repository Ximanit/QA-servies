// src/pages/CreateTicketPage.jsx
import React from 'react';
import { Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCreateTicketMutation } from '../components/features/tickets/ticketsApi';
import { useGetUsersQuery } from '../components/features/auth/authApi';
import TicketForm from '../components/features/tickets/components/TicketForm';

const CreateTicketPage = () => {
	const navigate = useNavigate();
	const [createTicket, { isLoading }] = useCreateTicketMutation();
	const { data: users, isLoading: usersLoading } = useGetUsersQuery();

	const onSubmit = async (values) => {
		try {
			const newTicket = await createTicket(values).unwrap();
			message.success('Заявка успешно создана!');
			navigate(`/tickets/${newTicket._id}`);
		} catch (error) {
			message.error('Ошибка при создании заявки');
		}
	};

	if (usersLoading) return <div>Загрузка пользователей...</div>;

	return (
		<Card title="Создать заявку" style={{ maxWidth: 600, margin: 'auto' }}>
			<TicketForm onSubmit={onSubmit} users={users} isLoading={isLoading} />
		</Card>
	);
};

export default CreateTicketPage;
