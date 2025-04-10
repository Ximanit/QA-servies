// src/components/features/stats/StatsComponent.jsx
import React, { useState } from 'react';
import {
	Card,
	CardContent,
	Box,
	Typography,
	Tabs,
	Tab,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import { useGetTicketStatsQuery } from '../../tickets/ticketsApi';
import {
	calculateStats,
	getStatusData,
	getPriorityData,
} from '../utils/statsUtils';
import StatsSummary from '../components/StatsSummary';
import StatsCharts from '../components/StatsCharts';

// Основной компонент для отображения статистики
const StatsComponent = ({ userId }) => {
	// Состояние для периода и активной вкладки
	const [period, setPeriod] = useState('month');
	const [activeTab, setActiveTab] = useState('created');

	// Получение данных статистики
	const { data: stats = { createdStats: [], assignedStats: [] }, isLoading } =
		useGetTicketStatsQuery({ userId, period });

	if (isLoading) {
		return (
			<Box sx={{ textAlign: 'center', padding: 2 }}>
				<Typography>Загрузка...</Typography>
			</Box>
		);
	}

	// Вычисление статистики для созданных и направленных заявок
	const createdStats = calculateStats(stats.createdStats);
	const assignedStats = calculateStats(stats.assignedStats);

	// Подготовка данных для диаграмм
	const statusDataCreated = getStatusData(stats.createdStats);
	const statusDataAssigned = getStatusData(stats.assignedStats);
	const priorityDataCreated = getPriorityData(stats.createdStats);
	const priorityDataAssigned = getPriorityData(stats.assignedStats);

	// Компонент для отображения содержимого вкладки
	const StatsContent = ({ type }) => {
		const isCreated = type === 'created';
		const statsData = isCreated ? createdStats : assignedStats;
		const statusData = isCreated ? statusDataCreated : statusDataAssigned;
		const priorityData = isCreated ? priorityDataCreated : priorityDataAssigned;

		if (statsData.total === 0) {
			return (
				<Box sx={{ textAlign: 'center', mt: 5 }}>
					<Typography variant="body1">
						Нет {isCreated ? 'созданных' : 'направленных'} заявок за выбранный
						период
					</Typography>
				</Box>
			);
		}

		return (
			<Card
				sx={{
					p: 2,
				}}>
				<CardContent>
					<StatsSummary
						total={statsData.total}
						pending={statsData.pending}
						resolved={statsData.resolved}
					/>
					<StatsCharts statusData={statusData} priorityData={priorityData} />
				</CardContent>
			</Card>
		);
	};

	return (
		<Box sx={{ maxWidth: 1200, mx: 'auto', p: 3, backgroundColor: '#f5f5f5' }}>
			{/* Заголовок и выбор периода */}
			<Card
				sx={{
					mb: 3,
					backgroundColor: '#fff',
					boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
				}}>
				<CardContent
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}>
					<Typography variant="h5" sx={{ fontWeight: 'bold' }}>
						Статистика заявок
					</Typography>
					<FormControl sx={{ minWidth: 200 }}>
						<InputLabel>Период</InputLabel>
						<Select
							value={period}
							label="Период"
							onChange={(e) => setPeriod(e.target.value)}>
							<MenuItem value="day">День</MenuItem>
							<MenuItem value="week">Неделя</MenuItem>
							<MenuItem value="month">Месяц</MenuItem>
							<MenuItem value="year">Год</MenuItem>
						</Select>
					</FormControl>
				</CardContent>
			</Card>

			{/* Вкладки для переключения между типами заявок */}
			<Tabs
				value={activeTab}
				onChange={(e, newValue) => setActiveTab(newValue)}
				sx={{
					mb: 3,
					'& .MuiTab-root': {
						fontWeight: 'bold',
						textTransform: 'none',
					},
				}}>
				<Tab label="Созданные заявки" value="created" />
				<Tab label="Направленные заявки" value="assigned" />
			</Tabs>

			{/* Отображение содержимого в зависимости от активной вкладки */}
			{activeTab === 'created' && <StatsContent type="created" />}
			{activeTab === 'assigned' && <StatsContent type="assigned" />}
		</Box>
	);
};

export default StatsComponent;
