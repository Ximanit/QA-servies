// src/pages/ProfilePage.jsx
import React from 'react';
import { Card, Spin } from 'antd';
import { useProfile } from '../components/features/profile/hooks/useProfile';
import ProfileForm from '../components/features/profile/components/ProfileForm';

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
		return <Spin tip="Загрузка профиля..." />;
	}

	if (profileError) {
		return (
			<Card title="Ошибка">
				<p>
					Не удалось загрузить профиль: {profileError.status} -{' '}
					{profileError.data?.message || 'Неизвестная ошибка'}
				</p>
			</Card>
		);
	}

	if (ticketsError) {
		return (
			<Card title="Ошибка">
				<p>
					Не удалось загрузить заявки: {ticketsError.status} -{' '}
					{ticketsError.data?.message || 'Неизвестная ошибка'}
				</p>
			</Card>
		);
	}

	if (!profile) {
		return (
			<Card title="Ошибка">
				<p>Данные профиля не найдены. Проверьте авторизацию.</p>
			</Card>
		);
	}

	return (
		<Card
			title="Профиль пользователя"
			style={{ maxWidth: 600, margin: '20px auto' }}>
			<ProfileForm
				profile={profile}
				createdTicketsCount={createdTicketsCount}
				completedTicketsCount={completedTicketsCount}
				onUpdate={updateProfile}
				updateLoading={updateLoading}
			/>
		</Card>
	);
};

export default ProfilePage;
