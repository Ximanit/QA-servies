export const filterTickets = (
	tickets,
	userId,
	isCreatedTab,
	search,
	statusFilter,
	priorityFilter
) => {
	return tickets.filter((ticket) => {
		// Tab filter: Created (author) vs Received (assigned)
		const matchesTab = isCreatedTab
			? ticket.author?._id === userId
			: ticket.assignedTo?._id === userId;

		// Search filter: Match title
		const matchesSearch = ticket.title
			.toLowerCase()
			.includes(search.toLowerCase());

		// Status filter
		const matchesStatus =
			statusFilter === 'Все статусы' || ticket.status === statusFilter;

		// Priority filter
		const matchesPriority =
			priorityFilter === 'Все приоритеты' || ticket.priority === priorityFilter;

		return matchesTab && matchesSearch && matchesStatus && matchesPriority;
	});
};

export const getStatusStyles = (status) => {
	switch (status) {
		case 'Открыта':
			return { bgcolor: '#23B479', color: 'white' }; // Purple
		case 'В работе':
			return { bgcolor: '#B9DFF7', color: 'black' }; // Yellow
		case 'Закрыта':
			return { bgcolor: '#3B3B3B', color: 'white' }; // Green
		default:
			return { bgcolor: 'grey.500', color: 'white' };
	}
};

export const getPriorityStyles = (status) => {
	switch (status) {
		case 'Низкий':
			return { bgcolor: '#94C11F', color: 'white' };
		case 'Средний':
			return { bgcolor: '#F6E05E', color: 'black' };
		case 'Высокий':
			return { bgcolor: '#E41616', color: 'white' };
		default:
			return { bgcolor: 'grey.500', color: 'white' };
	}
};
