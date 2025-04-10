// src/pages/tickets/TicketPage.jsx
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card } from 'antd';
import { useTicketDetails } from '../../features/tickets/hooks/useTicketDetails';
import { useTicketMessages } from '../../features/tickets/hooks/useTicketMessages';
import { useTicketStatus } from '../../features/tickets/hooks/useTicketStatus';
import { useTicketAssignment } from '../../features/tickets/hooks/useTicketAssignment';
import { useTicketAcceptance } from '../../features/tickets/hooks/useTicketAcceptance';
import { useTicketNotifications } from '../../features/tickets/hooks/useTicketNotifications';
import TicketDetails from '../../features/tickets/components/TicketDetails';
import TicketChat from '../../features/tickets/components/TicketChat';
import TicketActions from '../../features/tickets/components/TicketActions';

const TicketPage = () => {
	const { id } = useParams();
	const userId = useSelector((state) => state.auth.id);

	const { ticketDetails, isLoading: detailsLoading } = useTicketDetails(id);
	const {
		messages,
		isLoading: messagesLoading,
		isAdding,
		sendMessage,
	} = useTicketMessages(id, userId);
	const { completeTicket } = useTicketStatus(id);
	const { assignTicket } = useTicketAssignment(id);
	const { acceptTicket } = useTicketAcceptance(id);

	useTicketNotifications(id, messages);

	if (detailsLoading || messagesLoading) return <div>Загрузка...</div>;

	return (
		<Card title={`Заявка: ${ticketDetails?.title}`}>
			<TicketDetails ticket={ticketDetails} />
			<TicketActions
				ticket={ticketDetails}
				onAssign={assignTicket}
				onAccept={acceptTicket}
				onComplete={completeTicket}
			/>
			{ticketDetails?.status !== 'Открыта' && (
				<TicketChat
					messages={messages}
					onSendMessage={sendMessage}
					userId={userId}
					isLoading={isAdding}
					isClosed={ticketDetails?.status === 'Закрыта'} // Передаем флаг закрытия
				/>
			)}
		</Card>
	);
};

export default TicketPage;
