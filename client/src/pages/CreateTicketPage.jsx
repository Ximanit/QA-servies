// src/pages/CreateTicketPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useCreateTicketMutation } from '../store/api/ticketsApi';
import { useGetUsersQuery } from '../store/api/authApi'; // Изменён импорт

const CreateTicketPage = () => {
	const [form] = Form.useForm();
	const [createTicket, { isLoading }] = useCreateTicketMutation();
	const { data: users, isLoading: usersLoading } = useGetUsersQuery();
	const navigate = useNavigate();
	const [fileList, setFileList] = useState([]);

	const onFinish = async (values) => {
		try {
			const ticketData = {
				...values,
				files: fileList.map((file) => file.originFileObj),
			};
			const newTicket = await createTicket(ticketData).unwrap();
			message.success('Заявка успешно создана!');
			form.resetFields();
			setFileList([]);
			navigate(`/tickets/${newTicket._id}`);
		} catch (error) {
			message.error('Ошибка при создании заявки');
		}
	};

	const uploadProps = {
		onRemove: (file) => {
			setFileList(fileList.filter((item) => item.uid !== file.uid));
		},
		beforeUpload: (file) => {
			setFileList([...fileList, file]);
			return false;
		},
		fileList,
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
					<Upload {...uploadProps}>
						<Button icon={<UploadOutlined />}>Загрузить файлы</Button>
					</Upload>
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
