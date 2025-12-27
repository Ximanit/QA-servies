import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { authApi } from '../features/auth/authApi';
import { ticketsApi } from '../features/tickets/ticketsApi';

const store = configureStore({
	reducer: {
		auth: authReducer,
		[authApi.reducerPath]: authApi.reducer,
		[ticketsApi.reducerPath]: ticketsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware, ticketsApi.middleware),
});

export default store;
