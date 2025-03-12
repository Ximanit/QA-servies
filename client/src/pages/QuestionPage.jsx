import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, Button, Input } from 'antd';
import {
	useGetQuestionDetailsQuery,
	useAddAnswerMutation,
} from '../store/api/questionsApi';

const QuestionPage = () => {
	const { id } = useParams();
	const { TextArea } = Input;
	const [form] = Form.useForm();
	const { data: questionDetails, isLoading } = useGetQuestionDetailsQuery(id);
	const [addAnswer, { isLoading: isAdding }] = useAddAnswerMutation();
	const role = useSelector((state) => state.auth.roles);

	const onFinish = async (values) => {
		try {
			await addAnswer({ questionId: id, content: values.content }).unwrap();
			form.resetFields();
			message.success('Ответ добавлен!');
		} catch (error) {
			message.error('Ошибка при добавлении ответа');
		}
	};

	if (isLoading || !questionDetails) return <div>Загрузка...</div>;
	return (
		<>
			<div>
				<div className="question-page">
					Вопрос
					<h1>{questionDetails.title}</h1>
					<p>{questionDetails.description}</p>
					<p>
						<strong>Категория:</strong> {questionDetails.category}
					</p>
					<p>
						<strong>Статус:</strong> {questionDetails.status}
					</p>
					<p>
						<strong>Автор:</strong> {questionDetails.author.username}
					</p>
					<p>
						<strong>Дата создания:</strong>{' '}
						{new Date(questionDetails.createdAt).toLocaleString()}
					</p>
				</div>
				{role == '["USER"]' ? (
					<div>
						Ответ
						<p>{questionDetails.description}</p>
					</div>
				) : (
					<Form form={form} onFinish={onFinish} layout="vertical">
						<Form.Item
							name="content"
							rules={[{ required: true, message: 'Введите текст ответа!' }]}>
							<TextArea rows={4} placeholder="Ваш ответ" />
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Отправить
							</Button>
						</Form.Item>
					</Form>
				)}
			</div>
		</>
	);
};

export default QuestionPage;
