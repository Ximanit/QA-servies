import { logout } from '../slices/authSlice';

export const logoutUser = () => (dispatch) => {
	dispatch(logout());
	localStorage.clear(); // Очищаем всё localStorage
};
