// src/features/auth/components/LoginForm.jsx
import React from 'react';
import { Form, Input, Button } from 'antd';

const LoginForm = ({ onSubmit, isLoading }) => {
	const [form] = Form.useForm();

	const handleSubmit = (values) => {
		onSubmit(values);
	};

	return (
		<Form form={form} onFinish={handleSubmit} layout="vertical">
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
	);
};

export default LoginForm;
