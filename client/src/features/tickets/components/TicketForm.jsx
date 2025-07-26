import { useState } from 'react';
import { Box, Button, MenuItem, FormControl, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import ControlledTextField from '../../../components/Common/ControlledTextField'; // Новый компонент
import FileUploader from '../../../components/Common/FileUploader';
import ControlledSelect from '../../../components/Common/ControlledSelect';

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
						<ControlledSelect
							name="assignedTo"
							control={control}
							rules={{ required: 'Выберите исполнителя!' }}
							label="Исполнитель"
							options={users?.map((user) => ({
								value: user._id,
								label: user.username,
							}))}
							renderValue={(selected) => {
								if (!selected)
									return <span style={{ color: '#999' }}>Исполнитель</span>;
								const user = users.find((u) => u._id === selected);
								return user ? user.username : '';
							}}
							sx={{
								borderRadius: '8px',
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: '#e0e0e0',
								},
								'& .MuiSelect-select': { padding: '12px 14px' },
							}}
						/>
					</FormControl>
					<FormControl fullWidth>
						<ControlledSelect
							name="priority"
							control={control}
							rules={{ required: 'Выберите приоритет!' }}
							label="Приоритет"
							options={[
								{ value: 'Низкий', label: 'Низкий' },
								{ value: 'Средний', label: 'Средний' },
								{ value: 'Высокий', label: 'Высокий' },
							]}
							sx={{
								borderRadius: '8px',
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: '#e0e0e0',
								},
								'& .MuiSelect-select': { padding: '12px 14px' },
							}}
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
