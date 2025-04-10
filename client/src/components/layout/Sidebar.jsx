// src/components/layout/Sidebar.jsx
import React from 'react';
import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Collapse,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ExpandLess, ExpandMore, MailOutline } from '@mui/icons-material';

const Sidebar = ({ items, selectedKeys }) => {
	const [openGroups, setOpenGroups] = React.useState(
		items.reduce((acc, item) => {
			acc[item.key] = true;
			return acc;
		}, {})
	);

	const handleGroupClick = (key) => {
		setOpenGroups((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	return (
		<Drawer
			variant="permanent"
			sx={{
				width: 200,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: 200,
					boxSizing: 'border-box',
					mt: '64px',
					borderRight: '1px solid #e0e0e0', // Добавляем правую границу
					boxShadow: '2px 0 5px rgba(0, 0, 0, 0.05)', // Лёгкая тень для глубины
					backgroundColor: '#fff',
				},
			}}>
			<List disablePadding>
				{items.map((item) => (
					<React.Fragment key={item.key}>
						<ListItem
							disablePadding
							onClick={() => handleGroupClick(item.key)}
							sx={{
								backgroundColor: '#f0f2f5',
								'&:hover': {
									backgroundColor: '#e6e9ed',
								},
							}}>
							<ListItemButton sx={{ py: 0.5 }}>
								<ListItemText
									primary={item.label}
									primaryTypographyProps={{
										fontWeight: 'bold',
										fontSize: '0.8rem',
										color: '#000',
									}}
								/>
								{openGroups[item.key] ? (
									<ExpandLess sx={{ fontSize: '0.9rem', color: '#8c8c8c' }} />
								) : (
									<ExpandMore sx={{ fontSize: '0.9rem', color: '#8c8c8c' }} />
								)}
							</ListItemButton>
						</ListItem>
						<Collapse in={openGroups[item.key]} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								{item.children?.map((child) => (
									<ListItem
										key={child.key}
										disablePadding
										sx={{
											'& .Mui-selected': {
												backgroundColor: '#d9d9d9',
												'&:hover': {
													backgroundColor: '#c7c7c7',
												},
											},
										}}>
										<ListItemButton
											component={child.path ? Link : 'div'}
											to={child.path}
											selected={selectedKeys?.includes(child.key)}
											sx={{
												pl: 3,
												py: 0.3,
												backgroundColor: '#fff',
												'&:hover': {
													backgroundColor: '#fafafa',
												},
											}}>
											{child.label === 'Нет заявок' && (
												<MailOutline
													sx={{
														fontSize: '0.9rem',
														color: '#8c8c8c',
														mr: 1,
													}}
												/>
											)}
											<ListItemText
												primary={child.label}
												primaryTypographyProps={{
													fontSize: '0.8rem',
													color:
														child.label === 'Нет заявок' ? '#8c8c8c' : '#000',
												}}
											/>
										</ListItemButton>
									</ListItem>
								))}
							</List>
						</Collapse>
					</React.Fragment>
				))}
			</List>
		</Drawer>
	);
};

export default Sidebar;
