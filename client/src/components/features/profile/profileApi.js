// src/store/api/profileApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../../constants/constants';

const baseQuery = fetchBaseQuery({
	baseUrl: API_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) headers.set('Authorization', `Bearer ${token}`);
		return headers;
	},
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
		api.dispatch(logoutUser());
	}
	return result;
};

export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: baseQueryWithAuth,
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
