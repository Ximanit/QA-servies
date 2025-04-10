// src/components/features/stats/StatsSummary.jsx
import React from 'react';
import { Card, Grid, Typography } from '@mui/material';

const StatsSummary = ({ total, pending, resolved }) => (
	<Grid container spacing={2} sx={{ mb: 3 }}>
		<Grid item xs={12} sm={4}>
			<Card
				sx={{
					p: 2,
					textAlign: 'center',
					backgroundColor: '#fff',
					boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
				}}>
				<Typography variant="subtitle2" color="textSecondary">
					Всего заявок
				</Typography>
				<Typography variant="h5">{total}</Typography>
			</Card>
		</Grid>
		<Grid item xs={12} sm={4}>
			<Card
				sx={{
					p: 2,
					textAlign: 'center',
					backgroundColor: '#fff',
					boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
				}}>
				<Typography variant="subtitle2" color="textSecondary">
					В ожидании
				</Typography>
				<Typography variant="h5">{pending}</Typography>
			</Card>
		</Grid>
		<Grid item xs={12} sm={4}>
			<Card
				sx={{
					p: 2,
					textAlign: 'center',
					backgroundColor: '#fff',
					boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
				}}>
				<Typography variant="subtitle2" color="textSecondary">
					Решено
				</Typography>
				<Typography variant="h5">{resolved}</Typography>
			</Card>
		</Grid>
	</Grid>
);

export default StatsSummary;
