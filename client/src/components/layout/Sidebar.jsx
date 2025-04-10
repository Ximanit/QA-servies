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
	// Состояние для управления открытием/закрытием групп
	const [openGroups, setOpenGroups] = React.useState(
		items.reduce((acc, item) => {
			acc[item.key] = true; // По умолчанию все группы открыты
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
					mt: '64px', // Отступ для фиксированного хедера
					borderRight: 0, // Убираем границу, как в Ant Design
					backgroundColor: '#fff', // Белый фон для всей боковой панели
				},
			}}>
			<List disablePadding>
				{items.map((item) => (
					<React.Fragment key={item.key}>
						{/* Заголовок группы */}
						<ListItem
							disablePadding
							onClick={() => handleGroupClick(item.key)}
							sx={{
								backgroundColor: '#f0f2f5', // Серый фон для заголовков, как в первом скриншоте
								'&:hover': {
									backgroundColor: '#e6e9ed', // Легкое затемнение при наведении
								},
							}}>
							<ListItemButton
								sx={{
									py: 0.5, // Компактный вертикальный отступ
								}}>
								<ListItemText
									primary={item.label}
									primaryTypographyProps={{
										fontWeight: 'bold',
										fontSize: '0.8rem', // Меньший шрифт, как в первом скриншоте
										color: '#000', // Черный текст
									}}
								/>
								{openGroups[item.key] ? (
									<ExpandLess sx={{ fontSize: '0.9rem', color: '#8c8c8c' }} /> // Серый цвет и меньший размер
								) : (
									<ExpandMore sx={{ fontSize: '0.9rem', color: '#8c8c8c' }} />
								)}
							</ListItemButton>
						</ListItem>

						{/* Вложенные элементы */}
						<Collapse in={openGroups[item.key]} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								{item.children?.map((child) => (
									<ListItem
										key={child.key}
										disablePadding
										sx={{
											'& .Mui-selected': {
												backgroundColor: '#d9d9d9', // Серый фон для выбранного элемента, как в первом скриншоте
												'&:hover': {
													backgroundColor: '#c7c7c7', // Легкое затемнение при наведении
												},
											},
										}}>
										<ListItemButton
											component={child.path ? Link : 'div'}
											to={child.path}
											selected={selectedKeys?.includes(child.key)}
											sx={{
												pl: 3, // Меньший отступ для вложенных элементов
												py: 0.3, // Очень компактный вертикальный отступ
												backgroundColor: '#fff', // Белый фон для невыбранных элементов
												'&:hover': {
													backgroundColor: '#fafafa', // Легкий серый фон при наведении
												},
											}}>
											{child.label === 'Нет заявок' && (
												<MailOutline
													sx={{
														fontSize: '0.9rem',
														color: '#8c8c8c',
														mr: 1, // Отступ справа от иконки
													}}
												/>
											)}
											<ListItemText
												primary={child.label}
												primaryTypographyProps={{
													fontSize: '0.8rem', // Меньший шрифт, как в первом скриншоте
													color:
														child.label === 'Нет заявок' ? '#8c8c8c' : '#000', // Серый для "Нет заявок", черный для остальных
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
