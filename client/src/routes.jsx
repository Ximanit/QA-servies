// src/routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const TicketPage = lazy(() => import('./pages/TicketPage'));
const CreateTicketPage = lazy(() => import('./pages/CreateTicketPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const TicketsListPage = lazy(() => import('./pages/TicketsListPage'));

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
	{ path: 'tickets', element: <TicketsListPage />, protected: true },
	{ path: 'profile', element: <ProfilePage />, protected: true },
];

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		errorElement: (
			<Suspense fallback={<div>Загрузка...</div>}>
				<NotFound />
			</Suspense>
		),
		children: mainRoutes.map((route) => ({
			...route,
			element: route.protected ? (
				<ProtectedRoute>
					<Suspense fallback={<div>Загрузка...</div>}>{route.element}</Suspense>
				</ProtectedRoute>
			) : (
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
