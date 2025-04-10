// src/components/layout/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({ onLogout }) => (
	<AppBar position="fixed">
		<Toolbar>
			<Typography variant="h6" sx={{ flexGrow: 1 }}>
				Ticket Platform
			</Typography>
			<Box sx={{ display: 'flex', gap: 2 }}>
				<Button color="inherit" component={Link} to="/">
					Home
				</Button>
				<Button color="inherit" component={Link} to="/tickets/create-ticket">
					Create Ticket
				</Button>
				<Button color="inherit" component={Link} to="/profile">
					Profile
				</Button>
				<Button color="inherit" component={Link} to="/stats">
					Statistics
				</Button>
				<Button color="inherit" onClick={onLogout} startIcon={<LogoutIcon />}>
					Logout
				</Button>
			</Box>
		</Toolbar>
	</AppBar>
);

export default Header;
