import axios from 'axios';
import { setUser, logout } from '../slices/authSlice';

const API_URL = 'http://localhost:3000';

// **Регистрация пользователя**
export const registerUser = (userData) => async (dispatch) => {
	try {
		await axios.post(`${API_URL}/auth/registr`, userData);

		// После успешной регистрации сразу логиним пользователя
		const loginResponse = await axios.post(`${API_URL}/auth/login`, {
			username: userData.username,
			password: userData.password,
		});

		dispatch(setUser({ data: loginResponse.data })); // Сохраняем пользователя в Redux
		return loginResponse.data; // Возвращаем данные для возможной обработки
	} catch (error) {
		throw new Error(error.response?.data?.message || 'Ошибка регистрации');
	}
};

// **Авторизация пользователя**
export const loginUser = (userData) => async (dispatch) => {
	try {
		const response = await axios.post(`${API_URL}/auth/login`, userData);
		dispatch(setUser({ data: response.data })); // Сохраняем пользователя в Redux
		return response.data;
	} catch (error) {
		throw new Error(error.response?.data?.message || 'Ошибка авторизации');
	}
};

// **Выход пользователя**
export const logoutUser = () => (dispatch) => {
	dispatch(logout()); // Очищаем Redux
	localStorage.clear(); // Полностью чистим localStorage
};
