import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message, Select } from 'antd';
import { useCreateTicketMutation } from '../store/api/ticketsApi';
import { useGetUsersQuery } from '../store/api/authApi';
import FileUploader from '../components/Common/FileUploader';

const CreateTicketPage = () => {
	const [form] = Form.useForm();
	const [createTicket, { isLoading }] = useCreateTicketMutation();
	const { data: users, isLoading: usersLoading } = useGetUsersQuery();
	const navigate = useNavigate();
	const [files, setFiles] = useState([]);

	const onFinish = async (values) => {
		try {
			const ticketData = { ...values, files };
			const newTicket = await createTicket(ticketData).unwrap();
			message.success('Заявка успешно создана!');
			form.resetFields();
			setFiles([]);
			navigate(`/tickets/${newTicket._id}`);
		} catch (error) {
			message.error('Ошибка при создании заявки');
		}
	};

	if (usersLoading) return <div>Загрузка пользователей...</div>;

	const userOptions = users?.map((user) => ({
		label: user.username,
		value: user._id,
	}));

	return (
		<Card title="Создать заявку" style={{ maxWidth: 600, margin: 'auto' }}>
			<Form form={form} onFinish={onFinish} layout="vertical">
				<Form.Item
					name="title"
					label="Заголовок"
					rules={[
						{ required: true, message: 'Пожалуйста, введите заголовок!' },
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					name="category"
					label="Категория"
					rules={[{ required: true, message: 'Выберите категорию!' }]}>
					<Input />
				</Form.Item>
				<Form.Item
					name="description"
					label="Описание"
					rules={[{ required: true, message: 'Введите описание!' }]}>
					<Input.TextArea rows={4} />
				</Form.Item>
				<Form.Item
					name="assignedTo"
					label="Исполнитель"
					rules={[{ required: true, message: 'Выберите исполнителя!' }]}>
					<Select options={userOptions} placeholder="Выберите исполнителя" />
				</Form.Item>
				<Form.Item label="Файлы">
					<FileUploader onFilesChange={setFiles} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" loading={isLoading}>
						{isLoading ? 'Создание...' : 'Создать'}
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default CreateTicketPage;
