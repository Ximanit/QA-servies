// src/components/features/tickets/hooks/useTicketAcceptance.js
import { message } from 'antd';
import { useUpdateTicketMutation } from '../ticketsApi';

export const useTicketAcceptance = (ticketId) => {
	const [updateTicket] = useUpdateTicketMutation();

	const acceptTicket = async () => {
		try {
			await updateTicket({ id: ticketId, status: 'В работе' }).unwrap();
			message.success('Заявка принята в работу!');
		} catch (error) {
			message.error('Ошибка при принятии заявки');
		}
	};

	return { acceptTicket };
};
