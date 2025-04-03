// src/components/features/profile/components/ProfileForm.jsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';

const ProfileForm = ({
	profile,
	createdTicketsCount,
	completedTicketsCount,
	onUpdate,
	updateLoading,
}) => {
	const [form] = Form.useForm();
	const [isEditing, setIsEditing] = useState(false);

	// Инициализация формы
	useEffect(() => {
		if (profile) {
			form.setFieldsValue({
				fio: profile.fio,
				createdTickets: createdTicketsCount,
				completedTickets: completedTicketsCount,
			});
		}
	}, [profile, createdTicketsCount, completedTicketsCount, form]);

	const onFinish = async (values) => {
		const success = await onUpdate(values);
		if (success) {
			setIsEditing(false);
		}
	};

	const onCancel = () => {
		form.setFieldsValue({
			fio: profile?.fio,
			createdTickets: createdTicketsCount,
			completedTickets: completedTicketsCount,
		});
		setIsEditing(false);
	};

	const onEdit = () => {
		setIsEditing(true);
	};

	return (
		<Form
			form={form}
			layout="vertical"
			onFinish={onFinish}
			disabled={!isEditing}>
			<Form.Item
				label="ФИО"
				name="fio"
				rules={[{ required: true, message: 'Введите ваше ФИО!' }]}>
				<Input placeholder="Фамилия Имя Отчество" />
			</Form.Item>

			<Form.Item label="Количество созданных заявок" name="createdTickets">
				<Input disabled />
			</Form.Item>

			<Form.Item label="Количество выполненных заявок" name="completedTickets">
				<Input disabled />
			</Form.Item>

			<Form.Item>
				{isEditing ? (
					<div style={{ display: 'flex', gap: 10 }}>
						<Button type="primary" htmlType="submit" loading={updateLoading}>
							Сохранить
						</Button>
						<Button onClick={onCancel}>Отменить</Button>
					</div>
				) : (
					<Button disabled={false} type="primary" onClick={onEdit}>
						Редактировать
					</Button>
				)}
			</Form.Item>
		</Form>
	);
};

export default ProfileForm;
