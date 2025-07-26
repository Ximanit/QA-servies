// src/components/features/stats/StatsComponent.jsx
import React, { useState, useMemo } from 'react';
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
	Skeleton,
	Grid,
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

	// Вычисление статистики для созданных и направленных заявок
	const createdStats = useMemo(
		() => calculateStats(stats.createdStats),
		[stats.createdStats]
	);
	const assignedStats = useMemo(
		() => calculateStats(stats.assignedStats),
		[stats.assignedStats]
	);
	const statusDataCreated = useMemo(
		() => getStatusData(stats.createdStats),
		[stats.createdStats]
	);
	const statusDataAssigned = useMemo(
		() => getStatusData(stats.assignedStats),
		[stats.assignedStats]
	);
	const priorityDataCreated = useMemo(
		() => getPriorityData(stats.createdStats),
		[stats.createdStats]
	);
	const priorityDataAssigned = useMemo(
		() => getPriorityData(stats.assignedStats),
		[stats.assignedStats]
	);

	if (isLoading) {
		return (
			<Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
				{/* Заголовок и селект периода */}
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
							minHeight: 64,
						}}>
						<Skeleton
							variant="rectangular"
							width={200}
							height={30}
							sx={{ borderRadius: '4px' }}
						/>
						<Skeleton
							variant="rectangular"
							width={200}
							height={40}
							sx={{ borderRadius: '8px' }}
						/>
					</CardContent>
				</Card>
				{/* Вкладки */}
				<Box sx={{ mb: 3, display: 'flex' }}>
					<Skeleton
						variant="rectangular"
						width={150}
						height={36}
						sx={{ borderRadius: '4px', mr: 2 }}
					/>
					<Skeleton
						variant="rectangular"
						width={150}
						height={36}
						sx={{ borderRadius: '4px' }}
					/>
				</Box>
				{/* Карточка со статистикой и графиками */}
				<Card sx={{ p: 2 }}>
					<CardContent
						sx={{
							minHeight: 400,
							display: 'flex',
							flexDirection: 'column',
							gap: 3,
						}}>
						{/* Сводная статистика */}
						<Grid container spacing={2} sx={{ mb: 3 }}>
							{[...Array(3)].map((_, index) => (
								<Grid
									size={{ xs: 12, sm: 4 }}
									key={index}
									sx={{ display: 'flex', justifyContent: 'left' }}>
									<Skeleton
										variant="rectangular"
										height={40}
										width={200}
										sx={{ borderRadius: '8px' }}
									/>
								</Grid>
							))}
						</Grid>
						{/* Графики */}
						<Grid container spacing={3}>
							{[...Array(2)].map((_, index) => (
								<Grid size={{ xs: 12, md: 6 }} key={index}>
									<Skeleton
										variant="rectangular"
										height={300}
										width="100%"
										sx={{ borderRadius: '8px' }}
									/>
								</Grid>
							))}
						</Grid>
					</CardContent>
				</Card>
			</Box>
		);
	}

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
		<Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
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
