import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { setUser as setAuthUser } from '../store/slices/authSlice';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values) => {
		setLoading(true);

		const { username, password } = values;

		try {
			const data = await loginUser({ username, password });
			const token = data.token; // предполагается, что токен возвращается в ответе
			dispatch(setAuthUser({ username, token }));
			message.success('Вы успешно вошли в систему!');
			navigate('/');
		} catch (error) {
			message.error(error.message || 'Неверное имя пользователя или пароль');
		}

		setLoading(false);
	};

	return (
		<div className="login-page">
			<Form onFinish={onFinish}>
				<Form.Item
					name="username"
					rules={[{ required: true, message: 'Введите имя пользователя!' }]}>
					<Input placeholder="Имя пользователя" />
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: 'Введите пароль!' }]}>
					<Input.Password placeholder="Пароль" />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" loading={loading}>
						Войти
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default LoginPage;
