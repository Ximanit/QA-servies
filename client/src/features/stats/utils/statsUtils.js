export const calculateStats = (statsArray) => {
	const total = statsArray.reduce((sum, stat) => sum + stat.count, 0);
	const pending = statsArray.find((s) => s._id === 'Открыта')?.count || 0;
	const resolved = statsArray.find((s) => s._id === 'Закрыта')?.count || 0;

	return { total, pending, resolved };
};

export const getStatusData = (statsArray) =>
	statsArray
		.map((stat) => ({
			name:
				stat._id === 'Открыта'
					? 'Новые'
					: stat._id === 'В работе'
					? 'В работе'
					: 'Решённые',
			value: stat.count,
		}))
		.filter((item) => item.value > 0);

export const getPriorityData = (statsArray) => {
	const priorities = { Низкий: 0, Средний: 0, Высокий: 0, Срочный: 0 };
	statsArray.forEach((stat) => {
		stat.tickets.forEach((ticket) => {
			priorities[ticket.priority] = (priorities[ticket.priority] || 0) + 1;
		});
	});
	return Object.entries(priorities)
		.map(([name, value]) => ({ name, value }))
		.filter((item) => item.value > 0);
};
