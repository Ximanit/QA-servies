import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: localStorage.getItem('token') || null,
	id: localStorage.getItem('id') || null,
	email: localStorage.getItem('email') || null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.token = action.payload.data.token;
			state.id = action.payload.data.id || action.payload.data._id;
			state.email = action.payload.data.email || action.payload.data.username;
			localStorage.setItem('token', action.payload.data.token);
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
			state.token = null;
			state.id = null;
			state.email = null;
			localStorage.removeItem('token');
			localStorage.removeItem('id');
			localStorage.removeItem('email');
		},
	},
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
