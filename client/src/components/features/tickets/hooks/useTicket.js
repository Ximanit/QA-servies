// src/features/tickets/hooks/useTicket.js
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import {
	useGetTicketDetailsQuery,
	useGetMessagesQuery,
	useAddMessageMutation,
	useUpdateTicketMutation,
	useMarkNotificationsAsReadMutation,
} from '../ticketsApi';
import { useSocket } from '../../../../hooks/useSocket';

export const useTicket = (ticketId) => {
	const userId = useSelector((state) => state.auth.id);

	// Загрузка данных
	const { data: ticketDetails, isLoading: ticketLoading } =
		useGetTicketDetailsQuery(ticketId);
	const { data: initialMessages, isLoading: messagesLoading } =
		useGetMessagesQuery(ticketId);

	// Мутации
	const [addMessage, { isLoading: isAdding }] = useAddMessageMutation();
	const [updateTicket] = useUpdateTicketMutation();
	const [markNotificationsAsRead] = useMarkNotificationsAsReadMutation();

	// Сообщения из сокетов
	const socketMessages = useSocket(ticketId, userId);
	const [messages, setMessages] = useState(initialMessages || []);

	// Синхронизация сообщений
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

	// Обновление статуса
	useEffect(() => {
		if (
			ticketDetails &&
			ticketDetails.status === 'Открыта' &&
			ticketDetails.author._id !== userId
		) {
			updateTicket({ id: ticketId, status: 'В работе' })
				.unwrap()
				.then(() => message.success('Заявка переведена в статус "В работе"'))
				.catch(() => message.error('Ошибка при обновлении статуса'));
		}
	}, [ticketDetails, ticketId, updateTicket, userId]);

	// Пометка уведомлений как прочитанных
	useEffect(() => {
		if (messages) {
			markNotificationsAsRead(ticketId);
		}
	}, [messages, ticketId, markNotificationsAsRead]);

	// Отправка сообщения
	const sendMessage = async ({ content, files }) => {
		try {
			const messageData = { ticketId, content, files };
			await addMessage(messageData).unwrap();
			message.success('Сообщение отправлено!');
		} catch (error) {
			message.error('Ошибка при отправке сообщения');
		}
	};

	return {
		ticketDetails,
		messages,
		userId,
		isLoading: ticketLoading || messagesLoading,
		isAdding,
		sendMessage,
	};
};
