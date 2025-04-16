import React from 'react';
import { Card, Grid, Typography } from '@mui/material';

const StatsSummary = ({ total, pending, resolved }) => (
	<>
		<Grid container spacing={2} sx={{ mb: 3 }}>
			<Grid item xs={12} sm={4}>
				<Card sx={{ p: 2, textAlign: 'center', bgcolor: 'background.paper' }}>
					<Typography variant="subtitle2" color="text.secondary">
						Всего заявок
					</Typography>
					<Typography variant="h5" color="text.primary">
						{total}
					</Typography>
				</Card>
			</Grid>
			<Grid item xs={12} sm={4}>
				<Card sx={{ p: 2, textAlign: 'center', bgcolor: 'background.paper' }}>
					<Typography variant="subtitle2" color="text.secondary">
						В ожидании
					</Typography>
					<Typography variant="h5" color="error.main">
						{pending}
					</Typography>
				</Card>
			</Grid>
			<Grid item xs={12} sm={4}>
				<Card sx={{ p: 2, textAlign: 'center', bgcolor: 'background.paper' }}>
					<Typography variant="subtitle2" color="text.secondary">
						Решено
					</Typography>
					<Typography variant="h5" color="success.main">
						{resolved}
					</Typography>
				</Card>
			</Grid>
		</Grid>
	</>
);

export default StatsSummary;
