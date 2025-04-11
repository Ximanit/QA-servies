import React, { useState } from 'react';
import {
	Box,
	TextField,
	Button,
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import FileUploader from '../../../components/Common/FileUploader';

const TicketForm = ({ onSubmit, users, isLoading }) => {
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			title: '',
			category: '',
			description: '',
			assignedTo: '',
		},
	});
	const [files, setFiles] = useState([]);

	const onFormSubmit = (values) => {
		onSubmit({ ...values, files });
		reset();
		setFiles([]);
	};

	return (
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
						label="Заголовок"
						variant="outlined"
						fullWidth
						error={!!error}
						helperText={error?.message}
					/>
				)}
			/>
			<Controller
				name="category"
				control={control}
				rules={{ required: 'Выберите категорию!' }}
				render={({ field, fieldState: { error } }) => (
					<TextField
						{...field}
						label="Категория"
						variant="outlined"
						fullWidth
						error={!!error}
						helperText={error?.message}
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
						label="Описание"
						multiline
						rows={4}
						variant="outlined"
						fullWidth
						error={!!error}
						helperText={error?.message}
					/>
				)}
			/>
			<FormControl>
				<InputLabel>Исполнитель</InputLabel>
				<Controller
					name="assignedTo"
					control={control}
					rules={{ required: 'Выберите исполнителя!' }}
					render={({ field, fieldState: { error } }) => (
						<Select
							{...field}
							label="Исполнитель"
							variant="outlined"
							fullWidth
							error={!!error}>
							{users?.map((user) => (
								<MenuItem key={user._id} value={user._id}>
									{user.username}
								</MenuItem>
							))}
						</Select>
					)}
				/>
			</FormControl>
			<Box>
				<Typography variant="body1" gutterBottom>
					Файлы
				</Typography>
				<FileUploader onFilesChange={setFiles} />
			</Box>
			<Button
				type="submit"
				variant="contained"
				color="primary"
				disabled={isLoading}
				sx={{ alignSelf: 'flex-start' }}>
				{isLoading ? 'Создание...' : 'Создать'}
			</Button>
		</Box>
	);
};

export default TicketForm;
