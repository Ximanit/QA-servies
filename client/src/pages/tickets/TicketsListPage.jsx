// src/pages/TicketsListPage.jsx
import { Card, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetTicketsQuery } from '../../components/features/tickets/ticketsApi';

const TicketsListPage = () => {
	const navigate = useNavigate();
	const { data: tickets, isLoading: ticketsLoading } = useGetTicketsQuery();

	const handleCardClick = (ticketId) => {
		navigate(`/tickets/${ticketId}`);
	};

	if (ticketsLoading) return <div>Загрузка...</div>;

	return (
		<div style={{ padding: '20px' }}>
			<h2>Заявки в работе</h2>
			<List
				grid={{ gutter: 16, column: 3 }}
				dataSource={tickets?.filter((ticket) => ticket.status !== 'Closed')}
				renderItem={(ticket) => (
					<List.Item>
						<Card
							title={ticket.title}
							extra={<span>{ticket.status}</span>}
							hoverable // Добавляет эффект при наведении
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
