// src/pages/TicketsListPage.jsx
import React, { useState } from 'react';
import { Card, List, Button, Modal, Select, message } from 'antd';
import {
	useGetTicketsQuery,
	useUpdateTicketMutation,
} from '../store/api/ticketsApi';
import { useGetUsersQuery } from '../store/api/authApi';

const TicketsListPage = () => {
	const { data: tickets, isLoading: ticketsLoading } = useGetTicketsQuery();
	const { data: users, isLoading: usersLoading } = useGetUsersQuery();
	const [updateTicket] = useUpdateTicketMutation();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedTicketId, setSelectedTicketId] = useState(null);
	const [newAssignedTo, setNewAssignedTo] = useState(null);

	const handleAccept = async (ticketId) => {
		try {
			await updateTicket({ id: ticketId, status: 'In Progress' }).unwrap();
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

	if (ticketsLoading || usersLoading) return <div>Загрузка...</div>;

	const userOptions = users?.map((user) => ({
		label: user.username,
		value: user._id,
	}));

	return (
		<div style={{ padding: '20px' }}>
			<h2>Открытые заявки</h2>
			<List
				grid={{ gutter: 16, column: 3 }}
				dataSource={tickets?.filter((ticket) => ticket.status !== 'Closed')} // Показываем только открытые заявки
				renderItem={(ticket) => (
					<List.Item>
						<Card
							title={ticket.title}
							extra={<span>{ticket.status}</span>}
							actions={[
								<Button
									type="primary"
									onClick={() => handleAccept(ticket._id)}
									disabled={ticket.status === 'In Progress'}>
									Принять
								</Button>,
								<Button onClick={() => showTransferModal(ticket._id)}>
									Передать
								</Button>,
							]}>
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

			<Modal
				title="Передать заявку"
				open={isModalVisible}
				onOk={handleTransfer}
				onCancel={handleCancel}
				okText="Передать"
				cancelText="Отмена">
				<Select
					style={{ width: '100%' }}
					placeholder="Выберите нового исполнителя"
					options={userOptions}
					onChange={(value) => setNewAssignedTo(value)}
					value={newAssignedTo}
				/>
			</Modal>
		</div>
	);
};

export default TicketsListPage;
