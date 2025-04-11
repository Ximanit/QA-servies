import React, { useState, useEffect } from 'react';
import {
	Box,
	TextField,
	Button,
	FormControl,
	FormLabel,
	FormHelperText,
	Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const ProfileForm = ({
	profile,
	createdTicketsCount,
	completedTicketsCount,
	onUpdate,
	updateLoading,
}) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			fio: profile?.fio || '',
		},
	});
	const [isEditing, setIsEditing] = useState(false);

	// Инициализация формы
	useEffect(() => {
		reset({
			fio: profile?.fio || '',
		});
	}, [profile, reset]);

	const onSubmit = async (values) => {
		const success = await onUpdate(values);
		if (success) {
			setIsEditing(false);
		}
	};

	const onCancel = () => {
		reset({
			fio: profile?.fio || '',
		});
		setIsEditing(false);
	};

	const onEdit = () => {
		setIsEditing(true);
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			<FormControl disabled={!isEditing} error={!!errors.fio}>
				<FormLabel>ФИО</FormLabel>
				<Controller
					name="fio"
					control={control}
					rules={{ required: 'Введите ваше ФИО!' }}
					render={({ field }) => (
						<TextField
							{...field}
							placeholder="Фамилия Имя Отчество"
							variant="outlined"
							size="small"
							fullWidth
						/>
					)}
				/>
				{errors.fio && <FormHelperText>{errors.fio.message}</FormHelperText>}
			</FormControl>

			<FormControl>
				<FormLabel>Количество созданных заявок</FormLabel>
				<Typography variant="body1">{createdTicketsCount || 0}</Typography>
			</FormControl>

			<FormControl>
				<FormLabel>Количество выполненных заявок</FormLabel>
				<Typography variant="body1">{completedTicketsCount || 0}</Typography>
			</FormControl>

			<Box sx={{ display: 'flex', gap: 1 }}>
				{isEditing ? (
					<>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={updateLoading}
							sx={{ minWidth: 100 }}>
							{updateLoading ? 'Сохранение...' : 'Сохранить'}
						</Button>
						<Button
							variant="outlined"
							color="secondary"
							onClick={onCancel}
							sx={{ minWidth: 100 }}>
							Отменить
						</Button>
					</>
				) : (
					<Button
						variant="contained"
						color="primary"
						onClick={onEdit}
						sx={{ minWidth: 100 }}>
						Редактировать
					</Button>
				)}
			</Box>
		</Box>
	);
};

export default ProfileForm;
