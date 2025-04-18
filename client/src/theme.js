import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#1976d2',
			light: '#42a5f5',
			dark: '#1565c0',
		},
		secondary: {
			main: '#d81b60', // Смягченный розовый для акцентов
		},
		success: {
			main: '#2e7d32', // Зеленый для успешных действий
			light: '#4caf50',
		},
		background: {
			default: '#e8ecef', // Более темный серый фон страницы
			paper: '#f9fafb', // Холодный серо-голубой для карточек
		},
		text: {
			primary: '#111827', // Темнее для основного текста
			secondary: '#6b7280', // Серый для второстепенного текста
		},
	},
	typography: {
		fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
		h4: {
			fontWeight: 600,
		},
		h5: {
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
					backgroundColor: '#f9fafb', // Соответствует карточкам
					color: '#111827',
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
				},
			},
		},
		MuiDrawer: {
			styleOverrides: {
				paper: {
					backgroundColor: '#f9fafb',
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
						transform: 'translateY(-2px)',
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
					},
				},
				containedSecondary: {
					backgroundColor: '#d81b60',
					'&:hover': {
						backgroundColor: '#c2185b',
					},
				},
				containedSuccess: {
					backgroundColor: '#2e7d32',
					'&:hover': {
						backgroundColor: '#27632a',
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					backgroundColor: '#f9fafb',
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
					transition: 'all 0.2s ease',
					'&:hover': {
						boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
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
						backgroundColor: '#e3f2fd', // Светло-синий для наведения
						transform: 'translateX(2px)',
					},
					'&.Mui-selected': {
						backgroundColor: '#e3f2fd',
						color: '#1976d2',
						fontWeight: 600,
						'&:hover': {
							backgroundColor: '#bbdefb',
						},
					},
				},
			},
		},
	},
});

export default theme;
