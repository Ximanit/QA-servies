import { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Typography,
	Tabs,
	Tab,
	Card,
	CardContent,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import ControlledTextField from '../../../components/Common/ControlledTextField';

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
		const success = await onUpdate(values);
		if (success) {
			reset({
				...values,
				currentPassword: '',
				newPassword: '',
				confirmNewPassword: '',
			}); // Сбрасываем поля пароля после успешной отправки
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
								<ControlledTextField
									name="fio"
									control={control}
									rules={{ required: 'Введите ваше имя!' }}
									placeholder="Имя"
								/>
								<ControlledTextField
									name="email"
									control={control}
									rules={{ required: 'Введите ваш email!' }}
									placeholder="Email"
								/>
							</>
						)}
						{tabValue === 1 && (
							<>
								<ControlledTextField
									name="currentPassword"
									control={control}
									rules={{ required: 'Введите текущий пароль!' }}
									placeholder="Текущий пароль"
									type="password"
								/>
								<ControlledTextField
									name="newPassword"
									control={control}
									rules={{
										required: 'Введите новый пароль!',
										minLength: {
											value: 5,
											message: 'Пароль должен содержать минимум 5 символов',
										},
										pattern: {
											value: /^[a-zA-Z._0-9]+$/,
											message:
												'Пароль должен содержать только буквы a-z, A-Z, цифры 0-9, точку (.) и символ подчеркивания (_)',
										},
									}}
									placeholder="Новый пароль"
									type="password"
								/>
								<ControlledTextField
									name="confirmNewPassword"
									control={control}
									rules={{
										required: 'Подтвердите новый пароль!',
										validate: (value, formValues) =>
											value === formValues.newPassword ||
											'Пароли не совпадают!',
									}}
									placeholder="Подтвердите новый пароль"
									type="password"
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
