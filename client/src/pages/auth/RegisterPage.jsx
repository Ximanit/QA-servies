// src/pages/auth/RegisterPage.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '../../features/auth/authApi';
import RegisterForm from '../../features/auth/components/RegisterForm';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import { useToast } from '../../utils/ToastContext';
import { TOAST_MESSAGES } from '../../constants/messages';

const RegisterPage = () => {
	const [register, { isLoading }] = useRegisterMutation();
	const navigate = useNavigate();
	const { showToast } = useToast();

	const onSubmit = async (values) => {
		try {
			await register(values).unwrap();
			showToast(TOAST_MESSAGES.REGISTER_SUCCESS, 'success');
			navigate('/');
		} catch (error) {
			showToast(error.data?.message || TOAST_MESSAGES.ERROR_AUTH, 'error');
		}
	};

	return (
		<Box
			component={motion.div}
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -50 }}
			transition={{ duration: 0.4, ease: 'easeInOut' }}
			sx={{ textAlign: 'center' }}>
			<Typography variant="h4" fontWeight="bold" sx={{ mb: 1.5 }}>
				Регистрация
			</Typography>
			<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
				Создайте аккаунт для управления заявками
			</Typography>
			<RegisterForm onSubmit={onSubmit} isLoading={isLoading} />
			<Box sx={{ mt: 2.5, textAlign: 'center' }}>
				<Typography variant="body2" color="text.secondary">
					Уже есть аккаунт?{' '}
					<Link
						to="/auth/login"
						style={{
							color: '#1976d2',
							textDecoration: 'none',
							fontWeight: 'medium',
						}}>
						Войдите
					</Link>
				</Typography>
			</Box>
		</Box>
	);
};

export default RegisterPage;
