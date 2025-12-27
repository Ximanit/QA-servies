import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from '../../utils/apiUtils';

export const ticketsApi = createApi({
	reducerPath: 'ticketsApi',
	baseQuery: apiBaseQuery,
	tagTypes: ['Tickets', 'TicketDetails', 'Messages', 'Notifications'],
	endpoints: (builder) => ({
		getTickets: builder.query({
			query: ({ page = 1, limit = 50 } = {}) =>
				`/ticket?page=${page}&limit=${limit}`, // Увеличиваем limit по умолчанию
			providesTags: ['Tickets'],
			transformResponse: (response) => response.tickets || [], // Извлекаем только массив tickets
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
				formData.append('assignedTo', ticketData.assignedTo);
				formData.append('priority', ticketData.priority);
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
				if (ticketData.status) formData.append('status', ticketData.status);
				if (ticketData.assignedTo)
					formData.append('assignedTo', ticketData.assignedTo);
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
				'Tickets',
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
		getUserTickets: builder.query({
			query: (userId, { page = 1, limit = 50 } = {}) =>
				`/ticket/user/${userId}?page=${page}&limit=${limit}`,
			providesTags: ['Tickets'],
			transformResponse: (response) => response.tickets || [], // Извлекаем только массив tickets
		}),
		getUserNotifications: builder.query({
			query: () => '/notification',
			providesTags: ['Notifications'],
		}),
		markNotificationsAsRead: builder.mutation({
			query: (ticketId) => ({
				url: `/notification/read/${ticketId}`,
				method: 'PUT',
			}),
			invalidatesTags: ['Notifications'],
		}),
		getTicketStats: builder.query({
			query: ({ userId, period }) => ({
				url: `/ticket/stats?period=${period}`,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}),
			providesTags: ['Tickets'],
			transformResponse: (response) => ({
				createdStats: response.createdStats || [],
				assignedStats: response.assignedStats || [],
			}),
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
	useGetUserTicketsQuery,
	useGetUserNotificationsQuery,
	useMarkNotificationsAsReadMutation,
	useGetTicketStatsQuery,
} = ticketsApi;
