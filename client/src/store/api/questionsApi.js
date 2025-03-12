// src/store/api/questionsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants';

export const questionsApi = createApi({
	reducerPath: 'questionsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.token;
			if (token) headers.set('Authorization', `Bearer ${token}`);
			return headers;
		},
	}),
	tagTypes: ['Questions', 'QuestionDetails'],
	endpoints: (builder) => ({
		getQuestions: builder.query({
			query: () => '/question/',
			providesTags: ['Questions'],
		}),
		getQuestionDetails: builder.query({
			query: (id) => `/question/${id}`,
			providesTags: (result, error, id) => [{ type: 'QuestionDetails', id }],
		}),
		createQuestion: builder.mutation({
			query: (questionData) => ({
				url: '/question/',
				method: 'POST',
				body: questionData,
			}),
			invalidatesTags: ['Questions'],
		}),
		addAnswer: builder.mutation({
			query: ({ questionId, content }) => ({
				url: '/answer/',
				method: 'POST',
				body: { questionId, content },
			}),
			invalidatesTags: (result, error, { questionId }) => [
				{ type: 'QuestionDetails', id: questionId },
			],
		}),
	}),
});

export const {
	useGetQuestionsQuery,
	useGetQuestionDetailsQuery,
	useCreateQuestionMutation,
	useAddAnswerMutation,
} = questionsApi;
