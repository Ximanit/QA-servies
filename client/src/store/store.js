import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { authApi } from '../features/auth/authApi';
import { ticketsApi } from '../features/tickets/ticketsApi';
import { profileApi } from '../features/profile/profileApi';

const store = configureStore({
	reducer: {
		auth: authReducer,
		[authApi.reducerPath]: authApi.reducer,
		[ticketsApi.reducerPath]: ticketsApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			ticketsApi.middleware,
			profileApi.middleware
		),
});

export default store;
