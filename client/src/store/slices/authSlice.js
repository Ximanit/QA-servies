// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: localStorage.getItem('user') || null,
	token: localStorage.getItem('token') || null,
	roles: localStorage.getItem('roles') || null,
	id: localStorage.getItem('id') || null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload.data.name;
			state.token = action.payload.data.token;
			state.roles = JSON.stringify(action.payload.data.roles);
			state.id = action.payload.data.id;
			localStorage.setItem('user', action.payload.data.name);
			localStorage.setItem('token', action.payload.data.token);
			localStorage.setItem('roles', JSON.stringify(action.payload.data.roles));
			localStorage.setItem('id', action.payload.data.id);
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
