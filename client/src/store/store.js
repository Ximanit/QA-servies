// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import questionsReducer from './slices/questionsSlice'; // Оставляем для совместимости, если нужно
import { api } from './api';

const store = configureStore({
	reducer: {
		auth: authReducer,
		questions: questionsReducer, // Можно убрать, если данные будут только в RTK Query
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export default store;
