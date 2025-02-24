import { Link } from 'react-router-dom';

export const formatMenuItems = (questions) => {
	// Группируем вопросы по статусу
	const unanswered = questions.filter((q) => q.status === 'Новый'); // Вопросы без ответа
	const answered = questions.filter((q) => q.status !== 'Новый'); // Вопросы с ответом (если статус меняется после ответа)

	return [
		{
			key: 'sub1',
			label: 'Вопросы без ответа',
			children: unanswered.map((q) => ({
				key: q._id,
				label: <Link to={`/questions/${q._id}`}>{q.title}</Link>,
			})),
		},
		{
			key: 'sub2',
			label: 'Вопросы с ответом',
			children: answered.map((q) => ({
				key: q._id,
				label: <Link to={`/questions/${q._id}`}>{q.title}</Link>,
			})),
		},
	];
};
