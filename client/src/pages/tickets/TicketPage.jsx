import { lazy, Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Box, Card, Typography, Skeleton, Button } from '@mui/material';

import { useTicketDetails } from '../../features/tickets/hooks/useTicketDetails';
import { useTicketMessages } from '../../features/tickets/hooks/useTicketMessages';
import { useTicketNotifications } from '../../features/tickets/hooks/useTicketNotifications';
import { useMarkNotificationsAsReadMutation } from '../../features/tickets/ticketsApi';
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
	const [markNotificationsAsRead] = useMarkNotificationsAsReadMutation();

	// Помечаем уведомления как прочитанные при открытии страницы
	useEffect(() => {
		if (ticketDetails && !detailsLoading) {
			markNotificationsAsRead(id)
				.unwrap()
				.catch((error) => {
					console.error(
						'Ошибка при пометке уведомлений как прочитанных:',
						error
					);
				});
		}
	}, [ticketDetails, detailsLoading, id, markNotificationsAsRead]);

	// Используем хук для дополнительной обработки уведомлений (если связаны с сообщениями)
	useTicketNotifications(id, messages);

	if (detailsLoading || messagesLoading) {
		return (
			<Box sx={{ maxWidth: 1200, mx: 'auto' }}>
				<Skeleton variant="text" width="60%" height={40} />
				<Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
					<Box sx={{ flex: '0 0 300px' }}>
						<Skeleton variant="rectangular" width="100%" height={400} />
					</Box>
					<Box sx={{ flex: 1 }}>
						<Skeleton variant="rectangular" width="100%" height={400} />
					</Box>
				</Box>
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
					<Suspense
						fallback={
							<Skeleton variant="rectangular" width="100%" height={400} />
						}>
						<TicketChat
							messages={messages}
							onSendMessage={sendMessage}
							userId={userId}
							isLoading={isAdding}
							isClosed={ticketDetails.status === 'Закрыта'}
						/>
					</Suspense>
				</Box>
			</Box>
		</Box>
	);
};

export default TicketPage;
