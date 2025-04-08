// src/components/features/tickets/components/TicketChat.jsx
import React, { useState } from 'react';
import { Form, Button, List, Input } from 'antd';
import FileUploader from '../../../Common/FileUploader';

const TicketChat = ({
	messages,
	onSendMessage,
	userId,
	isLoading,
	isClosed,
}) => {
	const [form] = Form.useForm();
	const [files, setFiles] = useState([]);

	const handleSubmit = (values) => {
		onSendMessage({ content: values.content, files });
		form.resetFields();
		setFiles([]);
	};

	return (
		<div style={{ marginTop: 20 }}>
			<h3>Чат</h3>
			<List
				dataSource={messages}
				renderItem={(msg) => (
					<List.Item
						style={{
							background: msg.author._id === userId ? '#e6f7ff' : '#f5f5f5',
							margin: 5,
							padding: 10,
						}}>
						<p>
							<strong>{msg.author.username}:</strong> {msg.content}
						</p>
						{msg.files?.length > 0 && (
							<div>
								{msg.files.map((file) => (
									<a
										key={file.filename}
										href={`${API_URL}/uploads/${file.filename}`}
										target="_blank"
										rel="noopener noreferrer">
										{file.filename}
									</a>
								))}
							</div>
						)}
						<small>{new Date(msg.createdAt).toLocaleTimeString()}</small>
					</List.Item>
				)}
			/>
			{!isClosed ? (
				<Form
					form={form}
					onFinish={handleSubmit}
					layout="vertical"
					style={{ marginTop: 20 }}>
					<Form.Item
						name="content"
						rules={[{ required: true, message: 'Введите сообщение!' }]}>
						<Input.TextArea rows={4} placeholder="Введите сообщение" />
					</Form.Item>
					<Form.Item>
						<FileUploader onFilesChange={setFiles} />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={isLoading}>
							Отправить
						</Button>
					</Form.Item>
				</Form>
			) : (
				<p style={{ marginTop: 10, color: '#888' }}>
					Заявка закрыта. Чат доступен только для просмотра.
				</p>
			)}
		</div>
	);
};

export default TicketChat;
