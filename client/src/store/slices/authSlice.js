// src/store/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: localStorage.getItem('user') || null,
	token: localStorage.getItem('token') || null,
	roles: localStorage.getItem('roles') || null,
	id: localStorage.getItem('id') || null,
	email: localStorage.getItem('email') || null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload.data.name;
			state.token = action.payload.data.token;
			state.roles = JSON.stringify(action.payload.data.roles);
			state.id = action.payload.data.id || action.payload.data._id;
			state.email = action.payload.data.email || action.payload.data.username;
			localStorage.setItem('user', action.payload.data.name);
			localStorage.setItem('token', action.payload.data.token);
			localStorage.setItem('roles', JSON.stringify(action.payload.data.roles));
			localStorage.setItem(
				'id',
				action.payload.data.id || action.payload.data._id
			);
			localStorage.setItem(
				'email',
				action.payload.data.email || action.payload.data.username
			);
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.roles = null;
			state.id = null;
			state.email = null;
			localStorage.removeItem('user');
			localStorage.removeItem('token');
			localStorage.removeItem('roles');
			localStorage.removeItem('id');
			localStorage.removeItem('email');
		},
	},
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
