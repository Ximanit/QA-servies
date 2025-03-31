// src/hooks/useSocket.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { API_URL } from '../constants/constants';

export const useSocket = (ticketId, userId) => {
	const [newMessages, setNewMessages] = useState([]);

	useEffect(() => {
		const socket = io(API_URL, { transports: ['websocket', 'polling'] });
		socket.on('connect', () => {
			console.log('Connected to Socket.IO server');
			socket.emit('joinTicket', ticketId);
		});
		socket.on('newMessage', (message) => {
			if (message.ticketId === ticketId) {
				setNewMessages((prev) => [...prev, message]);
			}
		});
		socket.on('connect_error', (error) =>
			console.error('Socket.IO connection error:', error)
		);
		return () => socket.disconnect();
	}, [ticketId]);

	return newMessages;
};
