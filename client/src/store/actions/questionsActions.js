// src/store/actions/questionsActions.js
import {
	setQuestions,
	setQuestionDetails,
	addQuestion,
} from '../slices/questionsSlice';
import {
	fetchQuestions,
	fetchQuestionDetails,
	createQuestion,
} from '../../api/questions';

export const fetchQuestionsAction = () => async (dispatch, getState) => {
	try {
		const token = getState().auth.token;
		const data = await fetchQuestions(token);
		dispatch(setQuestions(data));
	} catch (error) {
		console.error('Error fetching questions:', error);
	}
};

export const fetchQuestionDetailsAction =
	(id) => async (dispatch, getState) => {
		try {
			const token = getState().auth.token;
			const data = await fetchQuestionDetails(id, token);
			dispatch(setQuestionDetails(data));
		} catch (error) {
			console.error('Error fetching question details:', error);
		}
	};

export const createQuestionAction =
	(questionData) => async (dispatch, getState) => {
		try {
			const token = getState().auth.token;
			const data = await createQuestion(questionData, token);
			dispatch(addQuestion(data));
			return data;
		} catch (error) {
			console.error('Error creating question:', error);
			throw error;
		}
	};
