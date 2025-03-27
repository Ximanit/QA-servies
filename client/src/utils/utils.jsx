// src/utils.js
import { Link } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';

export const formatMenuItems = (tickets, userId) => {
	// Функция сортировки по дате создания (от новых к старым)
	const sortByDate = (tickets) =>
		tickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

	// Функция для формирования элементов меню, включая заглушку с иконкой
	const getChildren = (ticketList) => {
		return ticketList.length > 0
			? ticketList.map((t) => ({
					key: t._id,
					label: <Link to={`/tickets/${t._id}`}>{t.title}</Link>,
			  }))
			: [
					{
						key: 'empty',
						label: (
							<>
								<InboxOutlined /> Нет заявок
							</>
						),
						disabled: true,
					},
			  ];
	};

	// Фильтрация и сортировка заявок
	const openTickets = sortByDate(tickets.filter((t) => t.status === 'Open'));
	const inProgressTickets = sortByDate(
		tickets.filter((t) => t.status === 'In Progress')
	);
	const closedTickets = sortByDate(
		tickets.filter((t) => t.status === 'Closed')
	);
	const createdTickets = sortByDate(
		tickets.filter((t) => t.author?._id === userId)
	);

	return [
		{
			key: 'open',
			label: 'Открытые',
			children: getChildren(openTickets),
		},
		{
			key: 'inProgress',
			label: 'В работе',
			children: getChildren(inProgressTickets),
		},
		{
			key: 'closed',
			label: 'Закрытые',
			children: getChildren(closedTickets),
		},
		{
			key: 'created',
			label: 'Созданные',
			children: getChildren(createdTickets),
		},
	];
};
