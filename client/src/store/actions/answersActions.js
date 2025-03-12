// src/store/actions/answersActions.js
import { addAnswer } from '../../api/answers';

export const addAnswerAction =
	(questionId, content) => async (dispatch, getState) => {
		try {
			const token = getState().auth.token;
			await addAnswer(questionId, content, token);
			alert('Ответ успешно добавлен!');
		} catch (error) {
			console.error('Error adding answer:', error);
			throw error;
		}
	};
