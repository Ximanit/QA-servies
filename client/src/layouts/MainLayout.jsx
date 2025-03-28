import React, { useState, useEffect } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Badge } from 'antd';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';
import {
	useGetUserTicketsQuery,
	useGetUserNotificationsQuery,
} from '../store/api/ticketsApi';
import { formatMenuItems } from '../utils/utils';
import { io } from 'socket.io-client';
import { API_URL } from '../constants';

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const userId = useSelector((state) => state.auth.id);
	const { data: userTickets, isLoading: userTicketsLoading } =
		useGetUserTicketsQuery(userId);
	const {
		data: notifications,
		isLoading: notificationsLoading,
		refetch: refetchNotifications,
	} = useGetUserNotificationsQuery();
	const [newMessages, setNewMessages] = useState({});

	useEffect(() => {
		const socket = io(API_URL, { transports: ['websocket', 'polling'] });
		socket.on('connect', () => {
			console.log('Connected to Socket.IO server');
		});
		socket.on('newMessageNotification', ({ ticketId, recipientId }) => {
			console.log('Received newMessageNotification:', {
				ticketId,
				recipientId,
				userId,
			});
			if (recipientId === userId) {
				setNewMessages((prev) => ({
					...prev,
					[ticketId]: (prev[ticketId] || 0) + 1,
				}));
			}
		});
		socket.on('connect_error', (error) => {
			console.error('Socket.IO connection error:', error);
		});
		return () => socket.disconnect();
	}, [userId]);

	// Периодический запрос уведомлений каждые 10 секунд
	useEffect(() => {
		const interval = setInterval(() => {
			refetchNotifications();
		}, 10000); // 10 секунд
		return () => clearInterval(interval);
	}, [refetchNotifications]);

	// Синхронизация newMessages с notifications
	useEffect(() => {
		if (notifications) {
			const notificationCount = notifications.reduce((acc, notif) => {
				acc[notif.ticket._id] = (acc[notif.ticket._id] || 0) + 1;
				return acc;
			}, {});
			setNewMessages(notificationCount); // Полностью заменяем состояние
		} else {
			setNewMessages({}); // Если уведомлений нет, очищаем состояние
		}
	}, [notifications]);

	const handleLogout = () => {
		navigate('/auth/login');
		dispatch(logoutUser());
	};

	if (userTicketsLoading || notificationsLoading) return <div>Загрузка...</div>;

	const items = formatMenuItems(userTickets || [], userId);

	const openTicketsForUser =
		userTickets?.filter(
			(ticket) =>
				ticket.status === 'Открыта' && ticket.assignedTo?._id === userId
		) || [];
	const openTicketsCount = openTicketsForUser.length;

	const inProgressTickets =
		userTickets?.filter((ticket) => ticket.status === 'В работе') || [];
	const createdTickets =
		userTickets?.filter((ticket) => ticket.author._id === userId) || [];
	const inProgressNewMessages = inProgressTickets.reduce(
		(acc, ticket) => acc + (newMessages[ticket._id] || 0),
		0
	);
	const createdNewMessages = createdTickets.reduce(
		(acc, ticket) => acc + (newMessages[ticket._id] || 0),
		0
	);

	const updatedItems = items.map((item) => {
		if (item.key === 'open') {
			return {
				...item,
				label: (
					<>
						Открытые{' '}
						{openTicketsCount > 0 && (
							<Badge
								count={openTicketsCount}
								style={{ backgroundColor: '#fa541c' }}
							/>
						)}
					</>
				),
				children: item.children.map((child) => {
					const ticket = openTicketsForUser.find((t) => t._id === child.key);
					return {
						...child,
						label: ticket ? (
							<>
								<Link to={`/tickets/${child.key}`}>{ticket.title}</Link>{' '}
								<Badge count={1} style={{ backgroundColor: '#fa541c' }} />
							</>
						) : (
							child.label
						),
					};
				}),
			};
		}
		if (item.key === 'inProgress') {
			return {
				...item,
				label: (
					<>
						В работе{' '}
						{inProgressNewMessages > 0 && (
							<Badge
								count={inProgressNewMessages}
								style={{ backgroundColor: '#52c41a' }}
							/>
						)}
					</>
				),
				children: item.children.map((child) => ({
					...child,
					label: (
						<>
							<Link to={`/tickets/${child.key}`}>{child.label}</Link>{' '}
							{newMessages[child.key] > 0 && (
								<Badge
									count={newMessages[child.key]}
									style={{ backgroundColor: '#52c41a' }}
								/>
							)}
						</>
					),
				})),
			};
		}
		if (item.key === 'created') {
			return {
				...item,
				label: (
					<>
						Созданные{' '}
						{createdNewMessages > 0 && (
							<Badge
								count={createdNewMessages}
								style={{ backgroundColor: '#52c41a' }}
							/>
						)}
					</>
				),
				children: item.children.map((child) => ({
					...child,
					label: (
						<>
							<Link to={`/tickets/${child.key}`}>{child.label}</Link>{' '}
							{newMessages[child.key] > 0 && (
								<Badge
									count={newMessages[child.key]}
									style={{ backgroundColor: '#52c41a' }}
								/>
							)}
						</>
					),
				})),
			};
		}
		return item;
	});

	const currentTicketId = location.pathname.split('/tickets/')[1];

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header style={{ display: 'flex', alignItems: 'center' }}>
				<h1 style={{ color: 'white' }}>Ticket Platform</h1>
				<Menu theme="dark" mode="horizontal" style={{ width: '250px' }}>
					<Menu.Item key="1">
						<Link to="/">Home</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="tickets/create-ticket">Create Ticket</Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Link to="profile">Profile</Link>
					</Menu.Item>
					<Menu.Item key="4" onClick={handleLogout}>
						<LogoutOutlined /> Logout
					</Menu.Item>
				</Menu>
			</Header>
			<Layout>
				<Sider width={200} style={{ background: colorBgContainer }}>
					<Menu
						mode="inline"
						selectedKeys={[currentTicketId]}
						defaultOpenKeys={['open']}
						style={{ height: '100%', borderRight: 0 }}
						items={updatedItems}
					/>
				</Sider>
				<Layout style={{ padding: '24px' }}>
					<Content
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}>
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
