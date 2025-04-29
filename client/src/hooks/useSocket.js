import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { API_URL } from '../constants';

export const useSocket = (ticketId) => {
	const [socket, setSocket] = useState(null);
	const [newMessages, setNewMessages] = useState([]);

	useEffect(() => {
		const newSocket = io(API_URL);
		setSocket(newSocket);

		newSocket.on('connect', () => {
			newSocket.emit('joinTicket', ticketId);
		});

		newSocket.on('newMessage', (message) => {
			if (message.ticket === ticketId) {
				if (process.env.NODE_ENV !== 'production') {
					console.log('Received newMessage:', message);
				}
				setNewMessages((prev) =>
					prev.some((msg) => msg._id === message._id)
						? prev
						: [...prev, message]
				);
			}
		});

		return () => {
			newSocket.disconnect();
		};
	}, [ticketId]);

	const sendMessage = (message) => {
		if (socket) {
			socket.emit('sendMessage', { ticketId, message });
		}
	};

	return { newMessages, sendMessage };
};
