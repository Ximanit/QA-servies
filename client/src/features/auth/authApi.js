import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from '../../store/slices/authSlice';
import { API_URL } from '../../constants/constants';

import { baseQueryWithAuth } from '../../utils/apiUtils';

// Кастомный baseQuery с обработкой 401
const baseQuery = fetchBaseQuery({
	baseUrl: API_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) headers.set('Authorization', `Bearer ${token}`);
		return headers;
	},
});

const baseQueryWithAuthHandler = baseQueryWithAuth(baseQuery);

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: baseQueryWithAuthHandler,
	tagTypes: ['Users'],
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (userData) => ({
				url: '/auth/login',
				method: 'POST',
				body: userData,
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;
				dispatch(setUser({ data }));
			},
		}),
		register: builder.mutation({
			query: (userData) => ({
				url: '/auth/registr',
				method: 'POST',
				body: userData,
			}),
			onQueryStarted: async (userData, { dispatch, queryFulfilled }) => {
				await queryFulfilled;
				const { data } = await dispatch(
					authApi.endpoints.login.initiate({
						username: userData.username,
						password: userData.password,
					})
				).unwrap();
				dispatch(setUser({ data }));
			},
		}),
		getUsers: builder.query({
			query: () => '/auth/users',
			providesTags: ['Users'],
		}),
		// Новый эндпоинт для получения пользователя по ID
		getUserById: builder.query({
			query: (id) => `/auth/user/${id}`,
			providesTags: ['Users'],
		}),
		// Новый эндпоинт для обновления пользователя
		updateUser: builder.mutation({
			query: ({ id, ...userData }) => ({
				url: `/auth/update/${id}`,
				method: 'PUT', // или 'PUT' в зависимости от вашего API
				body: userData,
			}),
			// invalidatesTags: ['Users'], // Инвалидация кэша при обновлении
			onQueryStarted: async (_, { dispatch, queryFulfilled, getState }) => {
				const { data } = await queryFulfilled;
				const currentToken = getState().auth.token; // Получаем текущий токен
				dispatch(setUser({ data: { ...data.user, token: currentToken } }));
			},
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useGetUsersQuery,
	useGetUserByIdQuery,
	useUpdateUserMutation,
} = authApi;
