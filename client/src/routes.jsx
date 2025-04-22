// src/routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/Common/ProtectedRoute';

const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const TicketPage = lazy(() => import('./pages/tickets/TicketPage'));
const CreateTicketPage = lazy(() => import('./pages/tickets/CreateTicketPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const TicketsListPage = lazy(() => import('./pages/tickets/TicketsListPage'));
const StatsPage = lazy(() => import('./pages/StatsPage'));

const authRoutes = [
	{ path: 'login', element: <LoginPage /> },
	{ path: 'register', element: <RegisterPage /> },
];

const mainRoutes = [
	{ index: true, element: <TicketsListPage /> },
	{ path: 'tickets/:id', element: <TicketPage />, protected: true },
	{
		path: 'tickets/create-ticket',
		element: <CreateTicketPage />,
		protected: true,
	},
	{ path: 'profile', element: <ProfilePage />, protected: true },
	{ path: 'stats', element: <StatsPage />, protected: true },
];

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<MainLayout />
			</ProtectedRoute>
		),
		errorElement: <NotFound />,
		children: mainRoutes.map((route) => ({
			...route,
			element: (
				<Suspense fallback={<div>Загрузка...</div>}>{route.element}</Suspense>
			),
		})),
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: authRoutes.map((route) => ({
			...route,
			element: (
				<Suspense fallback={<div>Загрузка...</div>}>{route.element}</Suspense>
			),
		})),
	},
]);
