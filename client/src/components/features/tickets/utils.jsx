// src/components/features/tickets/utils.jsx
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export const formatMenuItems = (
	tickets,
	userId,
	newMessages = {},
	notifications = []
) => {
	const sortByDate = (tickets) =>
		tickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

	const getChildren = (ticketList) => {
		return ticketList.length > 0
			? ticketList.map((t) => ({
					key: t._id,
					label: (
						<>
							<Link to={`/tickets/${t._id}`}>{t.title}</Link>
							{newMessages[t._id] > 0 && (
								<Badge count={newMessages[t._id]} style={{ marginLeft: 5 }} />
							)}
						</>
					),
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

	// Фильтрация заявок, где пользователь является исполнителем (assignedTo)
	const assignedTickets = tickets.filter((t) => t.assignedTo?._id === userId);

	// Заявки, где пользователь — исполнитель, по статусам
	const openTickets = sortByDate(
		assignedTickets.filter((t) => t.status === 'Открыта')
	);
	const inProgressTickets = sortByDate(
		assignedTickets.filter((t) => t.status === 'В работе')
	);
	const closedTickets = sortByDate(
		assignedTickets.filter((t) => t.status === 'Закрыта')
	);

	// Заявки, где пользователь — автор (author)
	const createdTickets = sortByDate(
		tickets.filter((t) => t.author?._id === userId)
	);

	return [
		{ key: 'open', label: 'Открытые', children: getChildren(openTickets) },
		{
			key: 'inProgress',
			label: 'В работе',
			children: getChildren(inProgressTickets),
		},
		{ key: 'closed', label: 'Закрытые', children: getChildren(closedTickets) },
		{
			key: 'created',
			label: 'Созданные',
			children: getChildren(createdTickets),
		},
	];
};
