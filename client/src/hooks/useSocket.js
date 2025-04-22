// src/hooks/useSocket.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { API_URL } from '../constants/constants';

export const useSocket = (ticketId, userId) => {
	const [newMessages, setNewMessages] = useState([]);
	const [notifications, setNotifications] = useState({});

	useEffect(() => {
		const socket = io(API_URL, { transports: ['websocket', 'polling'] });
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
					setNotifications((prev) => {
						const updated = {
							...prev,
							[notifiedTicketId]: (prev[notifiedTicketId] || 0) + 1,
						};
						console.log('Updated notifications:', updated);
						return updated;
					});
				}
			}
		);

		socket.on('connect_error', (error) =>
			console.error('Socket.IO connection error:', error)
		);

		return () => socket.disconnect();
	}, [ticketId, userId]);

	return { newMessages, notifications };
};
