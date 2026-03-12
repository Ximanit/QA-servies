import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logoutUser } from '../store/actions/authActions';

const API_URL = 'https://qa-servies.onrender.com';

// Общий raw baseQuery с заголовками авторизации
const rawBaseQuery = fetchBaseQuery({
	baseUrl: API_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithAuth = (baseQuery) => async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions);

	if (result.error) {
		const { status, data } = result.error;
		if (status === 401) {
			api.dispatch(logoutUser());
			return {
				error: {
					status,
					data: { message: 'Сессия истекла, пожалуйста, войдите снова' },
				},
			};
		} else if (status >= 500) {
			return {
				error: {
					status,
					data: { message: 'Серверная ошибка, попробуйте позже' },
				},
			};
		} else if (status === 400) {
			return {
				error: {
					status,
					data: { message: data?.message || 'Некорректный запрос' },
				},
			};
		}
	}

	return result;
};

export const apiBaseQuery = baseQueryWithAuth(rawBaseQuery);
