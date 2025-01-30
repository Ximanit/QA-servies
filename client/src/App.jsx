// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import store from './store/store';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import QuestionPage from './pages/QuestionPage';
import CreateQuestionPage from './pages/CreateQuestionPage';
import NotFound from './pages/NotFound';

const App = () => (
	<Provider store={store}>
		<ConfigProvider>
			<Router>
				<Routes>
					<Route
						path="/login"
						element={
							<AuthLayout>
								<LoginPage />
							</AuthLayout>
						}
					/>
					<Route
						path="/register"
						element={
							<AuthLayout>
								<RegisterPage />
							</AuthLayout>
						}
					/>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<MainLayout>
									<Dashboard />
								</MainLayout>
							</ProtectedRoute>
						}
					/>
					<Route
						path="/questions/:id"
						element={
							<ProtectedRoute allowedRoles={['user', 'special']}>
								<MainLayout>
									<QuestionPage />
								</MainLayout>
							</ProtectedRoute>
						}
					/>
					<Route
						path="/create-question"
						element={
							<ProtectedRoute allowedRoles={['user']}>
								<MainLayout>
									<CreateQuestionPage />
								</MainLayout>
							</ProtectedRoute>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</ConfigProvider>
	</Provider>
);

export default App;
