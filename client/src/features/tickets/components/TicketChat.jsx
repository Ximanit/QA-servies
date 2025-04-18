import React from 'react';
import {
	Box,
	Card,
	Typography,
	List,
	ListItem,
	TextField,
	Button,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const TicketChat = ({
	messages,
	onSendMessage,
	userId,
	isLoading,
	isClosed,
}) => {
	const { control, handleSubmit, reset } = useForm();

	const onSubmit = (values) => {
		onSendMessage({ content: values.content });
		reset();
	};

	return (
		<Card sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}>
			<Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
				Обсуждение заявки
			</Typography>
			<List
				sx={{
					maxHeight: 400,
					overflowY: 'auto',
					bgcolor: 'grey.50',
					borderRadius: 1,
					p: 2,
				}}>
				{messages.map((msg) => (
					<ListItem
						key={msg._id}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: msg.author._id === userId ? 'flex-end' : 'flex-start',
							p: 0.5,
							bgcolor: 'transparent',
						}}>
						<Box
							sx={{
								display: 'inline-block',
								bgcolor: msg.author._id === userId ? '#e6f7ff' : '#f5f5f5',
								borderRadius: 2,
								p: 1,
								maxWidth: '70%', // Ограничиваем ширину для длинных сообщений
							}}>
							<Typography variant="body1" color="text.primary">
								{msg.content}
							</Typography>
						</Box>
						<Typography
							variant="caption"
							color="text.secondary"
							sx={{
								mt: 0.5,
								textAlign: msg.author._id === userId ? 'right' : 'left',
							}}>
							<strong>{msg.author.username}</strong> ·{' '}
							{new Date(msg.createdAt).toLocaleTimeString()}
						</Typography>
					</ListItem>
				))}
			</List>
			{!isClosed ? (
				<Box
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
					<Controller
						name="content"
						control={control}
						defaultValue=""
						rules={{ required: 'Введите сообщение!' }}
						render={({ field, fieldState: { error } }) => (
							<TextField
								{...field}
								placeholder="Введите сообщение..."
								multiline
								rows={4}
								variant="outlined"
								fullWidth
								error={!!error}
								helperText={error?.message}
								sx={{
									'& .MuiOutlinedInput-root': {
										borderRadius: 2,
										bgcolor: 'background.paper',
									},
								}}
							/>
						)}
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
