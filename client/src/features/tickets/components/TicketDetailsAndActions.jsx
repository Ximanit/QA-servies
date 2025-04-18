import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Box,
	Card,
	Typography,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	List,
	ListItem,
	ListItemText,
	CircularProgress,
	Snackbar,
	Alert,
} from '@mui/material';
import { API_URL } from '../../../constants/constants';
import { useUpdateTicketMutation } from '../ticketsApi';
import { useGetUsersQuery } from '../../auth/authApi'; // Предполагаемый хук для получения пользователей

const TicketDetailsAndActions = ({ ticket }) => {
	const userId = useSelector((state) => state.auth.id);
	const [status, setStatus] = useState(ticket?.status || 'Новая');
	const [assignedTo, setAssignedTo] = useState(ticket?.assignedTo || '');
	const [isLoadingStatus, setIsLoadingStatus] = useState(false);
	const [isLoadingAssignedTo, setIsLoadingAssignedTo] = useState(false);
	const [alert, setAlert] = useState({
		open: false,
		message: '',
		severity: 'success',
	});

	const [updateTicket] = useUpdateTicketMutation();
	const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();

	const isCurrentAssignee = ticket?.assignedTo._id === userId;

	const handleStatusChange = async (value) => {
		const previousStatus = status;
		setStatus(value);
		setIsLoadingStatus(true);

		try {
			await updateTicket({ id: ticket._id, status: value }).unwrap();
			setAlert({
				open: true,
				message: 'Статус успешно обновлен!',
				severity: 'success',
			});
		} catch (error) {
			console.error('Ошибка при обновлении статуса:', error);
			setStatus(previousStatus);
			setAlert({
				open: true,
				message: error.data?.message || 'Не удалось обновить статус',
				severity: 'error',
			});
		} finally {
			setIsLoadingStatus(false);
		}
	};

	const handleAssignedToChange = async (value) => {
		const previousAssignedTo = assignedTo;
		setAssignedTo(value);
		setIsLoadingAssignedTo(true);

		try {
			await updateTicket({ id: ticket._id, assignedTo: value }).unwrap();
			setAlert({
				open: true,
				message: 'Исполнитель успешно обновлен!',
				severity: 'success',
			});
		} catch (error) {
			console.error('Ошибка при обновлении исполнителя:', error);
			setAssignedTo(previousAssignedTo);
			setAlert({
				open: true,
				message: error.data?.message || 'Не удалось обновить исполнителя',
				severity: 'error',
			});
		} finally {
			setIsLoadingAssignedTo(false);
		}
	};

	const handleCloseAlert = () => {
		setAlert({ ...alert, open: false });
	};

	// Фильтруем пользователей, исключая создателя заявки
	const availableUsers = users.filter(
		(user) => user._id !== ticket?.author?._id
	);

	return (
		<Card sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
			<Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
				{ticket?.title || 'Ошибка при создании отчета'}
			</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
					Описание
				</Typography>
				<Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
					{ticket?.description ||
						'При попытке сформировать отчет за март система выдает ошибку'}
				</Typography>

				<Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
					Категория
				</Typography>
				<Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
					{ticket?.category || 'Reports'}
				</Typography>

				<Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
					Дата создания
				</Typography>
				<Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
					{ticket?.createdAt
						? new Date(ticket.createdAt).toLocaleString()
						: '07 апреля 2025, 00:22'}
				</Typography>

				{ticket?.files?.length > 0 && (
					<>
						<Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
							Файлы
						</Typography>
						<List dense sx={{ mb: 2 }}>
							{ticket.files.map((file) => (
								<ListItem key={file.filename} sx={{ py: 0.5 }}>
									<ListItemText
										primary={
											<a
												href={`${API_URL}/uploads/${file.filename}`}
												target="_blank"
												rel="noopener noreferrer"
												style={{ color: '#1976d2', textDecoration: 'none' }}>
												{file.filename}
											</a>
										}
									/>
								</ListItem>
							))}
						</List>
					</>
				)}

				<FormControl fullWidth sx={{ position: 'relative' }}>
					<InputLabel>Статус</InputLabel>
					<Select
						value={status}
						onChange={(e) => handleStatusChange(e.target.value)}
						label="Статус"
						sx={{ borderRadius: 1 }}
						disabled={isLoadingStatus}>
						<MenuItem value="Новая">Новая</MenuItem>
						<MenuItem value="В работе">В работе</MenuItem>
						<MenuItem value="Закрыта">Закрыта</MenuItem>
					</Select>
					{isLoadingStatus && (
						<CircularProgress
							size={20}
							sx={{ position: 'absolute', right: 10, top: 18 }}
						/>
					)}
				</FormControl>

				{isCurrentAssignee && (
					<FormControl fullWidth sx={{ position: 'relative' }}>
						<InputLabel>Исполнитель</InputLabel>
						<Select
							value={assignedTo}
							onChange={(e) => handleAssignedToChange(e.target.value)}
							label="Исполнитель"
							sx={{ borderRadius: 1 }}
							disabled={isLoadingAssignedTo || usersLoading}>
							{availableUsers.map((user) => (
								<MenuItem key={user._id} value={user._id}>
									{user.username || user.fio || user.email}
								</MenuItem>
							))}
						</Select>
						{isLoadingAssignedTo && (
							<CircularProgress
								size={20}
								sx={{ position: 'absolute', right: 10, top: 18 }}
							/>
						)}
					</FormControl>
				)}

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
		</Card>
	);
};

export default TicketDetailsAndActions;
