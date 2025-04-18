// src/pages/auth/RegisterPage.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '../../features/auth/authApi';
import RegisterForm from '../../features/auth/components/RegisterForm';
import { Snackbar, Alert, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const RegisterPage = () => {
	const [register, { isLoading }] = useRegisterMutation();
	const navigate = useNavigate();
	const [openSnackbar, setOpenSnackbar] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

	const handleCloseSnackbar = () => setOpenSnackbar(false);

	const onSubmit = async (values) => {
		try {
			await register(values).unwrap();
			setSnackbarMessage('Вы успешно зарегистрированы!');
			setSnackbarSeverity('success');
			setOpenSnackbar(true);
			navigate('/');
		} catch (error) {
			setSnackbarMessage(error.data?.message || 'Ошибка регистрации');
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
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
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				sx={{
					'& .MuiSnackbarContent-root': {
						borderRadius: '8px',
						boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
					},
				}}>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbarSeverity}
					sx={{
						width: '100%',
						borderRadius: '8px',
						bgcolor:
							snackbarSeverity === 'success' ? 'success.light' : 'error.light',
						color:
							snackbarSeverity === 'success'
								? 'success.contrastText'
								: 'error.contrastText',
						fontWeight: 'medium',
					}}>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default RegisterPage;
