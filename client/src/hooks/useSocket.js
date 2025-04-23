// src/hooks/useSocket.js
import { useEffect, useState } from 'react';
import socket from '../socket';

export const useSocket = (ticketId, userId) => {
	const [newMessages, setNewMessages] = useState([]);
	const [notifications, setNotifications] = useState({});

	useEffect(() => {
		socket.on('connect', () => {
			console.log('Connected to Socket.IO server');
			if (ticketId) socket.emit('joinTicket', ticketId);
		});

		socket.on('newMessage', (message) => {
			console.log('Received newMessage:', message);
			if (message.ticket === ticketId) {
				setNewMessages((prev) => [...prev, message]);
			}
		});

		socket.on(
			'newMessageNotification',
			({ ticketId: notifiedTicketId, recipientId }) => {
				console.log('Received newMessageNotification:', {
					notifiedTicketId,
					recipientId,
				});
				if (recipientId === userId) {
					setNotifications((prev) => ({
						...prev,
						[notifiedTicketId]: (prev[notifiedTicketId] || 0) + 1,
					}));
				}
			}
		);

		socket.on('connect_error', (error) => {
			console.error('Socket.IO connection error:', error);
		});

		return () => {
			socket.off('newMessage');
			socket.off('newMessageNotification');
			socket.off('connect_error');
		};
	}, [ticketId, userId]);

	return { newMessages, notifications };
};
