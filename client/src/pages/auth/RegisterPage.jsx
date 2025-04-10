// src/pages/RegisterPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useRegisterMutation } from '../features/auth/authApi';
import RegisterForm from '../features/auth/components/RegisterForm';

const RegisterPage = () => {
	const [register, { isLoading }] = useRegisterMutation();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		try {
			await register(values).unwrap();
			message.success('Вы успешно зарегистрированы!');
			navigate('/');
		} catch (error) {
			message.error(error.data?.message || 'Ошибка регистрации');
		}
	};

	return (
		<div>
			<RegisterForm onSubmit={onSubmit} isLoading={isLoading} />
		</div>
	);
};

export default RegisterPage;
