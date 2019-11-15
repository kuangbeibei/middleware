/*
 * @Author: kuangdan
 * @Date: 2019-11-12 10:26:59
 * @Last Modified: 2019-11-12 10:26:59
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;

import {
	MiddlewarePathPrefix
} from "@utils/data"

import {
	// MysqlRoutesMap,
	// RedisRoutesMap,
	// RocketmqRoutesMap
	middlewareRouteMap
} from "@router/config";

import { deepCloneObject } from "@tools";

// let mysqlRouteMenus = deepCloneObject(MysqlRoutesMap[0].menus);
// let redisRouteMenus = deepCloneObject(RedisRoutesMap[0].menus);
// let rocketmqMenus = deepCloneObject(RocketmqRoutesMap[0].menus);
let middlewareMenus = deepCloneObject(middlewareRouteMap[0].subs);

function SiderBar(props) {
	const [menus, setmenus] = useState(Array());
	const {
		location: {
			pathname
		},
		navFlagToSidebar: { navFlag }
	} = props;

	let pathSnippets = pathname.split("/").filter(o => o);

	useEffect(() => {
		switch (navFlag) {
			case "middleware":
				setmenus(middlewareMenus);
				break;
			default:
				setmenus([]);
				break;
		}
	}, [navFlag]);

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

			<Menu
				theme="dark"
				defaultSelectedKeys={[`/middleware`]}
				selectedKeys={[`/${pathSnippets.slice(0, pathSnippets.indexOf(MiddlewarePathPrefix) + 2).join("/")}`]}
				mode="inline"
			>
				{menus.map(menu => (
					<Menu.Item key={menu.key}>
						<Link to={menu.key}>
							<Icon type={menu.icon} />
							<span>{menu.name}</span>
						</Link>
					</Menu.Item>
				))}
			</Menu>
		</Sider>
	);
}

export default connect(
	(state: any) => ({
		navFlagToSidebar: state.navFlagToSidebar
	}),
	dispatch => ({})
)(SiderBar);
