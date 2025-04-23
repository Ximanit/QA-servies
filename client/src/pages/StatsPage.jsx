import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const StatsComponent = lazy(() =>
	import('../features/stats/components/StatsComponent')
);

const StatsPage = () => {
	const userId = useSelector((state) => state.auth.id);

	return (
		<Box
			component={motion.div}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: 'easeInOut' }}
			sx={{ maxWidth: 1200, mx: 'auto' }}>
			<StatsComponent userId={userId} />
		</Box>
	);
};

export default StatsPage;
