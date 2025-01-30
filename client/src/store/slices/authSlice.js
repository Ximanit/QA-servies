// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: !!localStorage.getItem('token'),
	user: localStorage.getItem('user') || null,
	token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload.name;
			state.token = action.payload.token;
			localStorage.setItem('user', action.payload.user);
			localStorage.setItem('token', action.payload.token);
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
			localStorage.removeItem('user');
			localStorage.removeItem('token');
		},
	},
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
