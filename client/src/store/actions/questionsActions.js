// src/redux/actions/questionsActions.js
import axios from 'axios';
import { setQuestions, setQuestionDetails } from '../slices/questionsSlice';
import { useSelector } from 'react-redux';

export const fetchQuestions = () => async (dispatch, getState) => {
	try {
		const token = getState().auth.token; // Получаем токен из Redux
		const response = await axios.get('http://localhost:3000/question/', {
			headers: {
				Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
			},
		});
		dispatch(setQuestions(response.data)); // Сохраняем полученные вопросы в Redux
	} catch (error) {
		console.error('Error fetching questions:', error);
	}
};

export const fetchQuestionDetails = (id) => async (dispatch, getState) => {
	try {
		const token = getState().auth.token; // Получаем токен из Redux
		const response = await axios.get(`http://localhost:3000/question/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
			},
		});
		dispatch(setQuestionDetails(response.data)); // Обновляем Redux с подробностями вопроса
	} catch (error) {
		console.error('Error fetching question details:', error);
	}
};
