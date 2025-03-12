import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message } from 'antd';
import { useCreateQuestionMutation } from '../store/api';

const CreateQuestionPage = () => {
	const [form] = Form.useForm();
	const [createQuestion, { isLoading }] = useCreateQuestionMutation();
	const navigate = useNavigate();

	const onFinish = async (values) => {
		try {
			const newQuestion = await createQuestion(values).unwrap();
			message.success('Вопрос успешно создан!');
			form.resetFields();
			navigate(`/questions/${newQuestion._id}`);
		} catch (error) {
			message.error('Ошибка при создании вопроса');
		}
	};

	return (
		<Card title="Задайте вопрос" style={{ maxWidth: 600, margin: 'auto' }}>
			<Form form={form} onFinish={onFinish} layout="vertical">
				<Form.Item
					name="title"
					label="Заголовок"
					rules={[
						{ required: true, message: 'Пожалуйста, введите заголовок!' },
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					name="category"
					label="Категория"
					rules={[{ required: true, message: 'Выберите категорию!' }]}>
					<Input />
				</Form.Item>
				<Form.Item
					name="description"
					label="Описание"
					rules={[{ required: true, message: 'Введите описание!' }]}>
					<Input.TextArea rows={4} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" loading={isLoading}>
						{isLoading ? 'Создание...' : 'Создать'}
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default CreateQuestionPage;
