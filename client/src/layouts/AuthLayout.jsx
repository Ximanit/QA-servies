// src/layouts/AuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const AuthLayout = () => {
	return (
		<Container
			maxWidth={false}
			sx={{
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background: 'linear-gradient(135deg, #e0e7ff 0%, #a5b4fc 100%)',
			}}>
			<Paper
				elevation={8}
				sx={{
					width: '100%',
					maxWidth: 500,
					p: 4,
					borderRadius: 3,
					bgcolor: 'background.paper',
				}}
				component={motion.div}
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}>
				<Outlet />
			</Paper>
		</Container>
	);
};

export default AuthLayout;
