// src/components/features/tickets/hooks/useTicketAcceptance.js
import { TOAST_MESSAGES } from '../../../constants/messages';
import { useToast } from '../../../utils/ToastContext';
import { useUpdateTicketMutation } from '../ticketsApi';

export const useTicketAcceptance = (ticketId) => {
	const [updateTicket] = useUpdateTicketMutation();
	const { showToast } = useToast();

	const acceptTicket = async () => {
		try {
			await updateTicket({ id: ticketId, status: 'В работе' }).unwrap();
			showToast(TOAST_MESSAGES.TICKET_ACCEPTED, 'success');
		} catch (error) {
			showToast(TOAST_MESSAGES.ERROR_TICKET, 'error');
		}
	};

	return { acceptTicket };
};
