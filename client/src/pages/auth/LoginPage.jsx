// src/pages/auth/LoginPage.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authApi';
import LoginForm from '../../features/auth/components/LoginForm';
import { Snackbar, Alert, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const LoginPage = () => {
	const [login, { isLoading }] = useLoginMutation();
	const navigate = useNavigate();
	const [openSnackbar, setOpenSnackbar] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

	const handleCloseSnackbar = () => setOpenSnackbar(false);

	const onSubmit = async (values) => {
		try {
			await login(values).unwrap();
			setSnackbarMessage('Вы успешно вошли в систему!');
			setSnackbarSeverity('success');
			setOpenSnackbar(true);
			navigate('/');
		} catch (error) {
			setSnackbarMessage(
				error.data?.message || 'Неверное имя пользователя или пароль'
			);
			setSnackbarSeverity('error');
			setOpenSnackbar(true);
		}
	};

	return (
		<Box
			component={motion.div}
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 50 }}
			transition={{ duration: 0.4, ease: 'easeInOut' }}
			sx={{ textAlign: 'center', py: 4 }}>
			<Typography
				variant="h4"
				fontWeight="bold"
				color="primary.main"
				sx={{ mb: 1.5 }}>
				Авторизация
			</Typography>
			<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
				Управляйте своими заявками легко и быстро
			</Typography>
			<LoginForm onSubmit={onSubmit} isLoading={isLoading} />
			<Box sx={{ mt: 2.5, textAlign: 'center' }}>
				<Typography variant="body2" color="text.secondary">
					Нет аккаунта?{' '}
					<Link
						to="/auth/register"
						style={{
							color: '#1976d2',
							textDecoration: 'none',
							fontWeight: 'medium',
						}}>
						Зарегистрируйтесь
					</Link>
				</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
					Забыли пароль?{' '}
					<Link
						to="/auth/forgot-password"
						style={{
							color: '#1976d2',
							textDecoration: 'none',
							fontWeight: 'medium',
						}}>
						Восстановить
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

export default LoginPage;
