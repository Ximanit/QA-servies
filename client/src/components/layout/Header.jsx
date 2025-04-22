import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ handleDrawerToggle }) => {
	const username = useSelector((state) => state.auth.user || 'Гость');

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
				<Typography variant="body1" sx={{ fontWeight: 400 }}>
					{username}
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
