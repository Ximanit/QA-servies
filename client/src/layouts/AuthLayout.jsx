// src/layouts/AuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';

const AuthLayout = () => {
	return (
		<Container
			maxWidth="false"
			sx={{
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
			}}>
			<Box sx={{ width: '100%', maxWidth: 450 }}>
				<Outlet />
			</Box>
		</Container>
	);
};

export default AuthLayout;
