// src/layouts/MainLayout.jsx
import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const items2 = [
	{
		key: 'sub1',
		label: 'Вопросы без ответа',
		children: [
			{
				key: '67998f159685a5723a90e700',
				label: <Link to="/questions/67998f159685a5723a90e700">Test</Link>,
			},
			{
				key: '67a2bb9aec4441f9e79983a3',
				label: <Link to="/questions/67a2bb9aec4441f9e79983a3">1</Link>,
			},
		],
	},
	{
		key: 'sub2',
		label: 'Вопросы с ответом',
		children: [
			{
				key: '67a2bfe6ec4441f9e79983dc',
				label: <Link to="/questions/67a2bfe6ec4441f9e79983dc">Test</Link>,
			},
			{
				key: '67a2c07cec4441f9e79983ea',
				label: <Link to="/questions/67a2bfe6ec4441f9e79983dc">Test</Link>,
			},
		],
	},
];

const MainLayout = ({ children }) => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header
				style={{
					display: 'flex',
					alignItems: 'center',
				}}>
				<h1 style={{ color: 'white' }}>Q&A Platform</h1>
				<Menu theme="dark" mode="horizontal" style={{ width: '250px' }}>
					<Menu.Item key="1">
						<Link to="/">Home</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="questions/create-question">Create Question</Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Link to="/auth/login">
							<LogoutOutlined />
						</Link>
					</Menu.Item>
				</Menu>
			</Header>
			<Layout>
				<Sider
					width={200}
					style={{
						background: colorBgContainer,
					}}>
					<Menu
						mode="inline"
						defaultSelectedKeys={['1']}
						defaultOpenKeys={['sub1']}
						style={{
							height: '100%',
							borderRight: 0,
						}}
						items={items2}
					/>
				</Sider>
				<Layout
					style={{
						padding: '24px',
					}}>
					<Content
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
							display: 'flex',
							alignContent: 'center',
							justifyContent: 'center',
						}}>
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
