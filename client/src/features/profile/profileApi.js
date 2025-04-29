// src/store/api/profileApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants/constants';
import { baseQueryWithAuth } from '../../utils/apiUtils';

const baseQuery = fetchBaseQuery({
	baseUrl: API_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) headers.set('Authorization', `Bearer ${token}`);
		return headers;
	},
});

const baseQueryWithAuthHandler = baseQueryWithAuth(baseQuery);

export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: baseQueryWithAuthHandler,
	tagTypes: ['Profile'],
	endpoints: (builder) => ({
		getProfile: builder.query({
			query: () => '/profile',
			providesTags: ['Profile'],
		}),
		updateProfile: builder.mutation({
			query: ({ id, ...profileData }) => ({
				url: `/profile/${id}`,
				method: 'PUT',
				body: profileData,
			}),
			invalidatesTags: ['Profile'],
		}),
	}),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
