// src/layouts/AuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box, Paper } from '@mui/material';

const AuthLayout = () => {
	return (
		<Container
			maxWidth={false}
			sx={{
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', // Более мягкий градиент
			}}>
			<Paper
				elevation={6}
				sx={{
					width: '100%',
					maxWidth: 450,

					p: 3,
					borderRadius: 2,
					bgcolor: 'background.paper',
					animation: 'fadeIn 0.5s ease-in-out', // Плавное появление
					'@keyframes fadeIn': {
						from: { opacity: 0, transform: 'translateY(20px)' },
						to: { opacity: 1, transform: 'translateY(0)' },
					},
				}}>
				<Outlet />
			</Paper>
		</Container>
	);
};

export default AuthLayout;
