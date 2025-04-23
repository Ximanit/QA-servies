import React from 'react';
import { Box, Typography, ListItem } from '@mui/material';

const ChatMessage = ({ msg, userId }) => {
	return (
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
					maxWidth: '70%',
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
	);
};

export default React.memo(ChatMessage);
