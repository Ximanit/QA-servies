// src/layouts/MainLayout.jsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header style={{ display: 'flex', alignItems: 'center' }}>
				<h1 style={{ color: 'white', flexGrow: 1 }}>Q&A Platform</h1>
				<Menu theme="dark" mode="horizontal">
					<Menu.Item key="1">
						<Link to="/">Home</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/create-question">Create Question</Link>
					</Menu.Item>
				</Menu>
			</Header>
			<Content style={{ padding: '20px' }}>{children}</Content>
		</Layout>
	);
};

export default MainLayout;
