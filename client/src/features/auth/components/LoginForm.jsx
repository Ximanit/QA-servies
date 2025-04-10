// src/features/auth/components/LoginForm.jsx
import React from 'react';
import {
	TextField,
	Button,
	Box,
	CircularProgress,
	Typography,
	InputAdornment,
	Paper,
} from '@mui/material';
import { Person, Lock } from '@mui/icons-material';

const LoginForm = ({ onSubmit, isLoading }) => {
	const [formValues, setFormValues] = React.useState({
		username: '',
		password: '',
	});
	const [touched, setTouched] = React.useState({
		username: false,
		password: false,
	});
	const [formSubmitted, setFormSubmitted] = React.useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleBlur = (e) => {
		const { name } = e.target;
		setTouched((prev) => ({ ...prev, [name]: true }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormSubmitted(true);
		if (!formValues.username || !formValues.password) {
			return;
		}
		onSubmit(formValues);
	};

	const getError = (field) => {
		return !formValues[field] && (touched[field] || formSubmitted);
	};

	const getHelperText = (field, message) => {
		return getError(field) ? message : '';
	};

	return (
		<Paper
			elevation={6}
			sx={{
				padding: 4,
				borderRadius: 3,
				background: 'linear-gradient(145deg, #ffffff, #f0f4f8)',
				maxWidth: 400,
				mx: 'auto',
			}}>
			<Box sx={{ textAlign: 'center', mb: 3 }}>
				<Typography variant="h5" fontWeight="bold" color="primary">
					Вход в систему
				</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
					Пожалуйста, введите свои данные для входа
				</Typography>
			</Box>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<TextField
					label="Имя пользователя"
					name="username"
					value={formValues.username}
					onChange={handleChange}
					onBlur={handleBlur}
					required
					fullWidth
					variant="outlined"
					error={getError('username')}
					helperText={getHelperText('username', 'Введите имя пользователя!')}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position="start">
									<Person color="action" />
								</InputAdornment>
							),
						},
					}}
					sx={{
						'& .MuiOutlinedInput-root': {
							borderRadius: '8px',
							'&:hover fieldset': {
								borderColor: 'primary.main',
							},
							'&.Mui-focused fieldset': {
								borderColor: 'primary.main',
							},
						},
						'& .MuiInputLabel-root': {
							color: 'text.secondary',
							'&.Mui-focused': {
								color: 'primary.main',
							},
						},
					}}
				/>
				<TextField
					label="Пароль"
					name="password"
					type="password"
					value={formValues.password}
					onChange={handleChange}
					onBlur={handleBlur}
					required
					fullWidth
					variant="outlined"
					error={getError('password')}
					helperText={getHelperText('password', 'Введите пароль!')}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position="start">
									<Lock color="action" />
								</InputAdornment>
							),
						},
					}}
					sx={{
						'& .MuiOutlinedInput-root': {
							borderRadius: '8px',
							'&:hover fieldset': {
								borderColor: 'primary.main',
							},
							'&.Mui-focused fieldset': {
								borderColor: 'primary.main',
							},
						},
						'& .MuiInputLabel-root': {
							color: 'text.secondary',
							'&.Mui-focused': {
								color: 'primary.main',
							},
						},
					}}
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={isLoading}
					fullWidth
					sx={{
						py: 1.5,
						borderRadius: '8px',
						textTransform: 'none',
						fontSize: '1rem',
						fontWeight: 'bold',
						boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
						'&:hover': {
							boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
							backgroundColor: 'primary.dark',
						},
						'&:disabled': {
							backgroundColor: 'action.disabledBackground',
							color: 'action.disabled',
						},
					}}
					startIcon={isLoading ? <CircularProgress size={20} /> : null}>
					{isLoading ? 'Вход...' : 'Войти'}
				</Button>
			</Box>
		</Paper>
	);
};

export default LoginForm;
