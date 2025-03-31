import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { API_URL } from '../constants/constants';

export const useSocket = (userId) => {
	const [newMessages, setNewMessages] = useState({});

	useEffect(() => {
		const socket = io(API_URL, { transports: ['websocket', 'polling'] });
		socket.on('connect', () => console.log('Connected to Socket.IO server'));
		socket.on('newMessageNotification', ({ ticketId, recipientId }) => {
			if (recipientId === userId) {
				setNewMessages((prev) => ({
					...prev,
					[ticketId]: (prev[ticketId] || 0) + 1,
				}));
			}
		});
		socket.on('connect_error', (error) =>
			console.error('Socket.IO connection error:', error)
		);
		return () => socket.disconnect();
	}, [userId]);

	return newMessages;
};
