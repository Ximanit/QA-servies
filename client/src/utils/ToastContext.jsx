// src/utils/ToastContext.jsx
import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Common/Toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
	const [toasts, setToasts] = useState([]);

	const showToast = (message, severity = 'success') => {
		const id = Date.now();
		setToasts((prev) => [...prev, { id, message, severity, open: true }]);
	};

	const closeToast = (id) => {
		setToasts((prev) =>
			prev.map((toast) => (toast.id === id ? { ...toast, open: false } : toast))
		);
		setTimeout(() => {
			setToasts((prev) => prev.filter((toast) => toast.id !== id));
		}, 600);
	};

	return (
		<ToastContext.Provider value={{ showToast, closeToast }}>
			{children}
			{toasts.map((toast) => (
				<Toast
					key={toast.id}
					open={toast.open}
					message={toast.message}
					severity={toast.severity}
					onClose={() => closeToast(toast.id)}
				/>
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
