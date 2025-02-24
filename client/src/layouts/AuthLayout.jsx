import React from 'react';
import { Layout, Card } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const AuthLayout = ({ children }) => {
	return (
		<Layout
			style={{
				minHeight: '100vh',
			}}>
			<Content
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Card style={{ width: 400, textAlign: 'center', padding: '20px' }}>
					<Outlet />
				</Card>
			</Content>
		</Layout>
	);
};

export default AuthLayout;
