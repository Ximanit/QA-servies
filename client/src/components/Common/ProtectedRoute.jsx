import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/actions/authActions';
import { useGetProfileQuery } from '../../features/profile/profileApi';
import MainLayout from '../../layouts/MainLayout';

const ProtectedRoute = ({ children }) => {
	const { token } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, isLoading: isProfileLoading } = useGetProfileQuery(undefined, {
		skip: !token,
	});

	useEffect(() => {
		if (!token || error?.status === 401) {
			dispatch(logoutUser());
			navigate('/auth/login');
		}
	}, [token, error, dispatch, navigate]);

	if (!token) {
		return <Navigate to="/auth/login" replace />;
	}

	return <MainLayout isTokenChecking={isProfileLoading}>{children}</MainLayout>;
};

export default ProtectedRoute;
