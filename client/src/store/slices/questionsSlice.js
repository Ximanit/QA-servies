// src/redux/slices/questionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createQuestion = createAsyncThunk(
	'questions/createQuestion',
	async (questionData, { getState }) => {
		const { token } = getState().auth;
		const response = await axios.post(
			'http://localhost:3000/question/',
			questionData,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		return response.data;
	}
);

const questionsSlice = createSlice({
	name: 'questions',
	initialState: {
		list: [],
		questionDetails: null, // Добавляем поле для хранения деталей вопроса
	},
	reducers: {
		setQuestions(state, action) {
			state.list = action.payload;
		},
		addQuestion(state, action) {
			state.list.push(action.payload);
		},
		setQuestionDetails(state, action) {
			// Новый редьюсер для деталей вопроса
			state.questionDetails = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createQuestion.fulfilled, (state, action) => {
			state.items.push(action.payload);
		});
	},
});

export const { setQuestions, addQuestion, setQuestionDetails } =
	questionsSlice.actions;
export default questionsSlice.reducer;
