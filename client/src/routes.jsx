import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/Common/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import TicketPage from './pages/tickets/TicketPage';
import CreateTicketPage from './pages/tickets/CreateTicketPage';
import NotFound from './pages/NotFound';
import ProfilePage from './pages/ProfilePage';
import TicketsListPage from './pages/tickets/TicketsListPage';
import StatsPage from './pages/StatsPage';

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
			element: route.element,
		})),
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: authRoutes.map((route) => ({
			...route,
			element: route.element,
		})),
	},
]);
