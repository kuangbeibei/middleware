/*
 * @Author: kuangdan
 * @Date: 2019-11-12 10:26:59
 * @Last Modified: 2019-11-12 10:26:59
 */

import * as React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;

import {
	MysqlRoutesMap,
	RedisRoutesMap,
	RocketmqRoutesMap
} from "@router/config";

import { deepCloneObject } from "@tools";

let mysqlRouteMenus = deepCloneObject(MysqlRoutesMap[0].menus);
let redisRouteMenus = deepCloneObject(RedisRoutesMap[0].menus);
let rocketmqMenus = deepCloneObject(RocketmqRoutesMap[0].menus);

function SiderBar(props) {
	const [menus, setmenus] = useState(Array());
	const {
		navFlagToSidebar: { navFlag }
	} = props;

	useEffect(() => {
		switch (navFlag) {
			case "mysql":
				setmenus(mysqlRouteMenus);
				break;
			case "redis":
				setmenus(redisRouteMenus);
				break;
			case "rocketmq":
				setmenus(rocketmqMenus);
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
				defaultSelectedKeys={[`/${navFlag}`]}
				selectedKeys={[props.location.pathname]}
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
