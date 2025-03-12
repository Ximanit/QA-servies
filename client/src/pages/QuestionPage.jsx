// src/pages/QuestionPage.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionDetailsAction } from '../store/actions/questionsActions';
import { addAnswerAction } from '../store/actions/answersActions';

import { Form, Button, Input } from 'antd';

const QuestionPage = () => {
	const { id } = useParams(); // Получаем параметр id из URL
	const { TextArea } = Input;
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const questionDetails = useSelector(
		(state) => state.questions.questionDetails
	);

	const role = useSelector((state) => state.auth.roles);

	useEffect(() => {
		dispatch(fetchQuestionDetails(id)); // Загружаем детали вопроса при монтировании компонента
	}, [id, dispatch]);

	if (!questionDetails) {
		return <div>Загрузка...</div>; // Пока данные не загрузились, показываем сообщение
	}

	const onFinish = async (values) => {
		// setLoading(true);
		try {
			await dispatch(addAnswerAction(id, values.content));
			form.resetFields();
			dispatch(fetchQuestionDetailsAction(id)); // Обновляем данные вопроса
		} finally {
			// setLoading(false);
		}
	};

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
