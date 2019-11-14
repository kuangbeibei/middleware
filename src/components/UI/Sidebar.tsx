/*
 * @Author: kuangdan
 * @Date: 2019-11-12 10:26:59
 * @Last Modified: 2019-11-12 10:26:59
 */

import * as React from "react";
import { useState, useEffect } from "react";
import {connect} from "react-redux"

import { Layout, Menu, Icon } from "antd";

const { Sider } = Layout;

function SiderBar() {
	const [collapsed, setcollapsed] = useState(false);

	const onCollapse = collapsed => {
		setcollapsed(collapsed);
	};

	return (
		<Sider
			className="sidebar"
			collapsible
			collapsed={collapsed}
			onCollapse={onCollapse}
        >
            <div className="logo" />
			<Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
				<Menu.Item key="1">
					<Icon type="pie-chart" />
					<span>Option 1</span>
				</Menu.Item>
				<Menu.Item key="2">
					<Icon type="desktop" />
					<span>Option 2</span>
				</Menu.Item>
				<Menu.SubMenu
					key="sub1"
					title={
						<span>
							<Icon type="user" />
							<span>User</span>
						</span>
					}
				>
					<Menu.Item key="3">Tom</Menu.Item>
					<Menu.Item key="4">Bill</Menu.Item>
					<Menu.Item key="5">Alex</Menu.Item>
				</Menu.SubMenu>
				<Menu.SubMenu
					key="sub2"
					title={
						<span>
							<Icon type="team" />
							<span>Team</span>
						</span>
					}
				>
					<Menu.Item key="6">Team 1</Menu.Item>
					<Menu.Item key="8">Team 2</Menu.Item>
				</Menu.SubMenu>
				<Menu.Item key="9">
					<Icon type="file" />
					<span>File</span>
				</Menu.Item>
			</Menu>
		</Sider>
	);
}

export default connect(state => state)(SiderBar)