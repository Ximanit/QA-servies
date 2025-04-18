// src/components/Common/Toast.jsx
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Toast = ({ open, message, severity, onClose }) => (
	<Snackbar
		open={open}
		autoHideDuration={6000}
		onClose={onClose}
		anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		sx={{
			'& .MuiSnackbarContent-root': {
				borderRadius: '8px',
				boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
			},
		}}>
		<Alert
			onClose={onClose}
			severity={severity}
			sx={{
				width: '100%',
				borderRadius: '8px',
				bgcolor: severity === 'success' ? 'success.light' : 'error.light',
				color:
					severity === 'success'
						? 'success.contrastText'
						: 'error.contrastText',
				fontWeight: 'medium',
			}}>
			{message}
		</Alert>
	</Snackbar>
);

export default Toast;
