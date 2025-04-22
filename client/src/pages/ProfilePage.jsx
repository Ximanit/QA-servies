import React from 'react';
import {
	Box,
	Typography,
	CircularProgress,
	Avatar,
	Card,
	CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useProfile } from '../features/profile/hooks/useProfile';
import ProfileForm from '../features/profile/components/ProfileForm';

const ProfilePage = () => {
	const {
		profile,
		createdTicketsCount,
		completedTicketsCount,
		isLoading,
		profileError,
		ticketsError,
		updateProfile,
		updateLoading,
	} = useProfile();

	if (isLoading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100vh',
				}}>
				<CircularProgress />
				<Typography sx={{ ml: 2 }}>Загрузка профиля...</Typography>
			</Box>
		);
	}

	if (profileError) {
		return (
			<Box sx={{ maxWidth: 800, mx: 'auto', mt: 3, px: 2 }}>
				<Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
					Ошибка
				</Typography>
				<Typography color="error">
					Не удалось загрузить профиль: {profileError.status} -{' '}
					{profileError.data?.message || 'Неизвестная ошибка'}
				</Typography>
			</Box>
		);
	}

	if (!profile) {
		return (
			<Box sx={{ maxWidth: 800, mx: 'auto', mt: 3, px: 2 }}>
				<Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
					Ошибка
				</Typography>
				<Typography color="error">
					Данные профиля не найдены. Проверьте авторизацию.
				</Typography>
			</Box>
		);
	}

	return (
		<Box
			component={motion.div}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: 'easeInOut' }}
			sx={{ maxWidth: 800, mx: 'auto', mt: 3, px: 2 }}>
			<Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
				Настройки профиля
			</Typography>
			<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
				{/* Карточка профиля */}
				<Card
					sx={{
						flex: '1 1 300px',
						borderRadius: '8px',
						border: '1px solid #e0e0e0',
					}}>
					<CardContent>
						<Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
							Ваш профиль
						</Typography>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
							Управляйте личной информацией
						</Typography>
						<Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
							<Avatar sx={{ width: 80, height: 80 }} />
						</Box>
						<Typography
							variant="body1"
							sx={{ fontWeight: 500, textAlign: 'center' }}>
							{profile.fio || 'Фамилия Имя Отчество'}
						</Typography>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{ textAlign: 'center', mb: 2 }}>
							{profile.email || 'admin@example.com'}
						</Typography>
					</CardContent>
				</Card>

				{/* Форма настроек */}
				<Box sx={{ flex: '1 1 400px' }}>
					<ProfileForm
						profile={profile}
						onUpdate={updateProfile}
						updateLoading={updateLoading}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default ProfilePage;
