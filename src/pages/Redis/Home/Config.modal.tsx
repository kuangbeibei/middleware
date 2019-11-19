/*
 * 配置详情弹窗
 * @Author: kuangdan
 * @Date: 2019-11-18 14:18:39
 * @Last Modified: 2019-11-18 14:18:39
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setDrawerVisibility from "@actions/setDrawerVisibility";

import { Drawer, Descriptions } from "antd";

function ConfigDrawer(props) {
	const { drawerVisibility, setDrawerVisibility, data } = props;

	useEffect(() => {
		setDrawerVisibility();
	}, []);

	const handleClose = () => {
		setDrawerVisibility();
	};

	return (
		<Drawer
			title="redis集群配置信息"
			placement="right"
			width="700px"
			closable={false}
			onClose={handleClose}
			visible={drawerVisibility.visible}
		>
			<Descriptions bordered column={1}>
				{data &&
					Array.isArray(data) &&
					data.map(configItem => {
						let val = configItem.value.replace(/\n/g, "\n");
						return (
							<Descriptions.Item
								key={configItem.enName}
								label={configItem.name}
							>
								{configItem.enName === "moreConf" ||
								configItem.enName === "instances" ||
								configItem.enName === "defaultConf" ? (
									<pre>{val}</pre>
								) : (
									<span>{configItem.value || "无"}</span>
								)}
							</Descriptions.Item>
						);
					})}
			</Descriptions>
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
)(ConfigDrawer);
