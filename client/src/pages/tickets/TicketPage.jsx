// src/pages/tickets/TicketPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';
import { useTicket } from '../../components/features/tickets/hooks/useTicket';
import TicketDetails from '../../components/features/tickets/components/TicketDetails';
import TicketChat from '../../components/features/tickets/components/TicketChat';
import TicketActions from '../../components/features/tickets/components/TicketActions';

const TicketPage = () => {
	const { id } = useParams();
	const {
		ticketDetails,
		messages,
		userId,
		isLoading,
		isAdding,
		sendMessage,
		assignTicket, // Добавляем из хука
		completeTicket, // Добавляем из хука
	} = useTicket(id);

	if (isLoading) return <div>Загрузка...</div>;

	return (
		<Card title={`Заявка: ${ticketDetails?.title}`}>
			<TicketDetails ticket={ticketDetails} />
			<TicketActions
				ticket={ticketDetails}
				onAssign={assignTicket}
				onComplete={completeTicket}
			/>
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
