// src/components/features/tickets/hooks/useTicketAssignment.js
import { TOAST_MESSAGES } from '../../../constants/messages';
import { useToast } from '../../../utils/ToastContext';
import { useUpdateTicketMutation } from '../ticketsApi';

export const useTicketAssignment = (ticketId) => {
	const [updateTicket] = useUpdateTicketMutation();

	const { showToast } = useToast();

	const assignTicket = async (newAssignedTo) => {
		try {
			await updateTicket({ id: ticketId, assignedTo: newAssignedTo }).unwrap();
			showToast(TOAST_MESSAGES.TICKET_ASIGNEDTO_UPDATE, 'success');
		} catch (error) {
			showToast(TOAST_MESSAGES.ERROR_ASIGNEDTO_UPDATE, 'error');
		}
	};

	return { assignTicket };
};
