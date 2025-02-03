import React from 'react';
import { Layout, Card } from 'antd';

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
					{children}
				</Card>
			</Content>
		</Layout>
	);
};

export default AuthLayout;
