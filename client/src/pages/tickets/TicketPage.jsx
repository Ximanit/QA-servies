import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	Box,
	Card,
	CardHeader,
	CardContent,
	CircularProgress,
	Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
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
					minHeight: '100vh',
				}}>
				<CircularProgress />
				<Typography sx={{ ml: 2 }}>Загрузка заявки...</Typography>
			</Box>
		);
	}

	if (!ticketDetails) {
		return (
			<Card sx={{ maxWidth: 800, mx: 'auto', mt: 3, boxShadow: 3 }}>
				<CardHeader title="Ошибка" />
				<CardContent>
					<Typography color="error">
						Заявка не найдена или произошла ошибка при загрузке.
					</Typography>
				</CardContent>
			</Card>
		);
	}

	return (
		<Box
			component={motion.div}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: 'easeInOut' }}
			sx={{ maxWidth: 800, mx: 'auto', mt: 3 }}>
			<Card sx={{ boxShadow: 3 }}>
				<CardHeader
					title={`Заявка: ${ticketDetails.title}`}
					titleTypographyProps={{ fontWeight: 600 }}
				/>
				<CardContent>
					<TicketDetails ticket={ticketDetails} />
					<TicketActions
						ticket={ticketDetails}
						onAssign={assignTicket}
						onAccept={acceptTicket}
						onComplete={completeTicket}
					/>
					{ticketDetails.status !== 'Открыта' && (
						<TicketChat
							messages={messages}
							onSendMessage={sendMessage}
							userId={userId}
							isLoading={isAdding}
							isClosed={ticketDetails.status === 'Закрыта'}
						/>
					)}
				</CardContent>
			</Card>
		</Box>
	);
};

export default TicketPage;
