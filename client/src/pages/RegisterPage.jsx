import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setUser } from '../store/slices/authSlice';

import { Form, Input, Button, message } from 'antd';

import { registerUser } from '../store/actions/authActions';

const RegisterPage = () => {
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onFinish = async (values) => {
		setLoading(true);

		try {
			await dispatch(registerUser(values));
			message.success('Вы успешно зарегистрированы!');
			dispatch(setUser({ data }));
			navigate('/');
		} catch (error) {
			message.error(error.message || 'Ошибка регистрации');
		}

		setLoading(false);
	};

	return (
		<div className="register-page">
			<Form onFinish={onFinish}>
				<Form.Item
					name="name"
					rules={[{ required: true, message: 'Введите ваше ФИО!' }]}>
					<Input placeholder="Фамилия Имя Отчество" />
				</Form.Item>
				<Form.Item
					name="username"
					rules={[{ required: true, message: 'Введите логин!' }]}>
					<Input placeholder="Логин" />
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: 'Введите пароль!' }]}>
					<Input.Password placeholder="Пароль" />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" loading={loading}>
						Зарегистрироваться
					</Button>
				</Form.Item>
				<Link to="/auth/login">Войти в уже созданный профиль</Link>
			</Form>
		</div>
	);
};

export default RegisterPage;
