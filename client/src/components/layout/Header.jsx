import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box,
	IconButton,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ onLogout, handleDrawerToggle }) => {
	const location = useLocation();

	const isActive = (path) => location.pathname === path;

	return (
		<AppBar position="fixed">
			<Toolbar>
				{handleDrawerToggle && (
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}>
						<MenuIcon />
					</IconButton>
				)}
				<Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
					Ticket Platform
				</Typography>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<Button
						color="inherit"
						component={Link}
						to="/"
						sx={{
							borderRadius: 6,
							bgcolor: isActive('/')
								? 'rgba(25, 118, 210, 0.1)'
								: 'transparent',
							color: isActive('/') ? 'primary.main' : 'text.primary',
							'&:hover': {
								bgcolor: 'rgba(25, 118, 210, 0.1)',
								color: 'primary.main',
							},
						}}>
						Home
					</Button>
					<Button
						color="inherit"
						component={Link}
						to="/tickets/create-ticket"
						sx={{
							borderRadius: 6,
							bgcolor: isActive('/tickets/create-ticket')
								? 'rgba(25, 118, 210, 0.1)'
								: 'transparent',
							color: isActive('/tickets/create-ticket')
								? 'primary.main'
								: 'text.primary',
							'&:hover': {
								bgcolor: 'rgba(25, 118, 210, 0.1)',
								color: 'primary.main',
							},
						}}>
						Create Ticket
					</Button>
					<Button
						color="inherit"
						component={Link}
						to="/profile"
						sx={{
							borderRadius: 6,
							bgcolor: isActive('/profile')
								? 'rgba(25, 118, 210, 0.1)'
								: 'transparent',
							color: isActive('/profile') ? 'primary.main' : 'text.primary',
							'&:hover': {
								bgcolor: 'rgba(25, 118, 210, 0.1)',
								color: 'primary.main',
							},
						}}>
						Profile
					</Button>
					<Button
						color="inherit"
						component={Link}
						to="/stats"
						sx={{
							borderRadius: 6,
							bgcolor: isActive('/stats')
								? 'rgba(25, 118, 210, 0.1)'
								: 'transparent',
							color: isActive('/stats') ? 'primary.main' : 'text.primary',
							'&:hover': {
								bgcolor: 'rgba(25, 118, 210, 0.1)',
								color: 'primary.main',
							},
						}}>
						Statistics
					</Button>
					<Button
						color="inherit"
						onClick={onLogout}
						startIcon={<LogoutIcon />}
						sx={{
							borderRadius: 6,
							'&:hover': {
								bgcolor: 'rgba(25, 118, 210, 0.1)',
								color: 'primary.main',
							},
						}}>
						Logout
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
