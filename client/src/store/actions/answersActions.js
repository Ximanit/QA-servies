// src/redux/actions/answersActions.js
import axios from 'axios';

export const addAnswer =
	(questionId, content) => async (dispatch, getState) => {
		try {
			const token = getState().auth.token; // Получаем токен из Redux
			const response = await axios.post(
				'http://localhost:3000/answer/',
				{ questionId, content },
				{
					headers: {
						Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
					},
				}
			);
			alert('Ответ успешно добавлен!');
		} catch (error) {
			console.error('Error adding answer:', error);
		}
	};
