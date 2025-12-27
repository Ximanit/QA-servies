import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUserTicketsQuery } from '../../features/tickets/ticketsApi';
import { useNotifications } from '../../hooks/useNotifications'; // Импортируем хук уведомлений
import {
	Box,
	Typography,
	TextField,
	Select,
	MenuItem,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	Divider,
	Chip,
	Tabs,
	Tab,
	Badge, // Добавляем Badge для отображения уведомлений
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';
import {
	filterTickets,
	getStatusStyles,
	getPriorityStyles,
} from '../../features/tickets/utils';

const TicketsListPage = () => {
	const navigate = useNavigate();
	const userId = useSelector((state) => state.auth.id);
	const { data: tickets = [] } = useGetUserTicketsQuery(userId);
	const notifications = useNotifications(); // Получаем уведомления
	const [search, setSearch] = useState('');
	const [statusFilter, setStatusFilter] = useState('Все статусы');
	const [priorityFilter, setPriorityFilter] = useState('Все приоритеты');
	const [activeTab, setActiveTab] = useState(0);

	const handleCardClick = useCallback(
		(ticketId) => {
			navigate(`/tickets/${ticketId}`);
		},
		[navigate]
	);

	const handleCreateTicket = useCallback(() => {
		navigate('/tickets/create-ticket');
	}, [navigate]);

	const handleTabChange = useCallback((event, newValue) => {
		setActiveTab(newValue);
	}, []);

	// Подсчет непрочитанных уведомлений для каждой заявки
	const getNotificationCount = useCallback(
		(ticketId) => {
			return notifications.filter(
				(notification) =>
					notification.ticket?._id === ticketId && !notification.isRead
			).length;
		},
		[notifications]
	);

	const filteredTickets = useMemo(() => {
		return filterTickets(
			tickets,
			userId,
			activeTab === 1,
			search,
			statusFilter,
			priorityFilter
		);
	}, [tickets, userId, activeTab, search, statusFilter, priorityFilter]);

	return (
		<Box
			component={motion.div}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: 'easeInOut' }}
			sx={{ p: { xs: 2, sm: 3 } }}>
			{/*Заголовок*/}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 3,
				}}>
				<Typography variant="h5" fontWeight={600}>
					Заявки
				</Typography>
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					onClick={handleCreateTicket}
					sx={{
						borderRadius: '8px',
					}}>
					Новая заявка
				</Button>
			</Box>

			{/* Вкладки */}
			<Tabs
				value={activeTab}
				onChange={handleTabChange}
				sx={{ mb: 3 }}
				aria-label="Переключение между созданными и полученными заявками">
				<Tab label="Полученные" />
				<Tab label="Созданные" />
			</Tabs>

			{/* Поиск и фильтры */}
			<Box
				sx={{
					display: 'flex',
					gap: 2,
					mb: 3,
					flexWrap: 'wrap',
				}}>
				<TextField
					placeholder="Поиск заявок..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					sx={{ flex: '1 1 300px', minWidth: '200px' }}
				/>
				<Select
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
					sx={{ width: '200px' }}>
					<MenuItem value="Все статусы">Все статусы</MenuItem>
					<MenuItem value="Открыта">Открыта</MenuItem>
					<MenuItem value="В работе">В работе</MenuItem>
					<MenuItem value="Закрыта">Закрыта</MenuItem>
				</Select>
				<Select
					value={priorityFilter}
					onChange={(e) => setPriorityFilter(e.target.value)}
					sx={{ width: '200px' }}>
					<MenuItem value="Все приоритеты">Все приоритеты</MenuItem>
					<MenuItem value="Низкий">Низкий</MenuItem>
					<MenuItem value="Средний">Средний</MenuItem>
					<MenuItem value="Высокий">Высокий</MenuItem>
				</Select>
			</Box>

			{/* Tickets List */}
			{filteredTickets.length === 0 ? (
				<Typography color="text.secondary" sx={{ mt: 2 }}>
					Заявки не найдены.
				</Typography>
			) : (
				<List
					sx={{
						bgcolor: 'background.paper',
						borderRadius: '8px',
						boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
					}}>
					{filteredTickets.map((ticket, index) => {
						const notificationCount = getNotificationCount(ticket._id);
						return (
							<React.Fragment key={ticket._id}>
								<ListItem disablePadding>
									<ListItemButton
										onClick={() => handleCardClick(ticket._id)}
										sx={{
											'&:hover': {
												bgcolor: 'grey.100',
											},
										}}>
										<ListItemText
											primary={
												<Box sx={{ display: 'flex', alignItems: 'center' }}>
													<Typography
														variant="body1"
														fontWeight={500}
														sx={{ mb: 0.5 }}>
														{ticket.title}
													</Typography>
													{notificationCount > 0 && (
														<Badge
															badgeContent={notificationCount}
															color="error"
															sx={{
																ml: 2,
																'& .MuiBadge-badge': {
																	fontSize: '0.75rem',
																	height: '20px',
																	minWidth: '20px',
																	borderRadius: '10px',
																},
															}}
														/>
													)}
												</Box>
											}
											secondary={
												<Typography
													variant="body2"
													color="text.secondary"
													sx={{ maxWidth: '60%' }}>
													{ticket.description || 'Нет описания'}
												</Typography>
											}
										/>
										<Box
											sx={{
												display: 'flex',
												gap: 2,
												alignItems: 'center',
											}}>
											<Chip
												label={ticket.status}
												sx={{
													...getStatusStyles(ticket.status),
													borderRadius: '4px',
													fontWeight: 500,
												}}
											/>
											<Chip
												label={ticket.priority}
												sx={{
													...getPriorityStyles(ticket.priority),
													borderRadius: '4px',
													fontWeight: 500,
												}}
											/>
											<Typography
												variant="body2"
												color="text.secondary"
												sx={{ minWidth: '100px', textAlign: 'right' }}>
												{new Date(ticket.createdAt).toLocaleDateString()}
											</Typography>
										</Box>
									</ListItemButton>
								</ListItem>
								{index < filteredTickets.length - 1 && (
									<Divider sx={{ my: 1, borderColor: 'grey.200' }} />
								)}
							</React.Fragment>
						);
					})}
				</List>
			)}
		</Box>
	);
};

export default TicketsListPage;
