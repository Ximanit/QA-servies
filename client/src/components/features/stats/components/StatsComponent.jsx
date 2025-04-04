// client/src/components/features/stats/StatsComponent.jsx
import React, { useState } from 'react';
import { Card, Select, DatePicker, Button, Statistic } from 'antd';
import { useGetTicketStatsQuery } from '../../tickets/ticketsApi';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

const StatsComponent = () => {
	const [period, setPeriod] = useState('day');
	const [customRange, setCustomRange] = useState(null);

	const { data: stats, isLoading } = useGetTicketStatsQuery({
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

	return (
		<Card
			title="Статистика заявок"
			style={{ maxWidth: 600, margin: '20px auto' }}>
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
				<div style={{ display: 'flex', justifyContent: 'space-around' }}>
					<Statistic
						title="Сформировано заявок"
						value={stats?.createdTickets || 0}
					/>
					<Statistic
						title="Решено заявок"
						value={stats?.completedTickets || 0}
					/>
				</div>
			)}
		</Card>
	);
};

export default StatsComponent;
