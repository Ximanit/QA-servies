import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { authApi } from './api/authApi';
import { ticketsApi } from './api/ticketsApi';
import { profileApi } from './api/profileApi';
import { categoryApi } from './api/categoryApi';

const store = configureStore({
	reducer: {
		auth: authReducer,
		[authApi.reducerPath]: authApi.reducer,
		[ticketsApi.reducerPath]: ticketsApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
		[categoryApi.reducerPath]: categoryApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			ticketsApi.middleware,
			profileApi.middleware,
			categoryApi.middleware
		),
});

export default store;
