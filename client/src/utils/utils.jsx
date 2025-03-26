import { Link } from 'react-router-dom';

export const formatMenuItems = (tickets) => {
	const openTickets = tickets.filter((t) => t.status === 'Открыта');
	const inProgressTickets = tickets.filter((t) => t.status === 'В работе');
	const closedTickets = tickets.filter((t) => t.status === 'Закрыта');

	return [
		{
			key: 'sub1',
			label: 'Открытые заявки',
			children: openTickets.map((t) => ({
				key: t._id,
				label: <Link to={`/tickets/${t._id}`}>{t.title}</Link>,
			})),
		},
		{
			key: 'sub2',
			label: 'Заявки в работе',
			children: inProgressTickets.map((t) => ({
				key: t._id,
				label: <Link to={`/tickets/${t._id}`}>{t.title}</Link>,
			})),
		},
		{
			key: 'sub3',
			label: 'Закрытые заявки',
			children: closedTickets.map((t) => ({
				key: t._id,
				label: <Link to={`/tickets/${t._id}`}>{t.title}</Link>,
			})),
		},
	];
};
