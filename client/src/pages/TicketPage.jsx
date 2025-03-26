// src/pages/TicketPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, Button, Input, Card, message, Upload, List } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { io } from 'socket.io-client';
import {
	useGetTicketDetailsQuery,
	useGetMessagesQuery,
	useAddMessageMutation,
} from '../store/api/ticketsApi';
import { API_URL } from '../constants';

const TicketPage = () => {
	const { id } = useParams();
	const [form] = Form.useForm();
	const { data: ticketDetails, isLoading: ticketLoading } =
		useGetTicketDetailsQuery(id);
	const { data: messages, isLoading: messagesLoading } =
		useGetMessagesQuery(id);
	const [addMessage, { isLoading: isAdding }] = useAddMessageMutation();
	const userId = useSelector((state) => state.auth.id);
	const [fileList, setFileList] = useState([]);
	const [chatMessages, setChatMessages] = useState([]);

	// WebSocket
	useEffect(() => {
		const socket = io(API_URL, {
			transports: ['websocket', 'polling'], // Указываем возможные транспорты
		});
		socket.on('connect', () => {
			socket.emit('joinTicket', id);
			console.log('Connected to Socket.IO server');
		});
		socket.on('newMessage', (message) => {
			setChatMessages((prev) => [...prev, message]);
		});
		socket.on('connect_error', (error) => {
			console.error('Socket.IO connection error:', error);
		});
		return () => socket.disconnect();
	}, [id]);

	useEffect(() => {
		if (messages) setChatMessages(messages);
	}, [messages]);

	const onFinish = async (values) => {
		try {
			const messageData = {
				ticketId: id,
				content: values.content,
				files: fileList.map((file) => file.originFileObj),
			};
			await addMessage(messageData).unwrap();
			form.resetFields();
			setFileList([]);
			message.success('Сообщение отправлено!');
		} catch (error) {
			message.error('Ошибка при отправке сообщения');
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

	if (ticketLoading || messagesLoading) return <div>Загрузка...</div>;

	return (
		<Card title={`Заявка: ${ticketDetails?.title}`}>
			{/* Остальной код остаётся без изменений */}
			<div>
				<p>
					<strong>Описание:</strong> {ticketDetails?.description}
				</p>
				<p>
					<strong>Категория:</strong> {ticketDetails?.category}
				</p>
				<p>
					<strong>Статус:</strong> {ticketDetails?.status}
				</p>
				<p>
					<strong>Автор:</strong> {ticketDetails?.author?.username}
				</p>
				<p>
					<strong>Дата создания:</strong>{' '}
					{new Date(ticketDetails?.createdAt).toLocaleString()}
				</p>
				{ticketDetails?.files?.length > 0 && (
					<div>
						<strong>Файлы:</strong>
						<List
							dataSource={ticketDetails.files}
							renderItem={(file) => (
								<List.Item>
									<a
										href={`${API_URL}/uploads/${file.filename}`}
										target="_blank"
										rel="noopener noreferrer">
										{file.filename}
									</a>
								</List.Item>
							)}
						/>
					</div>
				)}
			</div>
			<div style={{ marginTop: 20 }}>
				<h3>Чат</h3>
				<List
					dataSource={chatMessages}
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
				<Form
					form={form}
					onFinish={onFinish}
					layout="vertical"
					style={{ marginTop: 20 }}>
					<Form.Item
						name="content"
						rules={[{ required: true, message: 'Введите сообщение!' }]}>
						<Input.TextArea rows={4} placeholder="Введите сообщение" />
					</Form.Item>
					<Form.Item>
						<Upload {...uploadProps}>
							<Button icon={<UploadOutlined />}>Прикрепить файлы</Button>
						</Upload>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={isAdding}>
							Отправить
						</Button>
					</Form.Item>
				</Form>
			</div>
		</Card>
	);
};

export default TicketPage;
