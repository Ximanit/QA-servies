// src/api/questions.js
import api from './index';

export const fetchQuestions = (token) =>
	api
		.get('/question/', {
			headers: { Authorization: `Bearer ${token}` },
		})
		.then((response) => response.data);

export const fetchQuestionDetails = (id, token) =>
	api
		.get(`/question/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		.then((response) => response.data);

export const createQuestion = (questionData, token) =>
	api
		.post('/question/', questionData, {
			headers: { Authorization: `Bearer ${token}` },
		})
		.then((response) => response.data);
