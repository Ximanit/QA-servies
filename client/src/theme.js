// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#1976d2',
			light: '#42a5f5',
			dark: '#1565c0',
		},
		secondary: {
			main: '#f50057',
		},
		background: {
			default: '#f4f6f8',
			paper: '#ffffff',
		},
		text: {
			primary: '#1a202c',
			secondary: '#4a5568',
		},
	},
	typography: {
		fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
		h4: {
			fontWeight: 600,
		},
		h6: {
			fontWeight: 600,
		},
		body1: {
			fontSize: '1rem',
		},
		body2: {
			fontSize: '0.875rem',
		},
	},
	shape: {
		borderRadius: 8,
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: '#ffffff',
					color: '#1a202c',
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
				},
			},
		},
		MuiDrawer: {
			styleOverrides: {
				paper: {
					backgroundColor: '#ffffff',
					boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
					borderRight: 'none',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontWeight: 500,
					transition: 'all 0.2s ease',
					'&:hover': {
						transform: 'translateY(-1px)',
						boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
					},
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					borderRadius: 6,
					margin: '4px 8px',
					transition: 'all 0.2s ease',
					'&:hover': {
						backgroundColor: '#e6f7ff',
						transform: 'translateX(2px)',
					},
					'&.Mui-selected': {
						backgroundColor: '#e6f7ff',
						color: '#1976d2',
						fontWeight: 600,
						'&:hover': {
							backgroundColor: '#d1e9ff',
						},
					},
				},
			},
		},
	},
});

export default theme;
