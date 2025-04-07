// src/pages/statistics/StatisticsPage.jsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row, Select, Statistic } from 'antd';
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
import { useGetTicketStatsQuery } from '../../components/features/tickets/ticketsApi';

const COLORS = ['#9254DE', '#1890FF', '#52C41A', '#595959'];

const StatisticsPage = () => {
	const userId = useSelector((state) => state.auth.id);
	const [period, setPeriod] = useState('month'); // Период по умолчанию — месяц

	const { data: stats, isLoading } = useGetTicketStatsQuery({ userId, period });

	if (isLoading) return <div>Загрузка...</div>;

	// Разделяем заявки на созданные и направленные пользователю
	const createdTickets = stats?.createdTickets || [];
	const assignedTickets = stats?.completedTickets || []; // Используем completedTickets как направленные (можно переименовать)

	// Статистика по созданным заявкам
	const totalCreated = createdTickets.length;
	const pendingCreated = createdTickets.filter(
		(t) => t.status === 'Открыта'
	).length;
	const resolvedCreated = createdTickets.filter(
		(t) => t.status === 'Закрыта'
	).length;

	// Статистика по направленным заявкам
	const totalAssigned = assignedTickets.length;
	const pendingAssigned = assignedTickets.filter(
		(t) => t.status === 'Открыта'
	).length;
	const resolvedAssigned = assignedTickets.filter(
		(t) => t.status === 'Закрыта'
	).length;

	// Данные для круговой диаграммы (статусы заявок)
	const statusDataCreated = [
		{
			name: 'Новые',
			value: createdTickets.filter((t) => t.status === 'Открыта').length,
		},
		{
			name: 'В работе',
			value: createdTickets.filter((t) => t.status === 'В работе').length,
		},
		{
			name: 'Решённые',
			value: createdTickets.filter((t) => t.status === 'Закрыта').length,
		},
		{
			name: 'Закрытые',
			value: createdTickets.filter((t) => t.status === 'Закрыта').length,
		},
	].filter((item) => item.value > 0);

	const statusDataAssigned = [
		{
			name: 'Новые',
			value: assignedTickets.filter((t) => t.status === 'Открыта').length,
		},
		{
			name: 'В работе',
			value: assignedTickets.filter((t) => t.status === 'В работе').length,
		},
		{
			name: 'Решённые',
			value: assignedTickets.filter((t) => t.status === 'Закрыта').length,
		},
		{
			name: 'Закрытые',
			value: assignedTickets.filter((t) => t.status === 'Закрыта').length,
		},
	].filter((item) => item.value > 0);

	// Данные для гистограммы (приоритеты)
	const priorityDataCreated = [
		{
			name: 'Низкий',
			value: createdTickets.filter((t) => t.priority === 'Низкий').length,
		},
		{
			name: 'Средний',
			value: createdTickets.filter((t) => t.priority === 'Средний').length,
		},
		{
			name: 'Высокий',
			value: createdTickets.filter((t) => t.priority === 'Высокий').length,
		},
		{
			name: 'Срочный',
			value: createdTickets.filter((t) => t.priority === 'Срочный').length,
		},
	].filter((item) => item.value > 0);

	const priorityDataAssigned = [
		{
			name: 'Низкий',
			value: assignedTickets.filter((t) => t.priority === 'Низкий').length,
		},
		{
			name: 'Средний',
			value: assignedTickets.filter((t) => t.priority === 'Средний').length,
		},
		{
			name: 'Высокий',
			value: assignedTickets.filter((t) => t.priority === 'Высокий').length,
		},
		{
			name: 'Срочный',
			value: assignedTickets.filter((t) => t.priority === 'Срочный').length,
		},
	].filter((item) => item.value > 0);

	return (
		<div style={{ padding: '20px' }}>
			<h2>Статистика заявок</h2>
			<Select
				defaultValue="month"
				style={{ width: 200, marginBottom: 20 }}
				onChange={(value) => setPeriod(value)}>
				<Select.Option value="day">День</Select.Option>
				<Select.Option value="week">Неделя</Select.Option>
				<Select.Option value="month">Месяц</Select.Option>
				<Select.Option value="year">Год</Select.Option>
			</Select>

			{/* Статистика по созданным заявкам */}
			<h3>Созданные заявки</h3>
			<Row gutter={16} style={{ marginBottom: 20 }}>
				<Col span={8}>
					<Card>
						<Statistic title="Всего заявок" value={totalCreated} />
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic title="В ожидании" value={pendingCreated} />
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic title="Решено" value={resolvedCreated} />
					</Card>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<h4>Статус заявок</h4>
					<PieChart width={400} height={300}>
						<Pie
							data={statusDataCreated}
							cx="50%"
							cy="50%"
							outerRadius={80}
							fill="#8884d8"
							dataKey="value"
							label={({ name, percent }) =>
								`${name}: ${(percent * 100).toFixed(0)}%`
							}>
							{statusDataCreated.map((entry, index) => (
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
					<BarChart width={400} height={300} data={priorityDataCreated}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="value" fill="#9254DE" />
					</BarChart>
				</Col>
			</Row>

			{/* Статистика по направленным заявкам */}
			<h3 style={{ marginTop: 40 }}>Направленные заявки</h3>
			<Row gutter={16} style={{ marginBottom: 20 }}>
				<Col span={8}>
					<Card>
						<Statistic title="Всего заявок" value={totalAssigned} />
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic title="В ожидании" value={pendingAssigned} />
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic title="Решено" value={resolvedAssigned} />
					</Card>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<h4>Статус заявок</h4>
					<PieChart width={400} height={300}>
						<Pie
							data={statusDataAssigned}
							cx="50%"
							cy="50%"
							outerRadius={80}
							fill="#8884d8"
							dataKey="value"
							label={({ name, percent }) =>
								`${name}: ${(percent * 100).toFixed(0)}%`
							}>
							{statusDataAssigned.map((entry, index) => (
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
					<BarChart width={400} height={300} data={priorityDataAssigned}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="value" fill="#9254DE" />
					</BarChart>
				</Col>
			</Row>
		</div>
	);
};

export default StatisticsPage;
