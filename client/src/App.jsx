// src/App.jsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

import store from './store/store';

import { router } from './routes';

const App = () => (
	<Provider store={store}>
		<ConfigProvider>
			<RouterProvider router={router} />
		</ConfigProvider>
	</Provider>
);

export default App;
