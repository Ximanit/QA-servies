import { createApi } from '@reduxjs/toolkit/query/react';

import { setUser } from '../../store/slices/authSlice';
import { apiBaseQuery } from '../../utils/apiUtils';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: apiBaseQuery,
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
						fio: userData.fio,
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
		getUserById: builder.query({
			query: (id) => `/auth/user/${id}`,
			providesTags: ['Users'],
		}),
		updateUser: builder.mutation({
			query: ({ id, ...userData }) => ({
				url: `/auth/update/${id}`,
				method: 'PUT',
				body: userData,
			}),
			invalidatesTags: ['Users'], // Инвалидация кэша при обновлении
			onQueryStarted: async (_, { dispatch, queryFulfilled, getState }) => {
				const { data } = await queryFulfilled;
				const currentToken = getState().auth.token; // Получаем текущий токен
				dispatch(setUser({ data: { ...data.user, token: currentToken } }));
			},
		}),
		changePassword: builder.mutation({
			query: ({ id, ...passwordData }) => ({
				url: `/auth/change-password/${id}`, // Обратите внимание: путь с /auth/
				method: 'PUT',
				body: passwordData,
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useGetUsersQuery,
	useGetUserByIdQuery,
	useUpdateUserMutation,
	useChangePasswordMutation,
} = authApi;
