import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../../store/actions/authActions';
import { useGetUserByIdQuery } from '../../features/auth/authApi';

import MainLayout from '../../layouts/MainLayout';

const ProtectedRoute = ({ children }) => {
	const { token, id } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, isLoading: isProfileLoading } = useGetUserByIdQuery(id, {
		skip: !token || !id,
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
