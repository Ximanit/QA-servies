// src/redux/slices/questionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const questionsSlice = createSlice({
	name: 'questions',
	initialState: {
		list: [],
		questionDetails: null, // Храним детали одного вопроса
	},
	reducers: {
		setQuestions(state, action) {
			state.list = action.payload;
		},
		addQuestion(state, action) {
			state.list.push(action.payload);
		},
		setQuestionDetails(state, action) {
			state.questionDetails = action.payload;
		},
	},
});

export const { setQuestions, addQuestion, setQuestionDetails } =
	questionsSlice.actions;
export default questionsSlice.reducer;
