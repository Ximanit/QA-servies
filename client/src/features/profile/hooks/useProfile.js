// src/components/features/profile/hooks/useProfile.js
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import { message } from 'antd';
import {
	useGetProfileQuery,
	useUpdateProfileMutation,
} from '../../profile/profileApi';
import { useGetUserTicketsQuery } from '../../tickets/ticketsApi';

export const useProfile = () => {
	const userId = useSelector((state) => state.auth.id);
	const [alert, setAlert] = useState({
		open: false,
		message: '',
		severity: 'success',
	});

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
			setAlert({
				open: true,
				message: 'Профиль успешно обновлен!',
				severity: 'success',
			});
			return true;
		} catch (error) {
			setAlert({
				open: true,
				message: 'Ошибка при обновлении',
				severity: 'error',
			});
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
		alert,
		setAlert,
	};
};
