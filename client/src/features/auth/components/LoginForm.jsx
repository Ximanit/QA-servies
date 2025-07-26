import { useState } from 'react';
import { Button, Box, InputAdornment, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';

import ControlledTextField from '../../../components/Common/ControlledTextField';

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
			<ControlledTextField
				name="username"
				control={control}
				rules={{ required: 'Введите имя пользователя!' }}
				placeholder="Имя пользователя"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Person />
						</InputAdornment>
					),
				}}
			/>
			<ControlledTextField
				name="password"
				control={control}
				rules={{ required: 'Введите пароль!' }}
				placeholder="Пароль"
				type={showPassword ? 'text' : 'password'}
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
