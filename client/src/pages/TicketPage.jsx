// src/pages/TicketPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';
import { useTicket } from '../components/features/tickets/hooks/useTicket';
import TicketDetails from '../components/features/tickets/components/TicketDetails';
import TicketChat from '../components/features/tickets/components/TicketChat';

const TicketPage = () => {
	const { id } = useParams();
	const { ticketDetails, messages, userId, isLoading, isAdding, sendMessage } =
		useTicket(id);

	if (isLoading) return <div>Загрузка...</div>;

	return (
		<Card title={`Заявка: ${ticketDetails?.title}`}>
			<TicketDetails ticket={ticketDetails} />
			<TicketChat
				messages={messages}
				onSendMessage={sendMessage}
				userId={userId}
				isLoading={isAdding}
			/>
		</Card>
	);
};

export default TicketPage;
