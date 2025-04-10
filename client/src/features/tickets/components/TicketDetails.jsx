// src/features/tickets/components/TicketDetails.jsx
import React from 'react';
import { List } from 'antd';
import { API_URL } from '../../../constants/constants';

const TicketDetails = ({ ticket }) => (
	<div>
		<p>
			<strong>Описание:</strong> {ticket?.description}
		</p>
		<p>
			<strong>Категория:</strong> {ticket?.category}
		</p>
		<p>
			<strong>Статус:</strong> {ticket?.status}
		</p>
		<p>
			<strong>Автор:</strong> {ticket?.author?.username}
		</p>
		<p>
			<strong>Дата создания:</strong>{' '}
			{new Date(ticket?.createdAt).toLocaleString()}
		</p>
		{ticket?.files?.length > 0 && (
			<div>
				<strong>Файлы:</strong>
				<List
					dataSource={ticket.files}
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
);

export default TicketDetails;
