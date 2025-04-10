// src/components/features/tickets/hooks/useTicketMessages.js
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { useGetMessagesQuery, useAddMessageMutation } from '../ticketsApi';
import { useSocket } from '../../../hooks/useSocket';

export const useTicketMessages = (ticketId, userId) => {
	const { data: initialMessages, isLoading: messagesLoading } =
		useGetMessagesQuery(ticketId);
	const [addMessage, { isLoading: isAdding }] = useAddMessageMutation();
	const { newMessages: socketMessages } = useSocket(ticketId, userId);
	const [messages, setMessages] = useState(initialMessages || []);

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
			message.success('Сообщение отправлено!');
		} catch (error) {
			message.error('Ошибка при отправке сообщения');
		}
	};

	return { messages, isLoading: messagesLoading, isAdding, sendMessage };
};
