import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	Card,
	CardHeader,
	CardContent,
	Box,
	CircularProgress,
	Typography,
} from '@mui/material';
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

	if (detailsLoading || messagesLoading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}>
				<CircularProgress />
				<Typography sx={{ ml: 2 }}>Загрузка...</Typography>
			</Box>
		);
	}

	return (
		<Card sx={{ maxWidth: 800, mx: 'auto', mt: 3 }}>
			<CardHeader title={`Заявка: ${ticketDetails?.title}`} />
			<CardContent>
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
						isClosed={ticketDetails?.status === 'Закрыта'}
					/>
				)}
			</CardContent>
		</Card>
	);
};

export default TicketPage;
