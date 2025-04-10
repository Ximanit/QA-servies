import React from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';

const Header = ({ onLogout }) => (
	<Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
		<h1 style={{ color: 'white' }}>Ticket Platform</h1>
		<Menu theme="dark" mode="horizontal" style={{ width: '350px' }}>
			<Menu.Item key="1">
				<Link to="/">Home</Link>
			</Menu.Item>
			<Menu.Item key="2">
				<Link to="tickets/create-ticket">Create Ticket</Link>
			</Menu.Item>
			<Menu.Item key="3">
				<Link to="profile">Profile</Link>
			</Menu.Item>
			<Menu.Item key="4">
				<Link to="stats">Statistics</Link>
			</Menu.Item>
			<Menu.Item key="5" onClick={onLogout}>
				<LogoutOutlined /> Logout
			</Menu.Item>
		</Menu>
	</Layout.Header>
);

export default Header;
