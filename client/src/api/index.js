// src/api/index.js
import axios from 'axios';
import { API_URL } from '../constants';

const api = axios.create({
	baseURL: API_URL,
});

// Перехватчик для обработки ошибок
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Например, перенаправление на логин при истёкшем токене
			localStorage.clear();
			window.location.href = '/auth/login';
		}
		return Promise.reject(error);
	}
);

export default api;
