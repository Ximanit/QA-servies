// src/components/features/tickets/hooks/useTicketStatus.js
import { useToast } from '../../../utils/ToastContext';
import { useUpdateTicketMutation } from '../ticketsApi';

export const useTicketStatus = (ticketId) => {
	const [updateTicket] = useUpdateTicketMutation();

	const { showToast } = useToast();

	const completeTicket = async () => {
		try {
			await updateTicket({ id: ticketId, status: 'Закрыта' }).unwrap();
			showToast('Заявка завершена!', 'success');
		} catch (error) {
			showToast('Ошибка при завершении заявки', 'error');
		}
	};

	return { completeTicket };
};
