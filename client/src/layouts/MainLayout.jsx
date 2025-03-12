import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';
import { useGetQuestionsQuery } from '../store/api';
import { formatMenuItems } from '../utils/utils';

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	const dispatch = useDispatch();
	const { data: questions, isLoading } = useGetQuestionsQuery();
	const user = useSelector((state) => state.auth.user);
	const navigate = useNavigate();

	const items = questions ? formatMenuItems(questions) : [];

	const handleLogout = () => {
		navigate('/auth/login');
		dispatch(logoutUser());
	};

	if (isLoading) return <div>Загрузка...</div>;

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header style={{ display: 'flex', alignItems: 'center' }}>
				<h1 style={{ color: 'white' }}>Q&A Platform</h1>
				<Menu theme="dark" mode="horizontal" style={{ width: '250px' }}>
					<Menu.Item key="1">
						<Link to="/">Home</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="questions/create-question">Create Question</Link>
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
						defaultSelectedKeys={['1']}
						defaultOpenKeys={['sub1']}
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
