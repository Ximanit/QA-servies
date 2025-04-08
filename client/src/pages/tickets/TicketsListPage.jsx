// src/pages/tickets/TicketsListPage.jsx
import { Card, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUserTicketsQuery } from '../../components/features/tickets/ticketsApi';

const TicketsListPage = () => {
	const navigate = useNavigate();
	const userId = useSelector((state) => state.auth.id);
	const { data: tickets = [], isLoading: ticketsLoading } =
		useGetUserTicketsQuery(userId);

	const handleCardClick = (ticketId) => {
		navigate(`/tickets/${ticketId}`);
	};

	if (ticketsLoading) return <div>Загрузка...</div>;

	const inProgressTickets = tickets.filter(
		(ticket) =>
			ticket.status === 'В работе' && ticket.assignedTo?._id === userId
	);

	return (
		<div style={{ padding: '20px' }}>
			<h2>Заявки в работе</h2>
			<List
				grid={{ gutter: 16, column: 3 }}
				dataSource={inProgressTickets}
				renderItem={(ticket) => (
					<List.Item>
						<Card
							title={ticket.title}
							extra={<span>{ticket.status}</span>}
							hoverable
							onClick={() => handleCardClick(ticket._id)}>
							<p>
								<strong>Автор:</strong> {ticket.author?.username}
							</p>
							<p>
								<strong>Исполнитель:</strong> {ticket.assignedTo?.username}
							</p>
							<p>
								<strong>Дата создания:</strong>{' '}
								{new Date(ticket.createdAt).toLocaleDateString()}
							</p>
						</Card>
					</List.Item>
				)}
			/>
		</div>
	);
};

export default TicketsListPage;
