// src/components/features/tickets/hooks/useTicketAssignment.js
import { useToast } from '../../../utils/ToastContext';
import { useUpdateTicketMutation } from '../ticketsApi';

export const useTicketAssignment = (ticketId) => {
	const [updateTicket] = useUpdateTicketMutation();

	const { showToast } = useToast();

	const assignTicket = async (newAssignedTo) => {
		try {
			await updateTicket({ id: ticketId, assignedTo: newAssignedTo }).unwrap();
			showToast('Заявка передана другому исполнителю!', 'success');
		} catch (error) {
			showToast('Ошибка при передаче заявки', 'error');
		}
	};

	return { assignTicket };
};
