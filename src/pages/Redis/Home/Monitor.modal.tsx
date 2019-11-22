/*
 * @Author: kuangdan
 * @Date: 2019-11-18 14:19:37
 * @Last Modified: 2019-11-18 14:19:37
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setDrawerVisibility from "@actions/setDrawerVisibility";

import { Drawer } from "antd";
import Iframe from "react-iframe";

function MonitorDrawer(props) {
	const { drawerVisibility, setDrawerVisibility, name, id } = props;

	useEffect(() => {
		setDrawerVisibility();
	}, []);

	const handleClose = () => {
		setDrawerVisibility();
	};

	return (
		<Drawer
			title="redis集群监控状态"
			placement="right"
			width="700px"
			closable={false}
			onClose={handleClose}
			visible={drawerVisibility.visible}
		>
			{/* 嵌入iframe */}
			<Iframe
				url={`http://10.210.0.145:3000/d-solo/QmihNwJZz/redisji-qun-tong-ji-xin-xi?orgId=1&from=1574394266859&to=1574415866859&var-cluster=${name}/${id}&theme=light&panelId=7`}
				width="450"
				height="200"
			/>
		</Drawer>
	);
}

export default connect(
	(state: any) => ({
		drawerVisibility: state.drawerVisibility
	}),
	dispatch => ({
		setDrawerVisibility: bindActionCreators(setDrawerVisibility, dispatch)
	})
)(MonitorDrawer);
