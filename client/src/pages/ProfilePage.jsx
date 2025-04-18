import React from 'react';
import {
	Box,
	Card,
	CardHeader,
	CardContent,
	CircularProgress,
	Typography,
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
			<Card sx={{ maxWidth: 600, mx: 'auto', mt: 3, boxShadow: 3 }}>
				<CardHeader title="Ошибка" />
				<CardContent>
					<Typography color="error">
						Не удалось загрузить профиль: {profileError.status} -{' '}
						{profileError.data?.message || 'Неизвестная ошибка'}
					</Typography>
				</CardContent>
			</Card>
		);
	}

	if (ticketsError) {
		return (
			<Card sx={{ maxWidth: 600, mx: 'auto', mt: 3, boxShadow: 3 }}>
				<CardHeader title="Ошибка" />
				<CardContent>
					<Typography color="error">
						Не удалось загрузить заявки: {ticketsError.status} -{' '}
						{ticketsError.data?.message || 'Неизвестная ошибка'}
					</Typography>
				</CardContent>
			</Card>
		);
	}

	if (!profile) {
		return (
			<Card sx={{ maxWidth: 600, mx: 'auto', mt: 3, boxShadow: 3 }}>
				<CardHeader title="Ошибка" />
				<CardContent>
					<Typography color="error">
						Данные профиля не найдены. Проверьте авторизацию.
					</Typography>
				</CardContent>
			</Card>
		);
	}

	return (
		<Box
			component={motion.div}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: 'easeInOut' }}
			sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
			<Card sx={{ boxShadow: 3 }}>
				<CardHeader
					title="Профиль пользователя"
					titleTypographyProps={{ fontWeight: 600 }}
				/>
				<CardContent>
					<ProfileForm
						profile={profile}
						createdTicketsCount={createdTicketsCount}
						completedTicketsCount={completedTicketsCount}
						onUpdate={updateProfile}
						updateLoading={updateLoading}
					/>
				</CardContent>
			</Card>
		</Box>
	);
};

export default ProfilePage;
