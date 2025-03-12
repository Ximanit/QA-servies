// src/api/auth.js
import api from './index';

export const register = (userData) =>
	api.post('/auth/registr', userData).then((response) => response.data);

export const login = (userData) =>
	api.post('/auth/login', userData).then((response) => response.data);
