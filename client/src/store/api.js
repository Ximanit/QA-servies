// src/store/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from './slices/authSlice'; // Для обработки авторизации
import { API_URL } from '../constants';

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.token;
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ['Questions', 'QuestionDetails'], // Для управления кэшем
	endpoints: (builder) => ({
		// Авторизация
		login: builder.mutation({
			query: (userData) => ({
				url: '/auth/login',
				method: 'POST',
				body: userData,
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUser({ data })); // Сохраняем данные пользователя в Redux
				} catch (error) {
					console.error('Login failed:', error);
				}
			},
		}),
		register: builder.mutation({
			query: (userData) => ({
				url: '/auth/registr',
				method: 'POST',
				body: userData,
			}),
			onQueryStarted: async (userData, { dispatch, queryFulfilled }) => {
				try {
					await queryFulfilled;
					// После регистрации сразу логиним пользователя
					const { data } = await dispatch(
						api.endpoints.login.initiate({
							username: userData.username,
							password: userData.password,
						})
					).unwrap();
					dispatch(setUser({ data }));
				} catch (error) {
					console.error('Registration failed:', error);
				}
			},
		}),

		// Вопросы
		getQuestions: builder.query({
			query: () => '/question/',
			providesTags: ['Questions'], // Для инвалидации кэша
		}),
		getQuestionDetails: builder.query({
			query: (id) => `/question/${id}`,
			providesTags: (result, error, id) => [{ type: 'QuestionDetails', id }], // Тег для конкретного вопроса
		}),
		createQuestion: builder.mutation({
			query: (questionData) => ({
				url: '/question/',
				method: 'POST',
				body: questionData,
			}),
			invalidatesTags: ['Questions'], // Обновляем список вопросов после создания
		}),

		// Ответы
		addAnswer: builder.mutation({
			query: ({ questionId, content }) => ({
				url: '/answer/',
				method: 'POST',
				body: { questionId, content },
			}),
			invalidatesTags: (result, error, { questionId }) => [
				{ type: 'QuestionDetails', id: questionId }, // Обновляем детали вопроса
			],
		}),
	}),
});

// Экспортируем хуки
export const {
	useLoginMutation,
	useRegisterMutation,
	useGetQuestionsQuery,
	useGetQuestionDetailsQuery,
	useCreateQuestionMutation,
	useAddAnswerMutation,
} = api;
