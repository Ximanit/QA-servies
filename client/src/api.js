import axios from 'axios';

// Основной URL для вашего API
const API_URL = 'http://localhost:3000';

// Регистрация пользователя
export const registerUser = async (userData) => {
	try {
		const response = await axios.post(`${API_URL}/auth/registr`, userData);
		return response.data; // предполагается, что сервер возвращает нужные данные (например, токен)
	} catch (error) {
		throw new Error(error.response?.data?.message || 'Ошибка регистрации');
	}
};

// Авторизация пользователя
export const loginUser = async (userData) => {
	try {
		const response = await axios.post(`${API_URL}/auth/login`, userData);
		return response.data; // предполагается, что сервер возвращает токен
	} catch (error) {
		throw new Error(error.response?.data?.message || 'Ошибка авторизации');
	}
};

// Получение списка вопросов (с авторизацией)
export const getQuestions = async (token) => {
	try {
		const response = await axios.get(`${API_URL}/question/`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data; // предполагается, что сервер возвращает список вопросов
	} catch (error) {
		throw new Error(
			error.response?.data?.message || 'Ошибка получения вопросов'
		);
	}
};

// Создание нового вопроса (с авторизацией)
export const createQuestion = async (questionData, token) => {
	try {
		const response = await axios.post(`${API_URL}/question/`, questionData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data; // предполагается, что сервер возвращает созданный вопрос
	} catch (error) {
		throw new Error(error.response?.data?.message || 'Ошибка создания вопроса');
	}
};

// Создание ответа на вопрос (с авторизацией)
export const createAnswer = async (answerData, token) => {
	try {
		const response = await axios.post(`${API_URL}/answer/`, answerData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data; // предполагается, что сервер возвращает созданный ответ
	} catch (error) {
		throw new Error(error.response?.data?.message || 'Ошибка создания ответа');
	}
};
