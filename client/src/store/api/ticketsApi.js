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

export const ticketsApi = createApi({
	reducerPath: 'ticketsApi',
	baseQuery: baseQueryWithAuth,
	tagTypes: ['Tickets', 'TicketDetails', 'Messages'],
	endpoints: (builder) => ({
		getTickets: builder.query({
			query: () => '/ticket',
			providesTags: ['Tickets'],
		}),
		getTicketDetails: builder.query({
			query: (id) => `/ticket/${id}`,
			providesTags: (result, error, id) => [{ type: 'TicketDetails', id }],
		}),
		createTicket: builder.mutation({
			query: (ticketData) => {
				const formData = new FormData();
				formData.append('title', ticketData.title);
				formData.append('description', ticketData.description);
				formData.append('category', ticketData.category);
				if (ticketData.files) {
					ticketData.files.forEach((file) => formData.append('files', file));
				}
				return {
					url: '/ticket',
					method: 'POST',
					body: formData,
				};
			},
			invalidatesTags: ['Tickets'],
		}),
		updateTicket: builder.mutation({
			query: ({ id, ...ticketData }) => {
				const formData = new FormData();
				Object.keys(ticketData).forEach((key) => {
					if (key !== 'files') formData.append(key, ticketData[key]);
				});
				if (ticketData.files) {
					ticketData.files.forEach((file) => formData.append('files', file));
				}
				return {
					url: `/ticket/${id}`,
					method: 'PUT',
					body: formData,
				};
			},
			invalidatesTags: (result, error, { id }) => [
				{ type: 'TicketDetails', id },
			],
		}),
		getMessages: builder.query({
			query: (ticketId) => `/message/${ticketId}`,
			providesTags: (result, error, ticketId) => [
				{ type: 'Messages', id: ticketId },
			],
		}),
		addMessage: builder.mutation({
			query: ({ ticketId, content, files }) => {
				const formData = new FormData();
				formData.append('ticketId', ticketId);
				formData.append('content', content);
				if (files) {
					files.forEach((file) => formData.append('files', file));
				}
				return {
					url: '/message',
					method: 'POST',
					body: formData,
				};
			},
			invalidatesTags: (result, error, { ticketId }) => [
				{ type: 'Messages', id: ticketId },
			],
		}),
	}),
});

export const {
	useGetTicketsQuery,
	useGetTicketDetailsQuery,
	useCreateTicketMutation,
	useUpdateTicketMutation,
	useGetMessagesQuery,
	useAddMessageMutation,
} = ticketsApi;
