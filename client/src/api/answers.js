// src/api/answers.js
import api from './index';

export const addAnswer = (questionId, content, token) =>
	api
		.post(
			'/answer/',
			{ questionId, content },
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		)
		.then((response) => response.data);
