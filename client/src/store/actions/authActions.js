// src/store/actions/authActions.js
import { setUser, logout } from '../slices/authSlice';
import { register, login } from '../../api/auth';

export const registerUser = (userData) => async (dispatch) => {
	try {
		await register(userData);
		const loginResponse = await login({
			username: userData.username,
			password: userData.password,
		});
		dispatch(setUser({ data: loginResponse }));
		return loginResponse;
	} catch (error) {
		throw new Error(error.response?.data?.message || 'Ошибка регистрации');
	}
};

export const loginUser = (userData) => async (dispatch) => {
	try {
		const response = await login(userData);
		dispatch(setUser({ data: response }));
		return response;
	} catch (error) {
		throw new Error(error.response?.data?.message || 'Ошибка авторизации');
	}
};

export const logoutUser = () => (dispatch) => {
	dispatch(logout());
	localStorage.clear();
};
