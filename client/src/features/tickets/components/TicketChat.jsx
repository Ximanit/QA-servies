import React, { useRef, useEffect } from 'react';
import { Box, Card, Typography, List, Button } from '@mui/material';

import ControlledTextField from '../../../components/Common/ControlledTextField';

import { useForm } from 'react-hook-form';
import ChatMessage from './ChatMessage';

const TicketChat = ({
	messages,
	onSendMessage,
	userId,
	isLoading,
	isClosed,
}) => {
	const { control, handleSubmit, reset } = useForm();
	const messagesEndRef = useRef(null); // Ref для контейнера сообщений

	// Прокрутка к последнему сообщению
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollTo({
			top: messagesEndRef.current.scrollHeight,
			behavior: 'smooth',
		});
	};

	// Прокручиваем при загрузке и изменении messages
	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const onSubmit = (values) => {
		onSendMessage({ content: values.content });
		reset();
		// Прокрутка после отправки нового сообщения (если нужно)
		setTimeout(scrollToBottom, 100); // Небольшая задержка для рендеринга нового сообщения
	};

	return (
		<Card sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}>
			<Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
				Обсуждение заявки
			</Typography>
			<List
				ref={messagesEndRef} // Привязываем ref к List
				sx={{
					maxHeight: 400,
					overflowY: 'auto',
					bgcolor: 'grey.50',
					borderRadius: 1,
					p: 2,
				}}>
				{messages.map((msg) => (
					<ChatMessage key={msg._id} msg={msg} userId={userId} />
				))}
			</List>
			{!isClosed ? (
				<Box
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
					<ControlledTextField
						name="content"
						control={control}
						rules={{ required: 'Введите сообщение!' }}
						placeholder="Введите сообщение..."
						multiline
						rows={4}
						sx={{
							'& .MuiOutlinedInput-root': {
								borderRadius: 2,
								bgcolor: 'background.paper',
							},
						}}
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={isLoading}
						sx={{ alignSelf: 'flex-start', borderRadius: 2 }}>
						{isLoading ? 'Отправка...' : 'Отправить'}
					</Button>
				</Box>
			) : (
				<Typography sx={{ mt: 2, color: 'success.main' }}>
					Заявка закрыта. Чат доступен только для просмотра.
				</Typography>
			)}
		</Card>
	);
};

export default TicketChat;
