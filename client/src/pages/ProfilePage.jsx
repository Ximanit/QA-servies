// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Form, Input, Button, message, Spin } from 'antd';
import {
	useGetProfileQuery,
	useUpdateProfileMutation,
} from '../components/features/profile/profileApi';
import { useGetUserTicketsQuery } from '../components/features/tickets/ticketsApi';

const ProfilePage = () => {
	const userId = useSelector((state) => state.auth.id);
	const [form] = Form.useForm();
	const [isEditing, setIsEditing] = useState(false);

	const {
		data: profileData,
		isLoading: profileLoading,
		error: profileError,
	} = useGetProfileQuery();
	const [updateProfile, { isLoading: updateLoading }] =
		useUpdateProfileMutation();
	const {
		data: userTickets,
		isLoading: ticketsLoading,
		error: ticketsError,
	} = useGetUserTicketsQuery(userId);

	const profile = profileData?.[0];
	const createdTicketsCount = userTickets?.length || 0;
	const completedTicketsCount =
		userTickets?.filter((ticket) => ticket.status === 'Закрыта').length || 0;

	// Обновление формы при получении данных
	React.useEffect(() => {
		if (profile) {
			console.log('Profile data:', profile); // Отладка профиля
			console.log('Tickets data:', userTickets); // Отладка заявок
			form.setFieldsValue({
				fio: profile.fio,
				createdTickets: createdTicketsCount,
				completedTickets: completedTicketsCount,
			});
		}
	}, [profile, userTickets, form]); // Зависимость от userTickets вместо вычисляемых значений

	const onFinish = async (values) => {
		try {
			await updateProfile({ id: userId, fio: values.fio }).unwrap();
			message.success('Профиль успешно обновлен!');
			setIsEditing(false);
		} catch (error) {
			message.error('Ошибка при обновлении профиля');
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

	if (profileLoading || ticketsLoading) {
		return <Spin tip="Загрузка профиля..." />;
	}

	if (profileError) {
		return (
			<Card title="Ошибка">
				<p>
					Не удалось загрузить профиль: {profileError.status} -{' '}
					{profileError.data?.message || 'Неизвестная ошибка'}
				</p>
			</Card>
		);
	}

	if (ticketsError) {
		return (
			<Card title="Ошибка">
				<p>
					Не удалось загрузить заявки: {ticketsError.status} -{' '}
					{ticketsError.data?.message || 'Неизвестная ошибка'}
				</p>
			</Card>
		);
	}

	if (!profile) {
		return (
			<Card title="Ошибка">
				<p>Данные профиля не найдены. Проверьте авторизацию.</p>
			</Card>
		);
	}

	return (
		<Card
			title="Профиль пользователя"
			style={{ maxWidth: 600, margin: '20px auto' }}>
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

				<Form.Item
					label="Количество выполненных заявок"
					name="completedTickets">
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
		</Card>
	);
};

export default ProfilePage;
