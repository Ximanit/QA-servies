// src/App.jsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store';

import { router } from './routes';
import { ToastProvider } from './utils/ToastContext';

const App = () => (
	<Provider store={store}>
		<ToastProvider>
			<RouterProvider router={router} />
		</ToastProvider>
	</Provider>
);

export default App;
