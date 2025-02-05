import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card } from 'antd';
import { createQuestion } from '../store/slices/questionsSlice';

const CreateQuestionPage = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onFinish = (values) => {
		console.log(values);
		dispatch(
			createQuestion({
				title: values.title,
				description: values.description,
				category: values.category,
			})
		);
		navigate('/');
	};

	return (
		<Card title="Ask a Question" style={{ maxWidth: 600, margin: 'auto' }}>
			<Form form={form} onFinish={onFinish} layout="vertical">
				<Form.Item name="title" label="Title">
					<Input />
				</Form.Item>
				<Form.Item name="category" label="Category">
					<Input />
				</Form.Item>
				<Form.Item name="description" label="Description">
					<Input.TextArea rows={4} />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default CreateQuestionPage;
