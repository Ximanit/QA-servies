// src/components/features/tickets/hooks/useTicketDetails.js
import { useGetTicketDetailsQuery } from '../ticketsApi';

export const useTicketDetails = (ticketId) => {
	const { data: ticketDetails, isLoading } = useGetTicketDetailsQuery(ticketId);
	return { ticketDetails, isLoading };
};
