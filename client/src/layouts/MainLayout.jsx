import React, { useState, useEffect } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Badge } from 'antd';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';
import { useGetUserTicketsQuery } from '../store/api/ticketsApi';
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
	const [newMessages, setNewMessages] = useState({}); // Храним новые сообщения по ticketId

	useEffect(() => {
		const socket = io(API_URL, { transports: ['websocket', 'polling'] });
		socket.on('newMessageNotification', ({ ticketId, recipientId }) => {
			if (recipientId === userId) {
				setNewMessages((prev) => ({
					...prev,
					[ticketId]: (prev[ticketId] || 0) + 1,
				}));
			}
		});
		return () => socket.disconnect();
	}, [userId]);

	const handleLogout = () => {
		navigate('/auth/login');
		dispatch(logoutUser());
	};

	if (userTicketsLoading) return <div>Загрузка...</div>;

	const items = formatMenuItems(userTickets || [], userId);

	const openTicketsForUser =
		userTickets?.filter(
			(ticket) =>
				ticket.status === 'Открыта' && ticket.assignedTo?._id === userId
		) || [];
	const openTicketsCount = openTicketsForUser.length;

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
		if (item.key === 'inProgress' || item.key === 'created') {
			return {
				...item,
				children: item.children.map((child) => ({
					...child,
					label: (
						<>
							{child.label}{' '}
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
