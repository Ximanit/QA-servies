import React from 'react';
import { Grid, Typography } from '@mui/material';
import {
	Chart as ChartJS,
	ArcElement,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { COLORS } from '../../../constants/constants';

// Регистрация компонентов Chart.js
ChartJS.register(
	ArcElement,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend
);

const StatsCharts = ({ statusData, priorityData }) => {
	// Данные для круговой диаграммы (статус заявок)
	const pieData = {
		labels: statusData.map((item) => item.name),
		datasets: [
			{
				data: statusData.map((item) => item.value),
				backgroundColor: COLORS,
				borderColor: COLORS,
				borderWidth: 1,
			},
		],
	};

	// Опции для круговой диаграммы
	const pieOptions = {
		plugins: {
			legend: {
				position: 'bottom',
			},
			tooltip: {
				callbacks: {
					label: (context) => {
						const label = context.label || '';
						const value = context.parsed || 0;
						const total = context.dataset.data.reduce(
							(sum, val) => sum + val,
							0
						);
						const percentage = ((value / total) * 100).toFixed(0);
						return `${label}: ${value} (${percentage}%)`;
					},
				},
			},
		},
		maintainAspectRatio: false,
	};

	// Данные для гистограммы (приоритеты заявок)
	const barData = {
		labels: priorityData.map((item) => item.name),
		datasets: [
			{
				label: 'Количество заявок',
				data: priorityData.map((item) => item.value),
				backgroundColor: COLORS[0],
				borderColor: COLORS[0],
				borderWidth: 1,
			},
		],
	};

	// Опции для гистограммы
	const barOptions = {
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					precision: 0,
				},
			},
		},
		maintainAspectRatio: false,
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6}>
				<Typography
					variant="h6"
					align="center"
					sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
					Статус заявок
				</Typography>
				<div style={{ height: '300px' }}>
					<Pie data={pieData} options={pieOptions} />
				</div>
			</Grid>
			<Grid item xs={12} md={6}>
				<Typography
					variant="h6"
					align="center"
					sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
					Приоритет заявок
				</Typography>
				<div style={{ height: '300px' }}>
					<Bar data={barData} options={barOptions} />
				</div>
			</Grid>
		</Grid>
	);
};

export default React.memo(StatsCharts);
