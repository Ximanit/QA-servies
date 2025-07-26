import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Typography } from '@mui/material';

const AuthLayout = () => {
	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
			<CssBaseline />
			<Box
				component="main"
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					p: { xs: 2, sm: 3 },

					minHeight: '100vh ',
					bgcolor: 'background.paper',
					boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
				}}>
				<Box
					sx={{
						width: { xs: '100%', sm: '80%', md: '50%' },
						maxWidth: 600,
						p: { xs: 2, sm: 4 },
						bgcolor: 'background.paper',
						borderRadius: 2,
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
					}}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default AuthLayout;
