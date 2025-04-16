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
	TextField,
} from '@mui/material';
import {
	ExpandLess,
	ExpandMore,
	Inbox,
	OpenInNew,
	Work,
	CheckCircle,
} from '@mui/icons-material';

const Sidebar = ({ items, selectedKeys, onItemClick, drawerProps }) => {
	const [openKeys, setOpenKeys] = useState([
		'open',
		'inProgress',
		'closed',
		'created',
	]);
	const [search, setSearch] = useState('');

	const handleSubmenuClick = (key) => {
		setOpenKeys((prev) =>
			prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
		);
	};

	const getIcon = (key) => {
		switch (key) {
			case 'open':
				return <OpenInNew />;
			case 'inProgress':
				return <Work />;
			case 'closed':
				return <CheckCircle />;
			case 'created':
				return <Inbox />;
			default:
				return null;
		}
	};

	const filteredItems = items.map((item) => ({
		...item,
		children: item.children.filter(
			(child) =>
				child.label?.props?.children?.[0]?.props?.children
					?.toLowerCase()
					.includes(search.toLowerCase()) || child.key === 'empty'
		),
	}));

	const renderMenuItems = (menuItems) =>
		menuItems.map((item) => {
			const isSelected = selectedKeys.includes(item.key);
			const hasChildren = item.children && item.children.length > 0;

			return (
				<React.Fragment key={item.key}>
					<ListItem disablePadding>
						<ListItemButton
							selected={isSelected}
							onClick={() => {
								if (hasChildren) {
									handleSubmenuClick(item.key);
								} else {
									onItemClick(item.key);
								}
							}}
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
		<Drawer {...drawerProps}>
			<Box sx={{ p: 2 }}>
				<TextField
					fullWidth
					variant="outlined"
					placeholder="Поиск заявок..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					size="small"
				/>
			</Box>
			<Box sx={{ overflow: 'auto', height: '100%' }}>
				<List>{renderMenuItems(filteredItems)}</List>
			</Box>
		</Drawer>
	);
};

export default Sidebar;
