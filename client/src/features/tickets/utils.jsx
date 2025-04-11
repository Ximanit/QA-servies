import { Link } from 'react-router-dom';
import { Badge, Box } from '@mui/material';
import { Inbox } from '@mui/icons-material';

export const formatMenuItems = (
	tickets = [],
	userId,
	newMessages = {},
	notifications = []
) => {
	const sortByDate = (ticketList) =>
		ticketList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

	const getChildren = (ticketList) => {
		return ticketList.length > 0
			? ticketList.map((t) => ({
					key: t._id,
					label: (
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<Link
								to={`/tickets/${t._id}`}
								style={{ textDecoration: 'none', color: 'inherit' }}>
								{t.title}
							</Link>
							{newMessages[t._id] > 0 && (
								<Badge
									badgeContent={newMessages[t._id]}
									color="error"
									sx={{ ml: 0.5 }} // Аналог marginLeft: 5
								/>
							)}
						</Box>
					),
			  }))
			: [
					{
						key: 'empty',
						label: (
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Inbox sx={{ mr: 1 }} /> Нет заявок
							</Box>
						),
						disabled: true,
					},
			  ];
	};

	const assignedTickets = tickets.filter((t) => t.assignedTo?._id === userId);

	const openTickets = sortByDate(
		assignedTickets.filter((t) => t.status === 'Открыта')
	);
	const inProgressTickets = sortByDate(
		assignedTickets.filter((t) => t.status === 'В работе')
	);
	const closedTickets = sortByDate(
		assignedTickets.filter((t) => t.status === 'Закрыта')
	);
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
