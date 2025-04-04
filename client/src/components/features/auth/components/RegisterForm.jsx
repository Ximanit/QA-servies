// src/features/auth/components/RegisterForm.jsx
import React from 'react';
import { Form, Input, Button } from 'antd';

const RegisterForm = ({ onSubmit, isLoading }) => {
	const [form] = Form.useForm();

	const handleSubmit = (values) => {
		onSubmit(values);
	};

	return (
		<Form form={form} onFinish={handleSubmit} layout="vertical">
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
				<Button type="primary" htmlType="submit" loading={isLoading}>
					Зарегистрироваться
				</Button>
			</Form.Item>
		</Form>
	);
};

export default RegisterForm;
