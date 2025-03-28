// src/pages/TicketsListPage.jsx
import React, { useState } from 'react';
import { Card, List, Button, Modal, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
	useGetTicketsQuery,
	useUpdateTicketMutation,
} from '../store/api/ticketsApi';
import { useGetUsersQuery } from '../store/api/authApi';

const TicketsListPage = () => {
	const navigate = useNavigate();
	const { data: tickets, isLoading: ticketsLoading } = useGetTicketsQuery();
	const { data: users, isLoading: usersLoading } = useGetUsersQuery();
	const [updateTicket] = useUpdateTicketMutation();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedTicketId, setSelectedTicketId] = useState(null);
	const [newAssignedTo, setNewAssignedTo] = useState(null);

	const handleAccept = async (ticketId) => {
		try {
			await updateTicket({ id: ticketId, status: 'В работе' }).unwrap();
			message.success('Заявка принята!');
		} catch (error) {
			message.error('Ошибка при принятии заявки');
		}
	};

	const showTransferModal = (ticketId) => {
		setSelectedTicketId(ticketId);
		setIsModalVisible(true);
	};

	const handleTransfer = async () => {
		if (!newAssignedTo) {
			message.error('Выберите нового исполнителя!');
			return;
		}
		try {
			await updateTicket({
				id: selectedTicketId,
				assignedTo: newAssignedTo,
			}).unwrap();
			message.success('Заявка передана!');
			setIsModalVisible(false);
			setNewAssignedTo(null);
			setSelectedTicketId(null);
		} catch (error) {
			message.error('Ошибка при передаче заявки');
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setNewAssignedTo(null);
		setSelectedTicketId(null);
	};

	const handleCardClick = (ticketId) => {
		navigate(`/tickets/${ticketId}`);
	};

	if (ticketsLoading || usersLoading) return <div>Загрузка...</div>;

	const userOptions = users?.map((user) => ({
		label: user.username,
		value: user._id,
	}));

	return (
		<div style={{ padding: '20px' }}>
			<h2>Заявки в работе</h2>
			<List
				grid={{ gutter: 16, column: 3 }}
				dataSource={tickets?.filter((ticket) => ticket.status !== 'Closed')}
				renderItem={(ticket) => (
					<List.Item>
						<Card
							title={ticket.title}
							extra={<span>{ticket.status}</span>}
							hoverable // Добавляет эффект при наведении
							onClick={() => handleCardClick(ticket._id)}>
							<p>
								<strong>Автор:</strong> {ticket.author?.username}
							</p>
							<p>
								<strong>Исполнитель:</strong> {ticket.assignedTo?.username}
							</p>
							<p>
								<strong>Дата создания:</strong>{' '}
								{new Date(ticket.createdAt).toLocaleDateString()}
							</p>
						</Card>
					</List.Item>
				)}
			/>
		</div>
	);
};

export default TicketsListPage;
