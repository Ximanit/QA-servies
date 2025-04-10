// src/components/features/tickets/hooks/useTicketStatus.js
import { message } from 'antd';
import { useUpdateTicketMutation } from '../ticketsApi';

export const useTicketStatus = (ticketId) => {
	const [updateTicket] = useUpdateTicketMutation();

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
