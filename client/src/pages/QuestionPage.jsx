// src/pages/QuestionPage.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionDetails } from '../store/actions/questionsActions';

const QuestionPage = () => {
	const { id } = useParams(); // Получаем параметр id из URL
	const dispatch = useDispatch();
	const questionDetails = useSelector(
		(state) => state.questions.questionDetails
	);

	useEffect(() => {
		dispatch(fetchQuestionDetails(id)); // Загружаем детали вопроса при монтировании компонента
	}, [id, dispatch]);

	if (!questionDetails) {
		return <div>Загрузка...</div>; // Пока данные не загрузились, показываем сообщение
	}

	return (
		<div className="question-page">
			<h1>{questionDetails.title}</h1>
			<p>{questionDetails.description}</p>
			<p>
				<strong>Категория:</strong> {questionDetails.category}
			</p>
			<p>
				<strong>Статус:</strong> {questionDetails.status}
			</p>
			<p>
				<strong>Автор:</strong> {questionDetails.username}
			</p>
			<p>
				<strong>Дата создания:</strong>{' '}
				{new Date(questionDetails.createdAt).toLocaleString()}
			</p>
		</div>
	);
};

export default QuestionPage;
