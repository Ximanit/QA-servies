// src/components/features/tickets/hooks/useTicketAcceptance.js
import { useToast } from '../../../utils/ToastContext';
import { useUpdateTicketMutation } from '../ticketsApi';

export const useTicketAcceptance = (ticketId) => {
	const [updateTicket] = useUpdateTicketMutation();
	const { showToast } = useToast();

	const acceptTicket = async () => {
		try {
			await updateTicket({ id: ticketId, status: 'В работе' }).unwrap();
			showToast('Заявка принята в работу!', 'success');
		} catch (error) {
			showToast('Ошибка при принятии заявки', 'error');
		}
	};

	return { acceptTicket };
};
