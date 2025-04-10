// src/components/features/stats/StatsCharts.jsx
import React from 'react';
import { Grid, Typography } from '@mui/material';
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
} from 'recharts';

const COLORS = ['#1890FF', '#9254DE', '#52C41A', '#595959'];

const StatsCharts = ({ statusData, priorityData }) => (
	<Grid container spacing={3}>
		<Grid item xs={12} md={6}>
			<Typography
				variant="h6"
				align="center"
				sx={{ mb: 2, fontWeight: 'bold' }}>
				Статус заявок
			</Typography>
			<PieChart width={400} height={300}>
				<Pie
					data={statusData}
					cx="50%"
					cy="50%"
					outerRadius={80}
					fill="#8884d8"
					dataKey="value"
					label={({ name, percent }) =>
						`${name}: ${(percent * 100).toFixed(0)}%`
					}>
					{statusData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
		</Grid>
		<Grid item xs={12} md={6}>
			<Typography
				variant="h6"
				align="center"
				sx={{ mb: 2, fontWeight: 'bold' }}>
				Заявки по приоритету
			</Typography>
			<BarChart width={400} height={300} data={priorityData}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Bar dataKey="value" fill="#9254DE" />
			</BarChart>
		</Grid>
	</Grid>
);

export default StatsCharts;
