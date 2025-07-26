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
} from '@mui/material';
import { API_URL } from '../../../constants/constants';
import { useUpdateTicketMutation } from '../ticketsApi';
import { useGetUsersQuery } from '../../auth/authApi';
import { useToast } from '../../../utils/ToastContext';
import { TOAST_MESSAGES } from '../../../constants/messages';

const TicketDetailsAndActions = ({ ticket }) => {
	const userId = useSelector((state) => state.auth.id);
	const [status, setStatus] = useState(ticket?.status || 'Новая');
	const [assignedTo, setAssignedTo] = useState(ticket?.assignedTo?._id || '');
	const [isLoadingStatus, setIsLoadingStatus] = useState(false);
	const [isLoadingAssignedTo, setIsLoadingAssignedTo] = useState(false);
	const { showToast } = useToast();

	const [updateTicket] = useUpdateTicketMutation();
	const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();

	const isCurrentAssignee = ticket?.assignedTo?._id === userId;

	const handleStatusChange = async (value) => {
		const previousStatus = status;
		setStatus(value);
		setIsLoadingStatus(true);

		try {
			await updateTicket({ id: ticket._id, status: value }).unwrap();
			showToast(TOAST_MESSAGES.STATUS_SUCCESS, 'success');
		} catch (error) {
			setStatus(previousStatus);
			showToast(error.data?.message || TOAST_MESSAGES.ERROR_STATUS);
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
			showToast(TOAST_MESSAGES.ASIGNEDTO_UPDATE, 'success');
			window.history.back();
		} catch (error) {
			console.error('Ошибка при обновлении исполнителя:', error);
			setAssignedTo(previousAssignedTo);
			showToast(error.data?.message || TOAST_MESSAGES.ERROR_ASIGNEDTO);
		} finally {
			setIsLoadingAssignedTo(false);
		}
	};

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
					Приоритет
				</Typography>
				<Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
					{ticket?.priority}
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
						<MenuItem value="Открыта">Открыта</MenuItem>
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
			</Box>
		</Card>
	);
};

export default React.memo(TicketDetailsAndActions);
