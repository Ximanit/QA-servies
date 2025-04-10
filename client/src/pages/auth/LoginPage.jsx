// src/pages/auth/LoginPage.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authApi';
import LoginForm from '../../features/auth/components/LoginForm';
import { Snackbar, Alert, Box, Typography, Container } from '@mui/material';

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
		<Container
			sx={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				px: { xs: 2, sm: 3 },
			}}>
			<Box sx={{ textAlign: 'center', mb: 4 }}>
				<Typography
					variant="h4"
					fontWeight="bold"
					color="primary.main"
					sx={{ mb: 1 }}>
					Сервис Заявок
				</Typography>
				<Typography variant="body1" color="text.secondary">
					Управляйте своими заявками легко и быстро
				</Typography>
			</Box>
			<Box sx={{ width: '100%', maxWidth: 450 }}>
				<LoginForm onSubmit={onSubmit} isLoading={isLoading} />
				<Box sx={{ mt: 2, textAlign: 'center' }}>
					<Typography variant="body2" color="text.secondary">
						Нет аккаунта?{' '}
						<Link
							to="/auth/register"
							style={{ color: '#1976d2', textDecoration: 'none' }}>
							Зарегистрируйтесь
						</Link>
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
						Забыли пароль?{' '}
						<Link
							to="/auth/forgot-password"
							style={{ color: '#1976d2', textDecoration: 'none' }}>
							Восстановить
						</Link>
					</Typography>
				</Box>
			</Box>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				sx={{
					'& .MuiSnackbarContent-root': {
						borderRadius: '8px',
						boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
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
					}}>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</Container>
	);
};

export default LoginPage;
