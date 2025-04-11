import React, { useState } from 'react';
import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Collapse,
	Box,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const Sidebar = ({ items, selectedKeys }) => {
	const [openKeys, setOpenKeys] = useState(['open']);

	const handleSubmenuClick = (key) => {
		setOpenKeys((prev) =>
			prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
		);
	};

	const renderMenuItems = (menuItems) =>
		menuItems.map((item) => {
			const isSelected = selectedKeys.includes(item.key);
			const hasChildren = item.children && item.children.length > 0;

			return (
				<React.Fragment key={item.key}>
					<ListItem disablePadding>
						<ListItemButton
							selected={isSelected}
							onClick={() => hasChildren && handleSubmenuClick(item.key)}
							sx={{ pl: 2 }}>
							{item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
							<ListItemText primary={item.label} />
							{hasChildren &&
								(openKeys.includes(item.key) ? <ExpandLess /> : <ExpandMore />)}
						</ListItemButton>
					</ListItem>
					{hasChildren && (
						<Collapse
							in={openKeys.includes(item.key)}
							timeout="auto"
							unmountOnExit>
							<List component="div" disablePadding sx={{ pl: 2 }}>
								{renderMenuItems(item.children)}
							</List>
						</Collapse>
					)}
				</React.Fragment>
			);
		});

	return (
		<Drawer
			variant="permanent"
			sx={{
				width: 200,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: 200,
					boxSizing: 'border-box',
					borderRight: 0,
					height: '100%',
					mt: '64px', // Отступ сверху для хедера
				},
			}}>
			<Box sx={{ overflow: 'auto', height: '100%' }}>
				<List>{renderMenuItems(items)}</List>
			</Box>
		</Drawer>
	);
};

export default Sidebar;
