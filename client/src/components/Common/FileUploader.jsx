import React, { useState } from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const FileUploader = ({ onFilesChange }) => {
	const [fileList, setFileList] = useState([]);

	const uploadProps = {
		onChange: ({ fileList: newFileList }) => {
			setFileList(newFileList);
			onFilesChange(
				newFileList.map((file) => file.originFileObj).filter(Boolean)
			);
		},
		onRemove: (file) => {
			setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
		},
		beforeUpload: () => false,
		fileList,
	};

	return (
		<Upload {...uploadProps}>
			<Button icon={<UploadOutlined />}>Загрузить файлы</Button>
		</Upload>
	);
};

export default FileUploader;
