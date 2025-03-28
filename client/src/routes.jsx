// src/routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TicketPage from './pages/TicketPage';
import CreateTicketPage from './pages/CreateTicketPage';
import NotFound from './pages/NotFound';
import EmptyPage from './pages/EmptyPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import TicketsListPage from './pages/TicketsListPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		errorElement: <NotFound />,
		children: [
			{
				errorElement: <NotFound />,
				children: [
					{ index: true, element: <TicketsListPage /> },
					{
						path: 'tickets/:id',
						element: (
							<ProtectedRoute>
								<TicketPage />
							</ProtectedRoute>
						),
					},
					{
						path: 'tickets/create-ticket',
						element: (
							<ProtectedRoute>
								<CreateTicketPage />
							</ProtectedRoute>
						),
					},
					{
						path: 'tickets',
						element: (
							<ProtectedRoute>
								<TicketsListPage />
							</ProtectedRoute>
						),
					},
					{
						path: 'profile',
						element: (
							<ProtectedRoute>
								<ProfilePage />
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
			{ path: 'login', element: <LoginPage /> },
			{ path: 'register', element: <RegisterPage /> },
		],
	},
]);
