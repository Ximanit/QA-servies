import React, { useState } from 'react';
import {
	Box,
	Button,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Typography,
} from '@mui/material';
import { useGetUsersQuery } from '../../auth/authApi';

const TicketActions = ({ ticket, onAssign, onAccept, onComplete }) => {
	const { data: users, isLoading: usersLoading } = useGetUsersQuery();
	const [selectedUser, setSelectedUser] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);

	const handleAssign = (value) => {
		setSelectedUser(value);
		setOpenDialog(true);
	};

	const handleConfirmAssign = () => {
		onAssign(selectedUser);
		setSelectedUser(null);
		setOpenDialog(false);
	};

	const handleCancelAssign = () => {
		setSelectedUser(null);
		setOpenDialog(false);
	};

	return (
		<Box sx={{ mt: 3 }}>
			<Typography variant="h6" gutterBottom>
				Действия с заявкой
			</Typography>
			<Box sx={{ display: 'flex', gap: 2 }}>
				{ticket?.status === 'Открыта' ? (
					<>
						<Button
							variant="contained"
							color="primary"
							onClick={onAccept}
							sx={{ minWidth: 120 }}>
							Принять заявку
						</Button>
						<FormControl sx={{ minWidth: 200 }}>
							<InputLabel>Передать исполнителю</InputLabel>
							<Select
								value={selectedUser || ''}
								onChange={(e) => handleAssign(e.target.value)}
								disabled={usersLoading}
								label="Передать исполнителю">
								{users?.map((user) => (
									<MenuItem key={user._id} value={user._id}>
										{user.username}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</>
				) : (
					<Button
						variant="contained"
						color="primary"
						onClick={onComplete}
						disabled={ticket?.status === 'Закрыта'}
						sx={{ minWidth: 120 }}>
						Завершить заявку
					</Button>
				)}
			</Box>

			<Dialog open={openDialog} onClose={handleCancelAssign}>
				<DialogTitle>Подтверждение передачи заявки</DialogTitle>
				<DialogContent>
					<Typography>
						Вы уверены, что хотите передать заявку пользователю{' '}
						{users?.find((u) => u._id === selectedUser)?.username}?
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancelAssign} color="secondary">
						Отмена
					</Button>
					<Button onClick={handleConfirmAssign} color="primary">
						Да, передать
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default TicketActions;
