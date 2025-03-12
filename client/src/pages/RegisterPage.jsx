import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { useRegisterMutation } from '../store/api/authApi';

const RegisterPage = () => {
	const [register, { isLoading }] = useRegisterMutation();
	const navigate = useNavigate();

	const onFinish = async (values) => {
		try {
			await register(values).unwrap();
			message.success('Вы успешно зарегистрированы!');
			navigate('/');
		} catch (error) {
			message.error(error.data?.message || 'Ошибка регистрации');
		}
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
					<Button type="primary" htmlType="submit" loading={isLoading}>
						Зарегистрироваться
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default RegisterPage;
