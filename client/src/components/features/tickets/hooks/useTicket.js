// src/components/features/tickets/hooks/useTicket.js
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

	const { data: ticketDetails, isLoading: ticketLoading } =
		useGetTicketDetailsQuery(ticketId);
	const { data: initialMessages, isLoading: messagesLoading } =
		useGetMessagesQuery(ticketId);

	const [addMessage, { isLoading: isAdding }] = useAddMessageMutation();
	const [updateTicket] = useUpdateTicketMutation();
	const [markNotificationsAsRead] = useMarkNotificationsAsReadMutation();

	const socketMessages = useSocket(ticketId, userId);
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

	useEffect(() => {
		if (messages) {
			markNotificationsAsRead(ticketId);
		}
	}, [messages, ticketId, markNotificationsAsRead]);

	const sendMessage = async ({ content, files }) => {
		try {
			const messageData = { ticketId, content, files };
			await addMessage(messageData).unwrap();
			message.success('Сообщение отправлено!');
		} catch (error) {
			message.error('Ошибка при отправке сообщения');
		}
	};

	// Новая функция для передачи заявки другому исполнителю
	const assignTicket = async (newAssignedTo) => {
		try {
			await updateTicket({ id: ticketId, assignedTo: newAssignedTo }).unwrap();
			message.success('Заявка передана другому исполнителю!');
		} catch (error) {
			message.error('Ошибка при передаче заявки');
		}
	};

	// Новая функция для завершения заявки
	const completeTicket = async () => {
		try {
			await updateTicket({ id: ticketId, status: 'Закрыта' }).unwrap();
			message.success('Заявка завершена!');
		} catch (error) {
			message.error('Ошибка при завершении заявки');
		}
	};

	return {
		ticketDetails,
		messages,
		userId,
		isLoading: ticketLoading || messagesLoading,
		isAdding,
		sendMessage,
		assignTicket, // Добавляем в возвращаемый объект
		completeTicket, // Добавляем в возвращаемый объект
	};
};
