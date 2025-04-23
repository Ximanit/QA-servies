import { useEffect } from 'react';
import { useGetUserNotificationsQuery } from '../features/tickets/ticketsApi';

export const useNotifications = () => {
	const { data: notifications = [] } = useGetUserNotificationsQuery(undefined, {
		pollingInterval: 10000, // Обновление каждые 10 секунд
	});

	return notifications;
};
