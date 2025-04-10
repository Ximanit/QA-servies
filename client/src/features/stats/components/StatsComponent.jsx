// client/src/components/features/stats/StatsComponent.jsx
import React, { useState } from 'react';
import { Card, Select, DatePicker } from 'antd';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { useGetTicketStatsQuery } from '../../tickets/ticketsApi';
import moment from 'moment';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const { RangePicker } = DatePicker;
const { Option } = Select;

const StatsComponent = () => {
	const [period, setPeriod] = useState('day');
	const [customRange, setCustomRange] = useState(null);

	const { data: stats = { createdStats: [], assignedStats: [] }, isLoading } =
		useGetTicketStatsQuery({
			period: period === 'custom' && customRange ? 'custom' : period,
			...(period === 'custom' &&
				customRange && {
					startDate: customRange[0].toISOString(),
					endDate: customRange[1].toISOString(),
				}),
		});

	const handlePeriodChange = (value) => {
		setPeriod(value);
		if (value !== 'custom') setCustomRange(null);
	};

	const handleRangeChange = (dates) => {
		setCustomRange(dates);
	};

	const labels = stats.createdStats.map((item) => item.date || item._id) || [];
	const createdData = stats.createdStats.map((item) => item.count) || [];
	const completedData = stats.assignedStats.map((item) => item.count) || [];

	const chartData = {
		labels,
		datasets: [
			{
				label: 'Сформировано заявок',
				data: createdData,
				backgroundColor: 'rgba(75, 192, 192, 0.6)',
			},
			{
				label: 'Решено заявок',
				data: completedData,
				backgroundColor: 'rgba(153, 102, 255, 0.6)',
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: { position: 'top' },
			title: { display: true, text: 'Статистика заявок' },
		},
		scales: { y: { beginAtZero: true } },
	};

	return (
		<Card
			title="Статистика заявок"
			style={{ maxWidth: 800, margin: '20px auto' }}>
			<div style={{ marginBottom: 20 }}>
				<Select
					value={period}
					onChange={handlePeriodChange}
					style={{ width: 200, marginRight: 10 }}>
					<Option value="day">День</Option>
					<Option value="week">Неделя</Option>
					<Option value="month">Месяц</Option>
					<Option value="year">Год</Option>
					<Option value="custom">Выбранный период</Option>
				</Select>
				{period === 'custom' && (
					<RangePicker
						onChange={handleRangeChange}
						format="YYYY-MM-DD"
						style={{ marginTop: 10 }}
					/>
				)}
			</div>
			{isLoading ? (
				<p>Загрузка...</p>
			) : (
				<Bar data={chartData} options={options} />
			)}
		</Card>
	);
};

export default StatsComponent;
