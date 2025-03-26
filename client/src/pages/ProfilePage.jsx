import { useState } from 'react';

import { Form, Button, Input, Checkbox, Select } from 'antd';

export default function ProfilePage() {
	const [componentDisabled, setComponentDisabled] = useState(true);
	const options = [
		{
			label: 'IT',
			value: 'IT',
		},
		{
			label: 'Сайт',
			value: 'Работа сайта',
		},
		{
			label: 'Мобильное приложение',
			value: 'Работа мобильного приложения',
		},
	];

	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};
	return (
		<>
			{/* <div style={{ display: 'block' }}> */}
			<Checkbox
				checked={componentDisabled}
				onChange={(e) => setComponentDisabled(e.target.checked)}></Checkbox>
			<Form
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 14,
				}}
				layout="horizontal"
				disabled={componentDisabled}
				style={{
					width: 600,
				}}>
				<Form.Item label="ФИО">
					<Input />
				</Form.Item>

				<Form.Item label="Категории вопросов">
					<Select
						mode="multiple"
						allowClear
						style={{
							width: '100%',
						}}
						placeholder="Please select"
						onChange={handleChange}
						options={options}
					/>
				</Form.Item>
				<Form.Item label="Количество заданных вопросов">
					<Input />
				</Form.Item>
				<Form.Item label="Количество данных ответов">
					<Input />
				</Form.Item>

				<Form.Item>
					<Button>Сохранить</Button>
				</Form.Item>
				<Form.Item>
					<Button>Отменить</Button>
				</Form.Item>
			</Form>
			{/* </div> */}
		</>
	);
}
