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
			<Typography
				variant="h6"
				gutterBottom
				sx={{ fontWeight: 600, color: 'text.primary' }}>
				Действия с заявкой
			</Typography>
			<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
				{ticket?.status === 'Открыта' ? (
					<>
						<Button
							variant="contained"
							color="primary"
							onClick={onAccept}
							sx={{ minWidth: 120, borderRadius: 2 }}>
							Принять заявку
						</Button>
						<FormControl sx={{ minWidth: 200 }}>
							<InputLabel sx={{ color: 'text.primary' }}>
								Передать исполнителю
							</InputLabel>
							<Select
								value={selectedUser || ''}
								onChange={(e) => handleAssign(e.target.value)}
								disabled={usersLoading}
								label="Передать исполнителю"
								sx={{
									borderRadius: 2,
									bgcolor: 'background.paper',
								}}>
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
						color={ticket?.status === 'Закрыта' ? 'success' : 'success'}
						onClick={onComplete}
						disabled={ticket?.status === 'Закрыта'}
						sx={{ minWidth: 120, borderRadius: 2 }}>
						Завершить заявку
					</Button>
				)}
			</Box>

			<Dialog open={openDialog} onClose={handleCancelAssign}>
				<DialogTitle sx={{ bgcolor: 'primary.light', color: 'text.primary' }}>
					Подтверждение передачи заявки
				</DialogTitle>
				<DialogContent sx={{ bgcolor: 'background.paper', pt: 2 }}>
					<Typography color="text.primary">
						Вы уверены, что хотите передать заявку пользователю{' '}
						<strong>
							{users?.find((u) => u._id === selectedUser)?.username}
						</strong>
						?
					</Typography>
				</DialogContent>
				<DialogActions sx={{ bgcolor: 'background.paper' }}>
					<Button
						onClick={handleCancelAssign}
						color="secondary"
						sx={{ borderRadius: 2 }}>
						Отмена
					</Button>
					<Button
						onClick={handleConfirmAssign}
						color="primary"
						sx={{ borderRadius: 2 }}>
						Да, передать
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default TicketActions;
