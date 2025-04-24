// src/features/ticket/components/TicketForm.jsx
import React, { useState } from 'react';
import {
	Box,
	Button,
	MenuItem,
	FormControl,
	Select,
	Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import ControlledTextField from '../../../components/Common/ControlledTextField'; // Новый компонент
import FileUploader from '../../../components/Common/FileUploader';

const TicketForm = ({ onSubmit, users, isLoading }) => {
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			title: '',
			description: '',
			assignedTo: '',
			priority: '',
		},
	});
	const [files, setFiles] = useState([]);

	const onFormSubmit = (values) => {
		onSubmit({ ...values, files });
		reset();
		setFiles([]);
	};

	return (
		<Box>
			<Box
				component="form"
				onSubmit={handleSubmit(onFormSubmit)}
				sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<ControlledTextField
					name="title"
					control={control}
					rules={{ required: 'Пожалуйста, введите заголовок!' }}
					placeholder="Введите тему заявки"
				/>
				<ControlledTextField
					name="description"
					control={control}
					rules={{ required: 'Введите описание!' }}
					placeholder="Опишите проблему или запрос подробно"
					multiline
					rows={4}
				/>
				<Box sx={{ display: 'flex', gap: 2 }}>
					<FormControl fullWidth>
						<Controller
							name="assignedTo"
							control={control}
							rules={{ required: 'Выберите исполнителя!' }}
							render={({ field, fieldState: { error } }) => (
								<Select
									{...field}
									displayEmpty
									variant="outlined"
									fullWidth
									error={!!error}
									renderValue={(selected) => {
										if (!selected) {
											return <span style={{ color: '#999' }}>Исполнитель</span>;
										}
										const user = users.find((u) => u._id === selected);
										return user ? user.username : '';
									}}
									sx={{
										borderRadius: '8px',
										'& .MuiOutlinedInput-notchedOutline': {
											borderColor: '#e0e0e0',
										},
										'& .MuiSelect-select': { padding: '12px 14px' },
									}}>
									{users?.map((user) => (
										<MenuItem key={user._id} value={user._id}>
											{user.username}
										</MenuItem>
									))}
								</Select>
							)}
						/>
					</FormControl>
					<FormControl fullWidth>
						<Controller
							name="priority"
							control={control}
							rules={{ required: 'Выберите приоритет!' }}
							render={({ field, fieldState: { error } }) => (
								<Select
									{...field}
									displayEmpty
									variant="outlined"
									fullWidth
									error={!!error}
									renderValue={(selected) => {
										if (!selected) {
											return <span style={{ color: '#999' }}>Приоритет</span>;
										}
										return selected;
									}}
									sx={{
										borderRadius: '8px',
										'& .MuiOutlinedInput-notchedOutline': {
											borderColor: '#e0e0e0',
										},
										'& .MuiSelect-select': { padding: '12px 14px' },
									}}>
									<MenuItem value="Низкий">Низкий</MenuItem>
									<MenuItem value="Средний">Средний</MenuItem>
									<MenuItem value="Высокий">Высокий</MenuItem>
								</Select>
							)}
						/>
					</FormControl>
				</Box>
				<Box>
					<Typography variant="body1" gutterBottom>
						Прикрепить файлы
					</Typography>
					<FileUploader onFilesChange={setFiles} />
				</Box>
				<Box sx={{ display: 'flex', gap: 2 }}>
					<Button
						type="submit"
						variant="contained"
						disabled={isLoading}
						sx={{
							backgroundColor: '#1976d2',
							textTransform: 'none',
							borderRadius: '8px',
							padding: '10px 24px',
							'&:hover': { backgroundColor: '#1565c0' },
						}}>
						{isLoading ? 'Создание...' : 'Создать заявку'}
					</Button>
					<Button
						variant="text"
						onClick={() => window.history.back()}
						sx={{
							color: '#666',
							textTransform: 'none',
							borderRadius: '8px',
							padding: '10px 24px',
						}}>
						Отмена
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default TicketForm;
