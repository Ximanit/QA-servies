// src/layouts/MainLayout.jsx
import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';
import { useGetUserTicketsQuery } from '../features/tickets/ticketsApi';
import { useSocket } from '../hooks/useSocket';
import { useNotifications } from '../hooks/useNotifications';
import { formatMenuItems } from '../features/tickets/utils';
import { Box, CssBaseline } from '@mui/material';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

const MainLayout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const userId = useSelector((state) => state.auth.id);
	const { data: userTickets = [], isLoading } = useGetUserTicketsQuery(userId);
	const { notifications: socketNotifications } = useSocket(null, userId);
	const apiNotifications = useNotifications();

	if (isLoading) return <div>Загрузка...</div>;

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate('/auth/login');
	};

	const combinedNotifications = {
		...socketNotifications,
		...(apiNotifications?.reduce((acc, notif) => {
			acc[notif.ticket._id] = (acc[notif.ticket._id] || 0) + 1;
			return acc;
		}, {}) || {}),
	};

	const menuItems = formatMenuItems(
		userTickets,
		userId,
		combinedNotifications,
		apiNotifications
	);
	const currentTicketId = location.pathname.split('/tickets/')[1];

	return (
		<Box sx={{ display: 'flex', minHeight: '100vh' }}>
			<CssBaseline />
			<Header onLogout={handleLogout} />
			<Sidebar items={menuItems} selectedKeys={[currentTicketId]} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					mt: '64px', // Отступ для фиксированного хедера
					backgroundColor: '#fafafa', // Лёгкий серый фон для карточки
					boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Тень для глубины
				}}>
				<Outlet />
			</Box>
		</Box>
	);
};

export default MainLayout;
