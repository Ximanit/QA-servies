import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { registerUser } from '../api';

const RegisterPage = () => {
	const [loading, setLoading] = useState(false);

	const onFinish = async (values) => {
		setLoading(true);

		const { username, password } = values;

		try {
			const data = await registerUser({ username, password });
			message.success('Вы успешно зарегистрированы!');
		} catch (error) {
			message.error(error.message || 'Ошибка регистрации');
		}

		setLoading(false);
	};

	return (
		<div className="register-page">
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
						Зарегистрироваться
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default RegisterPage;
