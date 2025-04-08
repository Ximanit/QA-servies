// src/layouts/MainLayout.jsx
import React from 'react';
import { Layout } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';
import { useGetUserTicketsQuery } from '../components/features/tickets/ticketsApi';
import { useSocket } from '../hooks/useSocket';
import { useNotifications } from '../hooks/useNotifications';
import { formatMenuItems } from '../components/features/tickets/utils';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

const { Content } = Layout;

const MainLayout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const userId = useSelector((state) => state.auth.id);
	const { data: userTickets = [], isLoading } = useGetUserTicketsQuery(userId); // Массив по умолчанию
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
		<Layout style={{ minHeight: '100vh' }}>
			<Header onLogout={handleLogout} />
			<Layout>
				<Sidebar items={menuItems} selectedKeys={[currentTicketId]} />
				<Content style={{ padding: '24px' }}>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
