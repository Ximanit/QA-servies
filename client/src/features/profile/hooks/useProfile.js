// src/components/features/profile/hooks/useProfile.js
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import {
	useGetProfileQuery,
	useUpdateProfileMutation,
} from '../../profile/profileApi';
import { useGetUserTicketsQuery } from '../../tickets/ticketsApi';

export const useProfile = () => {
	const userId = useSelector((state) => state.auth.id);

	const {
		data: profileData,
		isLoading: profileLoading,
		error: profileError,
	} = useGetProfileQuery();
	const [updateProfile, { isLoading: updateLoading }] =
		useUpdateProfileMutation();
	const {
		data: userTickets = [],
		isLoading: ticketsLoading,
		error: ticketsError,
	} = useGetUserTicketsQuery(userId);

	const profile = profileData?.[0];
	const createdTicketsCount = userTickets.length;
	const completedTicketsCount = userTickets.filter(
		(ticket) => ticket.status === 'Закрыта'
	).length;

	const updateProfileData = async (values) => {
		try {
			await updateProfile({ id: userId, fio: values.fio }).unwrap();
			message.success('Профиль успешно обновлен!');
			return true;
		} catch (error) {
			message.error('Ошибка при обновлении профиля');
			return false;
		}
	};

	return {
		profile,
		userTickets,
		createdTicketsCount,
		completedTicketsCount,
		isLoading: profileLoading || ticketsLoading,
		profileError,
		ticketsError,
		updateProfile: updateProfileData,
		updateLoading,
	};
};
