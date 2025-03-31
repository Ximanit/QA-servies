// src/features/tickets/components/TicketForm.jsx
import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import FileUploader from '../../../Common/FileUploader';

const TicketForm = ({ onSubmit, users, isLoading }) => {
	const [form] = Form.useForm();
	const [files, setFiles] = useState([]);

	const handleSubmit = (values) => {
		onSubmit({ ...values, files });
		form.resetFields();
		setFiles([]);
	};

	const userOptions = users?.map((user) => ({
		label: user.username,
		value: user._id,
	}));

	return (
		<Form form={form} onFinish={handleSubmit} layout="vertical">
			<Form.Item
				name="title"
				label="Заголовок"
				rules={[{ required: true, message: 'Пожалуйста, введите заголовок!' }]}>
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
	);
};

export default TicketForm;
