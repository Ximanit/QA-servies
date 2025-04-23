import { lazy } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Card, Typography, CircularProgress, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTicketDetails } from '../../features/tickets/hooks/useTicketDetails';
import { useTicketMessages } from '../../features/tickets/hooks/useTicketMessages';
import TicketDetailsAndActions from '../../features/tickets/components/TicketDetailsAndActions';
const TicketChat = lazy(() =>
	import('../../features/tickets/components/TicketChat')
);

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
				<Typography variant="h6" sx={{ p: 2 }}>
					Ошибка
				</Typography>
				<Typography color="error" sx={{ p: 2 }}>
					Заявка не найдена или произошла ошибка при загрузке.
				</Typography>
			</Card>
		);
	}

	return (
		<Box
			component={motion.div}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.4 }}
			sx={{ maxWidth: 1200, mx: 'auto' }}>
			<Button
				variant="text"
				onClick={() => window.history.back()}
				sx={{ mb: 2, textTransform: 'none' }}>
				&lt; Назад
			</Button>

			<Box
				sx={{
					display: 'flex',
					gap: 3,
					flexDirection: { xs: 'column', md: 'row' },
				}}>
				{/* Левая колонка: Детали и действия */}
				<Box sx={{ flex: '0 0 300px' }}>
					<TicketDetailsAndActions ticket={ticketDetails} />
				</Box>
				{/* Правая колонка: Чат */}
				<Box sx={{ flex: 1 }}>
					<TicketChat
						messages={messages}
						onSendMessage={sendMessage}
						userId={userId}
						isLoading={isAdding}
						isClosed={ticketDetails.status === 'Закрыта'}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default TicketPage;
