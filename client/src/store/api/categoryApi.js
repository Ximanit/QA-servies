// src/store/api/categoryApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants';

export const categoryApi = createApi({
	reducerPath: 'categoryApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.token;
			if (token) headers.set('Authorization', `Bearer ${token}`);
			return headers;
		},
	}),
	tagTypes: ['Categories'],
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: () => '/category',
			providesTags: ['Categories'],
		}),
	}),
});

export const { useGetCategoriesQuery } = categoryApi;
