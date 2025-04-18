import React, { useState } from 'react';
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

const TicketDetailsAndActions = ({ ticket }) => {
	const [priority, setPriority] = useState(ticket?.priority || 'Средний');
	const [status, setStatus] = useState(ticket?.status || 'Новая');
	const [isLoadingStatus, setIsLoadingStatus] = useState(false);
	const [isLoadingPriority, setIsLoadingPriority] = useState(false);

	const handleStatusChange = async (value) => {
		const previousStatus = status;
		setStatus(value);
		setIsLoadingStatus(true);

		try {
			const response = await fetch(`${API_URL}/tickets/${ticket._id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					// Если нужен токен авторизации, раскомментируйте и замените 'YOUR_TOKEN' на реальный токен
					// Authorization: `Bearer ${YOUR_TOKEN}`,
				},
				body: JSON.stringify({ status: value }),
			});

			if (!response.ok) {
				throw new Error('Ошибка при обновлении статуса');
			}

			// Успешное обновление, ничего не делаем, так как состояние уже обновлено
		} catch (error) {
			console.error('Ошибка:', error);
			setStatus(previousStatus); // Откатываем состояние при ошибке
			alert('Не удалось обновить статус. Попробуйте снова.');
		} finally {
			setIsLoadingStatus(false);
		}
	};

	const handlePriorityChange = async (value) => {
		const previousPriority = priority;
		setPriority(value);
		setIsLoadingPriority(true);

		try {
			const response = await fetch(`${API_URL}/tickets/${ticket._id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					// Если нужен токен авторизации, раскомментируйте и замените 'YOUR_TOKEN' на реальный токен
					// Authorization: `Bearer ${YOUR_TOKEN}`,
				},
				body: JSON.stringify({ priority: value }),
			});

			if (!response.ok) {
				throw new Error('Ошибка при обновлении приоритета');
			}

			// Успешное обновление, ничего не делаем, так как состояние уже обновлено
		} catch (error) {
			console.error('Ошибка:', error);
			setPriority(previousPriority); // Откатываем состояние при ошибке
			alert('Не удалось обновить приоритет. Попробуйте снова.');
		} finally {
			setIsLoadingPriority(false);
		}
	};

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
				{/* //TODO доделать отправку на сервер нормально */}
				<FormControl fullWidth>
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
				<FormControl fullWidth>
					<InputLabel>Приоритет</InputLabel>
					<Select
						value={priority}
						onChange={(e) => handlePriorityChange(e.target.value)}
						label="Приоритет"
						sx={{ borderRadius: 1 }}
						disabled={isLoadingPriority}>
						<MenuItem value="Низкий">Низкий</MenuItem>
						<MenuItem value="Средний">Средний</MenuItem>
						<MenuItem value="Высокий">Высокий</MenuItem>
					</Select>
					{isLoadingPriority && (
						<CircularProgress
							size={20}
							sx={{ position: 'absolute', right: 10, top: 18 }}
						/>
					)}
				</FormControl>
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
			</Box>
		</Card>
	);
};

export default TicketDetailsAndActions;
