import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card } from 'antd';
import { createQuestion } from '../store/slices/questionsSlice';

const CreateQuestionPage = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onFinish = (values) => {
		dispatch(createQuestion(values));
		navigate('/');
	};

	return (
		<Card title="Ask a Question" style={{ maxWidth: 600, margin: 'auto' }}>
			<Form form={form} onFinish={onFinish} layout="vertical">
				<Form.Item name="title" label="Title" rules={[{ required: true }]}>
					{' '}
					<Input />{' '}
				</Form.Item>
				<Form.Item
					name="description"
					label="Description"
					rules={[{ required: true }]}>
					{' '}
					<Input.TextArea rows={4} />{' '}
				</Form.Item>
				<Form.Item>
					{' '}
					<Button type="primary" htmlType="submit">
						Submit
					</Button>{' '}
				</Form.Item>
			</Form>
		</Card>
	);
};

export default CreateQuestionPage;
