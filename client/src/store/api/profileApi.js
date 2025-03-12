// src/store/api/profileApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants';

export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.token;
			if (token) headers.set('Authorization', `Bearer ${token}`);
			return headers;
		},
	}),
	tagTypes: ['Profile'],
	endpoints: (builder) => ({
		getProfile: builder.query({
			query: () => '/profile',
			providesTags: ['Profile'],
		}),
		updateProfile: builder.mutation({
			query: (profileData) => ({
				url: '/profile',
				method: 'PATCH',
				body: profileData,
			}),
			invalidatesTags: ['Profile'],
		}),
	}),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
