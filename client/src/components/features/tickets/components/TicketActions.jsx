// src/components/features/tickets/components/TicketActions.jsx
import React from 'react';
import { Button, Select } from 'antd';
import { useGetUsersQuery } from '../../auth/authApi';

const TicketActions = ({ ticket, onAssign, onComplete }) => {
	const { data: users, isLoading: usersLoading } = useGetUsersQuery();

	const userOptions = users?.map((user) => ({
		label: user.username,
		value: user._id,
	}));

	const handleAssign = (value) => {
		onAssign(value);
	};

	return (
		<div style={{ marginTop: 20 }}>
			<h3>Действия с заявкой</h3>
			<div style={{ display: 'flex', gap: 10 }}>
				<Select
					style={{ width: 200 }}
					placeholder="Передать исполнителю"
					options={userOptions}
					loading={usersLoading}
					onChange={handleAssign}
					disabled={ticket?.status === 'Закрыта'}
				/>
				<Button
					type="primary"
					onClick={onComplete}
					disabled={ticket?.status === 'Закрыта'}>
					Завершить заявку
				</Button>
			</div>
		</div>
	);
};

export default TicketActions;
