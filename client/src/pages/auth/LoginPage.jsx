import { useNavigate, Link } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authApi';
import LoginForm from '../../features/auth/components/LoginForm';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import { useToast } from '../../utils/ToastContext';
import { TOAST_MESSAGES } from '../../constants/messages';

const LoginPage = () => {
	const [login, { isLoading }] = useLoginMutation();
	const navigate = useNavigate();
	const { showToast } = useToast();

	const onSubmit = async (values) => {
		try {
			await login(values).unwrap();
			showToast(TOAST_MESSAGES.LOGIN_SUCCESS, 'success');
			navigate('/');
		} catch (error) {
			showToast(error.data?.message || TOAST_MESSAGES.ERROR_AUTH, 'error');
		}
	};

	return (
		<Box
			component={motion.div}
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 50 }}
			transition={{ duration: 0.4, ease: 'easeInOut' }}
			sx={{ textAlign: 'center' }}>
			<Typography variant="h4" fontWeight="bold" sx={{ mb: 1.5 }}>
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
						to="/"
						style={{
							color: '#1976d2',
							textDecoration: 'none',
							fontWeight: 'medium',
						}}>
						Восстановить
					</Link>
				</Typography>
			</Box>
		</Box>
	);
};

export default LoginPage;
