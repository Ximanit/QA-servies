// src/pages/TicketPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, message } from 'antd';
import { io } from 'socket.io-client';
import {
	useGetTicketDetailsQuery,
	useGetMessagesQuery,
	useAddMessageMutation,
	useUpdateTicketMutation,
	useMarkNotificationsAsReadMutation,
} from '../components/features/tickets/ticketsApi';
import { API_URL } from '../constants/constants';
import TicketDetails from '../components/features/tickets/components/TicketDetails';
import TicketChat from '../components/features/tickets/components/TicketChat';

const TicketPage = () => {
	const { id } = useParams();
	const { data: ticketDetails, isLoading: ticketLoading } =
		useGetTicketDetailsQuery(id);
	const { data: messages, isLoading: messagesLoading } =
		useGetMessagesQuery(id);
	const [addMessage, { isLoading: isAdding }] = useAddMessageMutation();
	const [updateTicket] = useUpdateTicketMutation();
	const [markNotificationsAsRead] = useMarkNotificationsAsReadMutation();
	const userId = useSelector((state) => state.auth.id);
	const [chatMessages, setChatMessages] = useState([]);

	useEffect(() => {
		if (
			ticketDetails &&
			ticketDetails.status === 'Открыта' &&
			ticketDetails.author._id !== userId
		) {
			updateTicket({ id, status: 'В работе' })
				.unwrap()
				.then(() => message.success('Заявка переведена в статус "В работе"'))
				.catch(() => message.error('Ошибка при обновлении статуса'));
		}
	}, [ticketDetails, id, updateTicket, userId]);

	useEffect(() => {
		const socket = io(API_URL, { transports: ['websocket', 'polling'] });
		socket.on('connect', () => socket.emit('joinTicket', id));
		socket.on('newMessage', (message) =>
			setChatMessages((prev) => [...prev, message])
		);
		return () => socket.disconnect();
	}, [id]);

	useEffect(() => {
		if (messages) setChatMessages(messages);
		markNotificationsAsRead(id);
	}, [messages, id, markNotificationsAsRead]);

	const onSendMessage = async ({ content, files }) => {
		try {
			const messageData = { ticketId: id, content, files };
			await addMessage(messageData).unwrap();
			message.success('Сообщение отправлено!');
		} catch (error) {
			message.error('Ошибка при отправке сообщения');
		}
	};

	if (ticketLoading || messagesLoading) return <div>Загрузка...</div>;

	return (
		<Card title={`Заявка: ${ticketDetails?.title}`}>
			<TicketDetails ticket={ticketDetails} />
			<TicketChat
				messages={chatMessages}
				onSendMessage={onSendMessage}
				userId={userId}
				isLoading={isAdding}
			/>
		</Card>
	);
};

export default TicketPage;
