import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Box,
} from '@mui/material';
import { Home, Person, BarChart, Logout } from '@mui/icons-material';

const Sidebar = ({ onLogout, drawerProps }) => {
	const location = useLocation();

	// Navigation items for the top of the sidebar
	const mainNavItems = [
		{ key: 'home', label: 'Заявки', path: '/', icon: <Home /> },

		{ key: 'profile', label: 'Профиль', path: '/profile', icon: <Person /> },
		{ key: 'stats', label: 'Статистика', path: '/stats', icon: <BarChart /> },
	];

	// Logout item for the bottom
	const logoutItem = {
		key: 'logout',
		label: 'Выйти',
		action: onLogout,
		icon: <Logout />,
	};

	return (
		<Drawer {...drawerProps}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					overflow: 'auto',
				}}>
				<List>
					{mainNavItems.map((item) => {
						const isActive = item.path && location.pathname === item.path;
						return (
							<ListItem key={item.key} disablePadding>
								<ListItemButton
									selected={isActive}
									component={Link}
									to={item.path}
									sx={{
										pl: 2,
										bgcolor: isActive
											? 'rgba(25, 118, 210, 0.1)'
											: 'transparent',
										'&:hover': {
											bgcolor: 'rgba(25, 118, 210, 0.1)',
										},
									}}>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText primary={item.label} />
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>

				<Box sx={{ flexGrow: 1 }} />

				<List>
					<ListItem disablePadding>
						<ListItemButton
							onClick={logoutItem.action}
							sx={{
								pl: 2,
								'&:hover': {
									bgcolor: 'rgba(25, 118, 210, 0.1)',
								},
							}}>
							<ListItemIcon>{logoutItem.icon}</ListItemIcon>
							<ListItemText primary={logoutItem.label} />
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Drawer>
	);
};

export default Sidebar;
