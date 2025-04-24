import React, { useState, useEffect } from 'react';
import {
	Box,
	TextField,
	Button,
	Typography,
	Tabs,
	Tab,
	Card,
	CardContent,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const ProfileForm = ({ profile, onUpdate, updateLoading }) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			fio: profile?.fio || '',
			email: profile?.email || '',
			currentPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		},
	});

	const [tabValue, setTabValue] = useState(0);

	useEffect(() => {
		reset({
			fio: profile?.name || '',
			email: profile?.username || '',
			currentPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		});
	}, [profile, reset]);

	const onSubmit = async (values) => {
		console.log(values);
		const success = await onUpdate(values);
		if (success) {
			reset(values); // Сохраняем новые значения в форме
		}
	};

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	return (
		<Box>
			<Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
				<Tab
					label="Общие настройки"
					sx={{
						textTransform: 'none',
						color: tabValue === 0 ? '#1976d2' : 'text.secondary',
					}}
				/>
				<Tab
					label="Безопасность"
					sx={{
						textTransform: 'none',
						color: tabValue === 1 ? '#1976d2' : 'text.secondary',
					}}
				/>
			</Tabs>
			<Card
				sx={{
					flex: '1 1 300px',
					borderRadius: '8px',
					border: '1px solid #e0e0e0',
				}}>
				<CardContent>
					{tabValue === 0 ? (
						<>
							<Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
								Общие настройки
							</Typography>
							<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
								Обновите свою личную информацию
							</Typography>
						</>
					) : (
						<>
							<Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
								Безопасность
							</Typography>
							<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
								Управляйте паролем и настройками безопасности
							</Typography>
						</>
					)}

					<Box
						component="form"
						onSubmit={handleSubmit(onSubmit)}
						sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
						{tabValue === 0 && (
							<>
								<Controller
									name="fio"
									control={control}
									rules={{ required: 'Введите ваше имя!' }}
									render={({ field }) => (
										<TextField
											{...field}
											placeholder="Имя"
											variant="outlined"
											fullWidth
											error={!!errors.fio}
											helperText={errors.fio?.message}
											sx={{
												'& .MuiOutlinedInput-root': {
													borderRadius: '8px',
													'& fieldset': { borderColor: '#e0e0e0' },
												},
												'& .MuiInputBase-input': { padding: '12px 14px' },
											}}
										/>
									)}
								/>
								<Controller
									name="email"
									control={control}
									rules={{ required: 'Введите ваш email!' }}
									render={({ field }) => (
										<TextField
											{...field}
											placeholder="Email"
											variant="outlined"
											fullWidth
											error={!!errors.email}
											helperText={errors.email?.message}
											sx={{
												'& .MuiOutlinedInput-root': {
													borderRadius: '8px',
													'& fieldset': { borderColor: '#e0e0e0' },
												},
												'& .MuiInputBase-input': { padding: '12px 14px' },
											}}
										/>
									)}
								/>
							</>
						)}
						{/* //TODO надо прикруть API для смены пароля */}
						{tabValue === 1 && (
							<>
								<Controller
									name="currentPassword"
									control={control}
									rules={{ required: 'Введите текущий пароль!' }}
									render={({ field }) => (
										<TextField
											{...field}
											placeholder="Текущий пароль"
											type="password"
											variant="outlined"
											fullWidth
											error={!!errors.currentPassword}
											helperText={errors.currentPassword?.message}
											sx={{
												'& .MuiOutlinedInput-root': {
													borderRadius: '8px',
													'& fieldset': { borderColor: '#e0e0e0' },
												},
												'& .MuiInputBase-input': { padding: '12px 14px' },
											}}
										/>
									)}
								/>
								<Controller
									name="newPassword"
									control={control}
									rules={{ required: 'Введите новый пароль!' }}
									render={({ field }) => (
										<TextField
											{...field}
											placeholder="Новый пароль"
											type="password"
											variant="outlined"
											fullWidth
											error={!!errors.newPassword}
											helperText={errors.newPassword?.message}
											sx={{
												'& .MuiOutlinedInput-root': {
													borderRadius: '8px',
													'& fieldset': { borderColor: '#e0e0e0' },
												},
												'& .MuiInputBase-input': { padding: '12px 14px' },
											}}
										/>
									)}
								/>
								<Controller
									name="confirmNewPassword"
									control={control}
									rules={{
										required: 'Подтвердите новый пароль!',
										validate: (value, formValues) =>
											value === formValues.newPassword ||
											'Пароли не совпадают!',
									}}
									render={({ field }) => (
										<TextField
											{...field}
											placeholder="Подтвердите новый пароль"
											type="password"
											variant="outlined"
											fullWidth
											error={!!errors.confirmNewPassword}
											helperText={errors.confirmNewPassword?.message}
											sx={{
												'& .MuiOutlinedInput-root': {
													borderRadius: '8px',
													'& fieldset': { borderColor: '#e0e0e0' },
												},
												'& .MuiInputBase-input': { padding: '12px 14px' },
											}}
										/>
									)}
								/>
							</>
						)}
						<Button
							type="submit"
							variant="contained"
							disabled={updateLoading}
							sx={{
								textTransform: 'none',
								borderRadius: '8px',
								padding: '10px 24px',
								mt: 2,
								'&:hover': { backgroundColor: '#6b35cc' },
							}}>
							{updateLoading
								? 'Сохранение...'
								: tabValue === 0
								? 'Сохранить изменения'
								: 'Изменить пароль'}
						</Button>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};

export default ProfileForm;
