// src/store/api/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from '../slices/authSlice';
import { API_URL } from '../../constants';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.token;
			if (token) headers.set('Authorization', `Bearer ${token}`);
			return headers;
		},
	}),
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
	}),
});

export const { useLoginMutation, useRegisterMutation, useGetUsersQuery } =
	authApi;
