// src/components/features/tickets/hooks/useTicketStatus.js
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import {
	useUpdateTicketMutation,
	useMarkNotificationsAsReadMutation,
} from '../ticketsApi';

export const useTicketStatus = (ticketId, ticketDetails) => {
	const userId = useSelector((state) => state.auth.id);
	const [updateTicket] = useUpdateTicketMutation();
	const [markNotificationsAsRead] = useMarkNotificationsAsReadMutation();

	useEffect(() => {
		if (
			ticketDetails &&
			ticketDetails.status === 'Открыта' &&
			ticketDetails.author._id !== userId
		) {
			updateTicket({ id: ticketId, status: 'В работе' })
				.unwrap()
				.then(() => message.success('Заявка переведена в статус "В работе"'))
				.catch(() => message.error('Ошибка при обновлении статуса'));
		}
	}, [ticketDetails, ticketId, updateTicket, userId]);

	const completeTicket = async () => {
		try {
			await updateTicket({ id: ticketId, status: 'Закрыта' }).unwrap();
			message.success('Заявка завершена!');
		} catch (error) {
			message.error('Ошибка при завершении заявки');
		}
	};

	return { completeTicket };
};
