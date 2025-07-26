import React, { useState } from 'react';
import {
	Button,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Box,
} from '@mui/material';
import { Upload, Delete } from '@mui/icons-material';

const FileUploader = ({ onFilesChange }) => {
	const [fileList, setFileList] = useState([]);

	const handleFileChange = (event) => {
		const newFiles = Array.from(event.target.files);
		const updatedFileList = [...fileList, ...newFiles].map((file, index) => ({
			uid: `${index}-${file.name}`,
			name: file.name,
			originFileObj: file,
		}));
		setFileList(updatedFileList);
		onFilesChange(updatedFileList.map((file) => file.originFileObj));
	};

	const handleRemove = (uid) => {
		const updatedFileList = fileList.filter((file) => file.uid !== uid);
		setFileList(updatedFileList);
		onFilesChange(updatedFileList.map((file) => file.originFileObj));
	};

	return (
		<Box>
			<Button
				variant="outlined"
				component="label"
				startIcon={<Upload />}
				sx={{ mb: 1 }}>
				Загрузить файлы
				<input type="file" multiple hidden onChange={handleFileChange} />
			</Button>
			<List dense>
				{fileList.map((file) => (
					<ListItem
						key={file.uid}
						secondaryAction={
							<IconButton edge="end" onClick={() => handleRemove(file.uid)}>
								<Delete />
							</IconButton>
						}>
						<ListItemText primary={file.name} />
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default FileUploader;
