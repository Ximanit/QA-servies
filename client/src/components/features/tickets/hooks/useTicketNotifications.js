// src/components/features/tickets/hooks/useTicketNotifications.js
import { useEffect } from 'react';
import { useMarkNotificationsAsReadMutation } from '../ticketsApi';

export const useTicketNotifications = (ticketId, messages) => {
	const [markNotificationsAsRead] = useMarkNotificationsAsReadMutation();

	useEffect(() => {
		if (messages) {
			markNotificationsAsRead(ticketId);
		}
	}, [messages, ticketId, markNotificationsAsRead]);
};
