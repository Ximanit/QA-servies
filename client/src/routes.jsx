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

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		errorElement: (
			<Suspense fallback={<div>Загрузка...</div>}>
				<NotFound />
			</Suspense>
		),
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<div>Загрузка...</div>}>
						<TicketsListPage />
					</Suspense>
				),
			},
			{
				path: 'tickets/:id',
				element: (
					<ProtectedRoute>
						<Suspense fallback={<div>Загрузка...</div>}>
							<TicketPage />
						</Suspense>
					</ProtectedRoute>
				),
			},
			{
				path: 'tickets/create-ticket',
				element: (
					<ProtectedRoute>
						<Suspense fallback={<div>Загрузка...</div>}>
							<CreateTicketPage />
						</Suspense>
					</ProtectedRoute>
				),
			},
			{
				path: 'tickets',
				element: (
					<ProtectedRoute>
						<Suspense fallback={<div>Загрузка...</div>}>
							<TicketsListPage />
						</Suspense>
					</ProtectedRoute>
				),
			},
			{
				path: 'profile',
				element: (
					<ProtectedRoute>
						<Suspense fallback={<div>Загрузка...</div>}>
							<ProfilePage />
						</Suspense>
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: (
					<Suspense fallback={<div>Загрузка...</div>}>
						<LoginPage />
					</Suspense>
				),
			},
			{
				path: 'register',
				element: (
					<Suspense fallback={<div>Загрузка...</div>}>
						<RegisterPage />
					</Suspense>
				),
			},
		],
	},
]);
