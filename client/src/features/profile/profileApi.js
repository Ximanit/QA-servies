import { createApi } from '@reduxjs/toolkit/query/react';

import { apiBaseQuery } from '../../utils/apiUtils';

export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: apiBaseQuery,
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
		createProfile: builder.mutation({
			query: (profileData) => ({
				url: '/profile',
				method: 'POST',
				body: profileData,
			}),
			invalidatesTags: ['Profile'],
		}),
	}),
});

export const {
	useGetProfileQuery,
	useUpdateProfileMutation,
	useCreateProfileMutation,
} = profileApi;
