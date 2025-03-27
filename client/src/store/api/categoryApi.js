// src/store/api/categoryApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants';

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

export const categoryApi = createApi({
	reducerPath: 'categoryApi',
	baseQuery: baseQueryWithAuth,
	tagTypes: ['Categories'],
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: () => '/category',
			providesTags: ['Categories'],
		}),
	}),
});

export const { useGetCategoriesQuery } = categoryApi;
