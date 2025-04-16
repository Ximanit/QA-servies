import React, { useState } from 'react';
import {
	Box,
	Typography,
	List,
	ListItem,
	ListItemText,
	TextField,
	Button,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import FileUploader from '../../../components/Common/FileUploader';
import { API_URL } from '../../../constants/constants';

const TicketChat = ({
	messages,
	onSendMessage,
	userId,
	isLoading,
	isClosed,
}) => {
	const { control, handleSubmit, reset } = useForm();
	const [files, setFiles] = useState([]);

	const onSubmit = (values) => {
		onSendMessage({ content: values.content, files });
		reset();
		setFiles([]);
	};

	return (
		<Box sx={{ mt: 3 }}>
			<Typography
				variant="h6"
				gutterBottom
				sx={{ fontWeight: 600, color: 'text.primary' }}>
				Чат
			</Typography>
			<List sx={{ maxHeight: 400, overflowY: 'auto', bgcolor: 'grey.50' }}>
				{messages.map((msg) => (
					<ListItem
						key={msg._id}
						sx={{
							bgcolor: msg.author._id === userId ? '#e6f7ff' : '#f5f5f5',
							m: 0.5,
							p: 1.5,
							borderRadius: 2,
						}}>
						<ListItemText
							primary={
								<Typography variant="body1" color="text.primary">
									<strong>{msg.author.username}:</strong> {msg.content}
								</Typography>
							}
							secondary={
								<>
									{msg.files?.length > 0 && (
										<Box sx={{ mt: 1 }}>
											{msg.files.map((file) => (
												<a
													key={file.filename}
													href={`${API_URL}/Uploads/${file.filename}`}
													target="_blank"
													rel="noopener noreferrer"
													style={{ display: 'block', color: 'primary.main' }}>
													{file.filename}
												</a>
											))}
										</Box>
									)}
									<Typography variant="caption" color="text.secondary">
										{new Date(msg.createdAt).toLocaleTimeString()}
									</Typography>
								</>
							}
						/>
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
								label="Сообщение"
								multiline
								rows={4}
								placeholder="Введите сообщение"
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
					<FileUploader onFilesChange={setFiles} />
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
		</Box>
	);
};

export default TicketChat;
