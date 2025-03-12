// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { authApi } from './api/authApi';
import { questionsApi } from './api/questionsApi';
import { profileApi } from './api/profileApi';
import { categoryApi } from './api/categoryApi';

const store = configureStore({
	reducer: {
		auth: authReducer,
		[authApi.reducerPath]: authApi.reducer,
		[questionsApi.reducerPath]: questionsApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
		[categoryApi.reducerPath]: categoryApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			questionsApi.middleware,
			profileApi.middleware,
			categoryApi.middleware
		),
});

export default store;
