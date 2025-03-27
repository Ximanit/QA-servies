// src/layouts/MainLayout.jsx
import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';
import { useGetUserTicketsQuery } from '../store/api/ticketsApi';
import { formatMenuItems } from '../utils/utils';

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation(); // Для определения текущего пути
	const userId = useSelector((state) => state.auth.id);
	const { data: userTickets, isLoading: userTicketsLoading } =
		useGetUserTicketsQuery(userId);

	const user = useSelector((state) => state.auth.user);

	const handleLogout = () => {
		navigate('/auth/login');
		dispatch(logoutUser());
	};

	if (userTicketsLoading) return <div>Загрузка...</div>;

	const items = formatMenuItems(userTickets || [], userId);

	// Определяем текущую заявку из пути
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
						selectedKeys={[currentTicketId]} // Подсвечиваем текущую заявку
						defaultOpenKeys={['open']}
						style={{ height: '100%', borderRight: 0 }}
						items={items}
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
