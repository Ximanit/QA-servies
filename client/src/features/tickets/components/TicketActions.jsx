// src/components/features/tickets/components/TicketActions.jsx
import React, { useState } from 'react';
import { Button, Select, Modal } from 'antd';
import { useGetUsersQuery } from '../../auth/authApi';

const { confirm } = Modal;

const TicketActions = ({ ticket, onAssign, onAccept, onComplete }) => {
	const { data: users, isLoading: usersLoading } = useGetUsersQuery();
	const [selectedUser, setSelectedUser] = useState(null); // Состояние для выбранного исполнителя

	const userOptions = users?.map((user) => ({
		label: user.username,
		value: user._id,
	}));

	const handleAssign = (value) => {
		setSelectedUser(value); // Сохраняем выбранного пользователя
		confirm({
			title: 'Подтверждение передачи заявки',
			content: (
				<div>
					Вы уверены, что хотите передать заявку пользователю{' '}
					{users.find((u) => u._id === value)?.username}?
				</div>
			),
			okText: 'Да, передать',
			cancelText: 'Отмена',
			onOk() {
				onAssign(value); // Выполняем передачу после подтверждения
				setSelectedUser(null); // Сбрасываем выбор
			},
			onCancel() {
				setSelectedUser(null); // Сбрасываем выбор при отмене
			},
		});
	};

	return (
		<div style={{ marginTop: 20 }}>
			<h3>Действия с заявкой</h3>
			<div style={{ display: 'flex', gap: 10 }}>
				{ticket?.status === 'Открыта' ? (
					<>
						<Button type="primary" onClick={onAccept}>
							Принять заявку
						</Button>
						<Select
							style={{ width: 200 }}
							placeholder="Передать исполнителю"
							options={userOptions}
							loading={usersLoading}
							value={selectedUser}
							onChange={handleAssign}
						/>
					</>
				) : (
					<Button
						type="primary"
						onClick={onComplete}
						disabled={ticket?.status === 'Закрыта'}>
						Завершить заявку
					</Button>
				)}
			</div>
		</div>
	);
};

export default TicketActions;
