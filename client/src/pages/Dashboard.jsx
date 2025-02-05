// src/pages/Dashboard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchQuestions } from '../store/actions/questionsActions';

const Dashboard = () => {
	const dispatch = useDispatch();
	const questions = useSelector((state) => state.questions.list);
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		dispatch(fetchQuestions()); // Получаем список вопросов при загрузке компонента
	}, [dispatch]);

	return (
		<div className="dashboard">
			<h1>Добро пожаловать, {user}</h1>
			<h2>Список вопросов</h2>
			<ul>
				{questions.length > 0 ? (
					questions.map((question) => (
						<li key={question._id}>
							<Link to={`/questions/${question._id}`}>{question.title}</Link>
						</li>
					))
				) : (
					<li>Нет доступных вопросов.</li>
				)}
			</ul>
		</div>
	);
};

export default Dashboard;
