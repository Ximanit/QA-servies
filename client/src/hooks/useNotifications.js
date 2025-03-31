import { useEffect } from 'react';
import { useGetUserNotificationsQuery } from '../store/api/ticketsApi';

export const useNotifications = () => {
	const { data: notifications, refetch } = useGetUserNotificationsQuery();

	useEffect(() => {
		const interval = setInterval(() => refetch(), 10000);
		return () => clearInterval(interval);
	}, [refetch]);

	return notifications || [];
};
