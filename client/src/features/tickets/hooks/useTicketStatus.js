import { TOAST_MESSAGES } from '../../../constants/messages';
import { useToast } from '../../../utils/ToastContext';
import { useUpdateTicketMutation } from '../ticketsApi';

export const useTicketStatus = (ticketId) => {
	const [updateTicket] = useUpdateTicketMutation();

	const { showToast } = useToast();

	const completeTicket = async () => {
		try {
			await updateTicket({ id: ticketId, status: 'Закрыта' }).unwrap();
			showToast(TOAST_MESSAGES.TICKET_COMPLETED, 'success');
		} catch (error) {
			showToast(TOAST_MESSAGES.ERROR_TICKET, 'error');
		}
	};

	return { completeTicket };
};
