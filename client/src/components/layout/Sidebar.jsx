import React from 'react';
import { Menu, Layout } from 'antd';

const Sidebar = ({ items, selectedKeys }) => (
	<Layout.Sider width={200}>
		<Menu
			mode="inline"
			selectedKeys={[selectedKeys]}
			defaultOpenKeys={['open']}
			style={{ height: '100%', borderRight: 0 }}
			items={items}
		/>
	</Layout.Sider>
);

export default Sidebar;
