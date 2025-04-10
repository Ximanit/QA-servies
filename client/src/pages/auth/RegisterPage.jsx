// src/pages/auth/RegisterPage.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '../../features/auth/authApi';
import RegisterForm from '../../features/auth/components/RegisterForm';
import { Snackbar, Alert, Box, Typography, Container } from '@mui/material';

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
				<RegisterForm onSubmit={onSubmit} isLoading={isLoading} />
				<Box sx={{ mt: 2, textAlign: 'center' }}>
					<Typography variant="body2" color="text.secondary">
						Уже есть аккаунт?{' '}
						<Link
							to="/auth/login"
							style={{ color: '#1976d2', textDecoration: 'none' }}>
							Войдите
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

export default RegisterPage;
