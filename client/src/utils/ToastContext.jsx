import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
	const [toasts, setToasts] = useState([]);

	const showToast = (message, severity = 'success') => {
		const id = Date.now(); // Уникальный ID для тоста
		setToasts((prev) => [...prev, { id, message, severity, open: true }]);
	};

	const closeToast = (id) => {
		setToasts((prev) =>
			prev.map((toast) => (toast.id === id ? { ...toast, open: false } : toast))
		);
		// Удаляем тост после анимации закрытия
		setTimeout(() => {
			setToasts((prev) => prev.filter((toast) => toast.id !== id));
		}, 600);
	};

	return (
		<ToastContext.Provider value={{ showToast, closeToast }}>
			{children}
			{toasts.map((toast) => (
				<Snackbar
					key={toast.id}
					open={toast.open}
					autoHideDuration={3000}
					onClose={() => closeToast(toast.id)}
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
					<Alert
						onClose={() => closeToast(toast.id)}
						severity={toast.severity}
						sx={{ width: '100%' }}>
						{toast.message}
					</Alert>
				</Snackbar>
			))}
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error('useToast must be used within a ToastProvider');
	}
	return context;
};
