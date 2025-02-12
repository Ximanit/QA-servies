import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import QuestionPage from './pages/QuestionPage';
import CreateQuestionPage from './pages/CreateQuestionPage';
import NotFound from './pages/NotFound';
import EmptyPage from './pages/EmptyPage';

import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		errorElement: <NotFound />,
		children: [
			{
				errorElement: <NotFound />,
				children: [
					{ index: true, element: <EmptyPage /> },
					{
						path: 'questions/:id',
						element: (
							<ProtectedRoute>
								<QuestionPage />
							</ProtectedRoute>
						),
					},
					{
						path: 'questions/create-question',
						element: (
							<ProtectedRoute>
								<CreateQuestionPage />
							</ProtectedRoute>
						),
					},
				],
			},
		],
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		errorElement: <NotFound />,
		children: [
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'register',
				element: <RegisterPage />,
			},
		],
	},
]);
