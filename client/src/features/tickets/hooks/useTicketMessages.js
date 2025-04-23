// src/components/features/tickets/hooks/useTicketMessages.js
import { useEffect, useState } from 'react';
import { useToast } from '../../../utils/ToastContext';
import { useGetMessagesQuery, useAddMessageMutation } from '../ticketsApi';
import { useSocket } from '../../../hooks/useSocket';

export const useTicketMessages = (ticketId, userId) => {
	const { data: initialMessages, isLoading: messagesLoading } =
		useGetMessagesQuery(ticketId);
	const [addMessage, { isLoading: isAdding }] = useAddMessageMutation();
	const { newMessages: socketMessages } = useSocket(ticketId, userId);
	const [messages, setMessages] = useState(initialMessages || []);

	const { showToast } = useToast();

	useEffect(() => {
		if (initialMessages) {
			setMessages(initialMessages);
		}
	}, [initialMessages]);

	useEffect(() => {
		if (socketMessages.length > 0) {
			setMessages((prev) => [
				...prev,
				...socketMessages.filter((msg) => !prev.some((m) => m._id === msg._id)),
			]);
		}
	}, [socketMessages]);

	const sendMessage = async ({ content, files }) => {
		try {
			const messageData = { ticketId, content, files };
			await addMessage(messageData).unwrap();
			// showToast('Сообщение отправлено!', 'success');
		} catch (error) {
			showToast('Ошибка при отправке сообщения', 'error');
		}
	};

	return { messages, isLoading: messagesLoading, isAdding, sendMessage };
};
