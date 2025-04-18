import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/actions/authActions';
import { useGetUserTicketsQuery } from '../features/tickets/ticketsApi';
import { useSocket } from '../hooks/useSocket';
import { useNotifications } from '../hooks/useNotifications';
import { Box, CssBaseline, useMediaQuery, Skeleton } from '@mui/material';

import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

const MainLayout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userId = useSelector((state) => state.auth.id);
	const { data: userTickets = [], isLoading } = useGetUserTicketsQuery(userId);
	const { notifications: socketNotifications } = useSocket(null, userId);
	const apiNotifications = useNotifications();
	const isMobile = useMediaQuery('(max-width:600px)');
	const isTablet = useMediaQuery('(max-width:900px)');
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate('/auth/login');
	};

	if (isLoading) {
		return (
			<Box
				sx={{
					display: 'flex',
					minHeight: '100vh',
					bgcolor: 'background.default',
				}}>
				{!isMobile && (
					<Skeleton
						variant="rectangular"
						width={isTablet ? 180 : 255}
						height="100%"
						sx={{ mt: '64px' }}
					/>
				)}
				<Box
					sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, mt: '64px', width: '100%' }}>
					<Skeleton variant="text" width="40%" height={40} />
					<Skeleton
						variant="rectangular"
						width="100%"
						height={200}
						sx={{ mt: 2 }}
					/>
					<Skeleton
						variant="rectangular"
						width="100%"
						height={200}
						sx={{ mt: 2 }}
					/>
				</Box>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				display: 'flex',
				minHeight: '100vh',
				bgcolor: 'background.default',
			}}>
			<CssBaseline />
			<Header handleDrawerToggle={isMobile ? handleDrawerToggle : null} />
			<Sidebar
				onLogout={handleLogout}
				drawerProps={{
					variant: isMobile ? 'temporary' : 'permanent',
					open: isMobile ? mobileOpen : true,
					onClose: handleDrawerToggle,
					sx: {
						width: isTablet ? 180 : 255,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: isTablet ? 180 : isMobile ? 240 : 255,
							boxSizing: 'border-box',
							mt: isMobile ? 0 : '64px',
							height: isMobile ? '100%' : 'calc(100% - 64px)',
						},
					},
				}}
			/>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: { xs: 2, sm: 3 },
					mt: '64px',
					bgcolor: 'background.paper',
					boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
					width: {
						xs: '100%',
						sm: `calc(100% - ${isTablet ? 180 : 255}px)`,
					},
				}}>
				<Outlet />
			</Box>
		</Box>
	);
};

export default MainLayout;
