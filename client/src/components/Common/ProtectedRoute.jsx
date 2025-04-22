// src/components/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { CircularProgress } from '@mui/material';

import { logoutUser } from '../../store/actions/authActions';
import { useGetProfileQuery } from '../../features/profile/profileApi'; // Для проверки токена

const ProtectedRoute = ({ children }) => {
	const { token } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Проверяем токен через запрос к профилю
	const { error, isLoading } = useGetProfileQuery(undefined, {
		skip: !token, // Пропускаем запрос, если токена нет
	});

	useEffect(() => {
		if (!token) {
			navigate('/auth/login');
		} else if (error) {
			// Если сервер вернул ошибку (например, 401), токен недействителен
			if (error.status === 401) {
				dispatch(logoutUser());
				navigate('/auth/login');
			}
		}
	}, [token, error, dispatch, navigate]);

	if (isLoading) {
		return (
			<CircularProgress
				size={20}
				sx={{ position: 'absolute', right: 10, top: 18 }}
			/>
		);
	}

	if (!token || (error && error.status === 401)) {
		return <Navigate to="/auth/login" replace />;
	}

	return children;
};

export default ProtectedRoute;
