// src/components/features/tickets/hooks/useTicketAssignment.js
import { message } from 'antd';
import { useUpdateTicketMutation } from '../ticketsApi';

export const useTicketAssignment = (ticketId) => {
	const [updateTicket] = useUpdateTicketMutation();

	const assignTicket = async (newAssignedTo) => {
		try {
			await updateTicket({ id: ticketId, assignedTo: newAssignedTo }).unwrap();
			message.success('Заявка передана другому исполнителю!');
		} catch (error) {
			message.error('Ошибка при передаче заявки');
		}
	};

	return { assignTicket };
};
