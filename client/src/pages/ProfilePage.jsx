import React from 'react';
import {
	Card,
	CardHeader,
	CardContent,
	CircularProgress,
	Typography,
	Box,
} from '@mui/material';
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
					height: '100vh',
				}}>
				<CircularProgress />
				<Typography sx={{ ml: 2 }}>Загрузка профиля...</Typography>
			</Box>
		);
	}

	if (profileError) {
		return (
			<Card sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
				<CardHeader title="Ошибка" />
				<CardContent>
					<Typography>
						Не удалось загрузить профиль: {profileError.status} -{' '}
						{profileError.data?.message || 'Неизвестная ошибка'}
					</Typography>
				</CardContent>
			</Card>
		);
	}

	if (ticketsError) {
		return (
			<Card sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
				<CardHeader title="Ошибка" />
				<CardContent>
					<Typography>
						Не удалось загрузить заявки: {ticketsError.status} -{' '}
						{ticketsError.data?.message || 'Неизвестная ошибка'}
					</Typography>
				</CardContent>
			</Card>
		);
	}

	if (!profile) {
		return (
			<Card sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
				<CardHeader title="Ошибка" />
				<CardContent>
					<Typography>
						Данные профиля не найдены. Проверьте авторизацию.
					</Typography>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
			<CardHeader title="Профиль пользователя" />
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
	);
};

export default ProfilePage;
