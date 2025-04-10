// src/pages/StatsPage.jsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row, Select, Statistic, Tabs, Empty } from 'antd';
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
import { useGetTicketStatsQuery } from '../features/tickets/ticketsApi';

const COLORS = ['#9254DE', '#1890FF', '#52C41A', '#595959'];

const StatsPage = () => {
	const userId = useSelector((state) => state.auth.id);
	const [period, setPeriod] = useState('month');

	const { data: stats = { createdStats: [], assignedStats: [] }, isLoading } =
		useGetTicketStatsQuery({ userId, period });

	if (isLoading)
		return (
			<div style={{ textAlign: 'center', padding: '20px' }}>Загрузка...</div>
		);

	// Подсчет статистики из агрегированных данных
	const totalCreated = stats.createdStats.reduce(
		(sum, stat) => sum + stat.count,
		0
	);
	const pendingCreated =
		stats.createdStats.find((s) => s._id === 'Открыта')?.count || 0;
	const resolvedCreated =
		stats.createdStats.find((s) => s._id === 'Закрыта')?.count || 0;

	const totalAssigned = stats.assignedStats.reduce(
		(sum, stat) => sum + stat.count,
		0
	);
	const pendingAssigned =
		stats.assignedStats.find((s) => s._id === 'Открыта')?.count || 0;
	const resolvedAssigned =
		stats.assignedStats.find((s) => s._id === 'Закрыта')?.count || 0;

	const statusDataCreated = stats.createdStats
		.map((stat) => ({
			name:
				stat._id === 'Открыта'
					? 'Новые'
					: stat._id === 'В работе'
					? 'В работе'
					: 'Решённые',
			value: stat.count,
		}))
		.filter((item) => item.value > 0);

	const statusDataAssigned = stats.assignedStats
		.map((stat) => ({
			name:
				stat._id === 'Открыта'
					? 'Новые'
					: stat._id === 'В работе'
					? 'В работе'
					: 'Решённые',
			value: stat.count,
		}))
		.filter((item) => item.value > 0);

	const getPriorityData = (statsArray) => {
		const priorities = { Низкий: 0, Средний: 0, Высокий: 0, Срочный: 0 };
		statsArray.forEach((stat) => {
			stat.tickets.forEach((ticket) => {
				priorities[ticket.priority] = (priorities[ticket.priority] || 0) + 1;
			});
		});
		return Object.entries(priorities)
			.map(([name, value]) => ({ name, value }))
			.filter((item) => item.value > 0);
	};

	const priorityDataCreated = getPriorityData(stats.createdStats);
	const priorityDataAssigned = getPriorityData(stats.assignedStats);

	const StatsContent = ({ type }) => {
		const isCreated = type === 'created';
		const total = isCreated ? totalCreated : totalAssigned;
		const pending = isCreated ? pendingCreated : pendingAssigned;
		const resolved = isCreated ? resolvedCreated : resolvedAssigned;
		const statusData = isCreated ? statusDataCreated : statusDataAssigned;
		const priorityData = isCreated ? priorityDataCreated : priorityDataAssigned;

		if (total === 0) {
			return (
				<Empty
					description={`Нет ${
						isCreated ? 'созданных' : 'направленных'
					} заявок за выбранный период`}
					style={{ marginTop: 50 }}
				/>
			);
		}

		return (
			<Card style={{ padding: '20px' }}>
				<Row gutter={16} style={{ marginBottom: 20 }}>
					<Col span={8}>
						<Card>
							<Statistic title="Всего заявок" value={total} />
						</Card>
					</Col>
					<Col span={8}>
						<Card>
							<Statistic title="В ожидании" value={pending} />
						</Card>
					</Col>
					<Col span={8}>
						<Card>
							<Statistic title="Решено" value={resolved} />
						</Card>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<h4>Статус заявок</h4>
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
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</Col>
					<Col span={12}>
						<h4>Заявки по приоритету</h4>
						<BarChart width={400} height={300} data={priorityData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="value" fill="#9254DE" />
						</BarChart>
					</Col>
				</Row>
			</Card>
		);
	};

	return (
		<div style={{ padding: '20px', maxWidth: 1200, margin: '0 auto' }}>
			<Card title="Статистика заявок" style={{ marginBottom: 20 }}>
				<Select
					defaultValue="month"
					style={{ width: 200 }}
					onChange={(value) => setPeriod(value)}>
					<Select.Option value="day">День</Select.Option>
					<Select.Option value="week">Неделя</Select.Option>
					<Select.Option value="month">Месяц</Select.Option>
					<Select.Option value="year">Год</Select.Option>
				</Select>
			</Card>
			<Tabs defaultActiveKey="created">
				<Tabs.TabPane tab="Созданные заявки" key="created">
					<StatsContent type="created" />
				</Tabs.TabPane>
				<Tabs.TabPane tab="Направленные заявки" key="assigned">
					<StatsContent type="assigned" />
				</Tabs.TabPane>
			</Tabs>
		</div>
	);
};

export default StatsPage;
