import React, { useState } from 'react';
import {
	Box,
	TextField,
	Button,
	MenuItem,
	FormControl,
	Select,
	Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
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
				<Controller
					name="title"
					control={control}
					rules={{ required: 'Пожалуйста, введите заголовок!' }}
					render={({ field, fieldState: { error } }) => (
						<TextField
							{...field}
							placeholder="Введите тему заявки"
							variant="outlined"
							fullWidth
							error={!!error}
							helperText={error?.message}
							sx={{
								'& .MuiOutlinedInput-root': {
									borderRadius: '8px',
									'& fieldset': { borderColor: '#e0e0e0' },
								},
								'& .MuiInputBase-input': { padding: '12px 14px' },
							}}
						/>
					)}
				/>
				<Controller
					name="description"
					control={control}
					rules={{ required: 'Введите описание!' }}
					render={({ field, fieldState: { error } }) => (
						<TextField
							{...field}
							placeholder="Опишите проблему или запрос подробно"
							multiline
							rows={4}
							variant="outlined"
							fullWidth
							error={!!error}
							helperText={error?.message}
							sx={{
								'& .MuiOutlinedInput-root': {
									borderRadius: '8px',
									'& fieldset': { borderColor: '#e0e0e0' },
								},
								'& .MuiInputBase-input': { padding: '12px 14px' },
							}}
						/>
					)}
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
