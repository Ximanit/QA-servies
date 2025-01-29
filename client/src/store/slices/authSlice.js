// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		isAuthenticated: false,
		token: null, // Добавляем поле для токена
	},
	reducers: {
		setUser(state, action) {
			state.user = action.payload.user;
			state.isAuthenticated = true;
			state.token = action.payload.token; // Сохраняем токен
		},
		clearUser(state) {
			state.user = null;
			state.isAuthenticated = false;
			state.token = null; // Очищаем токен
		},
	},
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
