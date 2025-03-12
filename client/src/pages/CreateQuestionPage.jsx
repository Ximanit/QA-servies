import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message } from 'antd';
import { createQuestionAction } from '../store/actions/questionsActions';

const CreateQuestionPage = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false); // Состояние загрузки

	const onFinish = async (values) => {
		setLoading(true); // Устанавливаем состояние загрузки
		try {
			const newQuestion = await dispatch(
				createQuestionAction({
					title: values.title,
					description: values.description,
					category: values.category,
				})
			);
			message.success('Вопрос успешно создан!'); // Показываем уведомление
			form.resetFields(); // Очищаем форму
			navigate(`/questions/${newQuestion._id}`); // Переход к созданному вопросу
		} catch (error) {
			message.error('Ошибка при создании вопроса. Попробуйте снова.');
		} finally {
			setLoading(false); // Отключаем состояние загрузки
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
					<Button type="primary" htmlType="submit" loading={loading}>
						{loading ? 'Создание...' : 'Создать'}
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default CreateQuestionPage;
