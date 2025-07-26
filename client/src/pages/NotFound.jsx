import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

const NotFound = () => (
	<Box
		component={motion.div}
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.4, ease: 'easeInOut' }}
		sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			minHeight: '100vh',
			textAlign: 'center',
			p: 3,
		}}>
		<Typography variant="h4" fontWeight={600} color="text.primary" gutterBottom>
			Страница не найдена
		</Typography>
		<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
			Кажется, вы забрели не туда. Вернитесь на главную страницу.
		</Typography>
		<Button
			variant="contained"
			color="primary"
			component={Link}
			to="/"
			sx={{ borderRadius: 2, textTransform: 'none' }}>
			На главную
		</Button>
	</Box>
);

export default NotFound;
