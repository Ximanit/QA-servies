// src/pages/StatsPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import StatsComponent from '../features/stats/components/StatsComponent';

const StatsPage = () => {
	const userId = useSelector((state) => state.auth.id);

	return <StatsComponent userId={userId} />;
};

export default StatsPage;
