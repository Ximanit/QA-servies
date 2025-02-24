// src/redux/actions/questionsActions.js
import axios from 'axios';
import {
	setQuestions,
	setQuestionDetails,
	addQuestion,
} from '../slices/questionsSlice';

export const fetchQuestions = () => async (dispatch, getState) => {
	try {
		const token = getState().auth.token;
		const response = await axios.get('http://localhost:3000/question/', {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setQuestions(response.data));
	} catch (error) {
		console.error('Error fetching questions:', error);
	}
};

export const fetchQuestionDetails = (id) => async (dispatch, getState) => {
	try {
		const token = getState().auth.token;
		const response = await axios.get(`http://localhost:3000/question/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		dispatch(setQuestionDetails(response.data));
	} catch (error) {
		console.error('Error fetching question details:', error);
	}
};

export const createQuestion = (questionData) => async (dispatch, getState) => {
	try {
		const token = getState().auth.token;
		const response = await axios.post(
			'http://localhost:3000/question/',
			questionData,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		dispatch(addQuestion(response.data)); // Добавляем новый вопрос в Redux
		return response.data; // Возвращаем созданный вопрос
	} catch (error) {
		console.error('Error creating question:', error);
		throw error; // Пробрасываем ошибку для обработки в компоненте
	}
};
