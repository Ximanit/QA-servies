import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../store/api';

const LoginPage = () => {
	const [login, { isLoading }] = useLoginMutation();
	const navigate = useNavigate();

	const onFinish = async (values) => {
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
					<Button type="primary" htmlType="submit" loading={isLoading}>
						Войти
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default LoginPage;
