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
	const { error, isLoading } = useGetProfileQuery(undefined, { skip: !token });

	useEffect(() => {
		if (!token || error?.status === 401) {
			dispatch(logoutUser());
			navigate('/auth/login');
		}
	}, [token, error, dispatch, navigate]);

	if (isLoading) {
		return (
			<CircularProgress sx={{ position: 'absolute', right: 10, top: 18 }} />
		);
	}

	return token ? children : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
