// src/pages/LoginPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useLoginMutation } from '../components/features/auth/authApi';
import LoginForm from '../components/features/auth/components/LoginForm';

const LoginPage = () => {
	const [login, { isLoading }] = useLoginMutation();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		try {
			await login(values).unwrap();
			message.success('Вы успешно вошли в систему!');
			navigate('/');
		} catch (error) {
			message.error(
				error.data?.message || 'Неверное имя пользователя или пароль'
			);
		}
	};

	return (
		<div>
			<LoginForm onSubmit={onSubmit} isLoading={isLoading} />
		</div>
	);
};

export default LoginPage;
