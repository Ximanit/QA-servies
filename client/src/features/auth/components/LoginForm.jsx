import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const LoginForm = ({ onSubmit, isLoading }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			<Controller
				name="username"
				control={control}
				defaultValue=""
				rules={{ required: 'Введите имя пользователя!' }}
				render={({ field }) => (
					<TextField
						{...field}
						label="Имя пользователя"
						variant="outlined"
						error={!!errors.username}
						helperText={errors.username?.message}
						fullWidth
					/>
				)}
			/>
			<Controller
				name="password"
				control={control}
				defaultValue=""
				rules={{ required: 'Введите пароль!' }}
				render={({ field }) => (
					<TextField
						{...field}
						label="Пароль"
						type="password"
						variant="outlined"
						error={!!errors.password}
						helperText={errors.password?.message}
						fullWidth
					/>
				)}
			/>
			<Button
				type="submit"
				variant="contained"
				disabled={isLoading}
				sx={{ mt: 1 }}>
				{isLoading ? 'Загрузка...' : 'Войти'}
			</Button>
		</Box>
	);
};

export default LoginForm;
