import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

import { API_URL } from '../../../constants/constants';

const TicketDetails = ({ ticket }) => (
	<Box>
		<Typography variant="body1" sx={{ mb: 1 }}>
			<strong>Описание:</strong> {ticket?.description}
		</Typography>
		<Typography variant="body1" sx={{ mb: 1 }}>
			<strong>Категория:</strong> {ticket?.category}
		</Typography>
		<Typography variant="body1" sx={{ mb: 1 }}>
			<strong>Статус:</strong> {ticket?.status}
		</Typography>
		<Typography variant="body1" sx={{ mb: 1 }}>
			<strong>Автор:</strong> {ticket?.author?.username}
		</Typography>
		<Typography variant="body1" sx={{ mb: 1 }}>
			<strong>Дата создания:</strong>{' '}
			{new Date(ticket?.createdAt).toLocaleString()}
		</Typography>
		{ticket?.files?.length > 0 && (
			<Box>
				<Typography variant="body1" sx={{ mb: 1 }}>
					<strong>Файлы:</strong>
				</Typography>
				<List dense>
					{ticket.files.map((file) => (
						<ListItem key={file.filename}>
							<ListItemText
								primary={
									<a
										href={`${API_URL}/uploads/${file.filename}`}
										target="_blank"
										rel="noopener noreferrer"
										style={{ color: '#1976d2' }}>
										{file.filename}
									</a>
								}
							/>
						</ListItem>
					))}
				</List>
			</Box>
		)}
	</Box>
);

export default TicketDetails;
