// src/features/auth/components/LoginForm.jsx
import React, { useState } from 'react';
import {
	TextField,
	Button,
	Box,
	InputAdornment,
	IconButton,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';

const LoginForm = ({ onSubmit, isLoading }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [showPassword, setShowPassword] = useState(false);

	const handleTogglePassword = () => setShowPassword((prev) => !prev);

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
			<Controller
				name="username"
				control={control}
				defaultValue=""
				rules={{ required: 'Введите имя пользователя!' }}
				render={({ field, fieldState: { error } }) => (
					<TextField
						{...field}
						label="Имя пользователя"
						variant="outlined"
						error={!!error}
						helperText={error?.message}
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Person />
								</InputAdornment>
							),
						}}
						sx={{
							'& .MuiOutlinedInput-root': {
								borderRadius: '8px',
							},
						}}
					/>
				)}
			/>
			<Controller
				name="password"
				control={control}
				defaultValue=""
				rules={{ required: 'Введите пароль!' }}
				render={({ field, fieldState: { error } }) => (
					<TextField
						{...field}
						label="Пароль"
						type={showPassword ? 'text' : 'password'}
						variant="outlined"
						error={!!error}
						helperText={error?.message}
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Lock />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={handleTogglePassword} edge="end">
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
						sx={{
							'& .MuiOutlinedInput-root': {
								borderRadius: '8px',
							},
						}}
					/>
				)}
			/>
			<Button
				type="submit"
				variant="contained"
				disabled={isLoading}
				sx={{
					mt: 1,
					py: 1.5,
					borderRadius: '8px',
					textTransform: 'none',
					fontSize: '1rem',
					fontWeight: 'bold',
				}}>
				{isLoading ? 'Вход...' : 'Войти'}
			</Button>
		</Box>
	);
};

export default LoginForm;
