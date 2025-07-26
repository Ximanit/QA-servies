import { io } from 'socket.io-client';
import { API_URL } from './constants/constants';

const socket = io(API_URL, {
	transports: ['websocket', 'polling'],
	reconnection: true,
	reconnectionAttempts: 5,
	reconnectionDelay: 1000,
});

export default socket;
