import React from 'react';

import { Box, Skeleton, List, ListItem, Divider } from '@mui/material';

export default function SkeletonLayout() {
	return (
		<Box sx={{ p: { xs: 2, sm: 3 } }}>
			{/* Заголовок и кнопка */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 3,
				}}>
				<Skeleton
					variant="rectangular"
					width="100%"
					height={90}
					sx={{ borderRadius: '8px' }}
				/>
			</Box>

			<Box sx={{ display: 'flex' }}>
				<Skeleton
					variant="rectangular"
					width={250}
					height={795}
					sx={{ borderRadius: '8px', mr: 2 }}
				/>
				<Box sx={{ minWidth: 1050 }}>
					{/* Вкладки */}
					<Box>
						<Skeleton
							variant="text"
							width={200}
							height={36}
							sx={{ borderRadius: '8px', mr: 2 }}
						/>
						<Box sx={{ mb: 3, display: 'flex' }}>
							<Skeleton
								variant="text"
								width={200}
								height={36}
								sx={{ borderRadius: '8px', mr: 2 }}
							/>

							<Skeleton
								variant="text"
								width={200}
								height={36}
								sx={{ borderRadius: '8px' }}
							/>
						</Box>
					</Box>

					{/* Фильтры */}
					<Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
						<Skeleton
							variant="rectangular"
							width="100%"
							height={56}
							sx={{ maxWidth: 300 }}
						/>
						<Skeleton variant="rectangular" width={200} height={56} />
						<Skeleton variant="rectangular" width={200} height={56} />
					</Box>

					{/* Список заявок */}
					<List
						sx={{
							bgcolor: 'background.paper',
							borderRadius: '8px',
							boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
						}}>
						{[...Array(5)].map((_, index) => (
							<React.Fragment key={index}>
								<ListItem>
									<Box
										sx={{
											display: 'flex',
											width: '100%',
											alignItems: 'center',
										}}>
										<Box sx={{ flexGrow: 1 }}>
											<Skeleton
												variant="text"
												width="60%"
												height={24}
												sx={{ mb: 1 }}
											/>
											<Skeleton variant="text" width="40%" height={20} />
										</Box>
										<Box
											sx={{
												display: 'flex',
												gap: 2,
												alignItems: 'center',
											}}>
											<Skeleton
												variant="rectangular"
												width={60}
												height={24}
												sx={{ borderRadius: '4px' }}
											/>
											<Skeleton
												variant="rectangular"
												width={60}
												height={24}
												sx={{ borderRadius: '4px' }}
											/>
											<Skeleton variant="text" width={80} height={20} />
										</Box>
									</Box>
								</ListItem>
								{index < 4 && (
									<Divider sx={{ my: 1, borderColor: 'grey.200' }} />
								)}
							</React.Fragment>
						))}
					</List>
				</Box>
			</Box>
		</Box>
	);
}
