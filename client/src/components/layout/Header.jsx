import React from 'react';
import { Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ handleDrawerToggle }) => {
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
			</Toolbar>
		</AppBar>
	);
};

export default Header;
