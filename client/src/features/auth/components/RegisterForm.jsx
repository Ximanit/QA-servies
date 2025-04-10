// src/features/auth/components/RegisterForm.jsx
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
import { Person, Lock, Badge } from '@mui/icons-material';

const RegisterForm = ({ onSubmit, isLoading }) => {
	const [formValues, setFormValues] = React.useState({
		name: '',
		username: '',
		password: '',
	});
	const [touched, setTouched] = React.useState({
		name: false,
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
		if (!formValues.name || !formValues.username || !formValues.password) {
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
					Регистрация
				</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
					Создайте аккаунт для начала работы
				</Typography>
			</Box>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<TextField
					label="Фамилия Имя Отчество"
					name="name"
					value={formValues.name}
					onChange={handleChange}
					onBlur={handleBlur}
					required
					fullWidth
					variant="outlined"
					error={getError('name')}
					helperText={getHelperText('name', 'Введите ваше ФИО!')}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position="start">
									<Badge color="action" />
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
					label="Логин"
					name="username"
					value={formValues.username}
					onChange={handleChange}
					onBlur={handleBlur}
					required
					fullWidth
					variant="outlined"
					error={getError('username')}
					helperText={getHelperText('username', 'Введите логин!')}
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
					{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
				</Button>
			</Box>
		</Paper>
	);
};

export default RegisterForm;
