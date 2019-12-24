/*
 * @Author: kuangdan
 * @Date: 2019-12-16 14:48:48
 * @Last Modified: 2019-12-16 14:48:48
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

import BasicInfo from "./Tab-Content/BasicInfo";
import Alarm from './Tab-Content/Alarm';
import Monitor from './Tab-Content/Monitor'
import Loading from "@com/UI/Loading";
import './detail.less'

// import { getClusterDetail } from "../Home/service";

export default function(props) {
	const {
		match: {
			params: { id }
		}
	} = props;

	const [basicData, setbasicData] = useState(Array());
	const [loading, setloading] = useState(true);

	useEffect(() => {
		changeTab("1");
	}, []);

	const changeTab = key => {
		setloading(true);
		switch (key) {
			case "1":
				// if (basicData.length === 0) {
				// 	getClusterDetail(id).then(data => {
				// 		setbasicData(data);
				// 		setloading(false);
				// 	});
				// } else {
				// 	setloading(false);
        // }
				setloading(false);        
				break;
			case "2":
				setloading(false);
				break;
			case "3":
				setloading(false);
				break;
			default:
				setloading(false);
				break;
		}
	};

	return (
		<Tabs onChange={changeTab} type="card">
			<TabPane tab="集群基本信息" key="1">
				{loading ? (
					<Loading />
				) : (
					<BasicInfo basicData={basicData} {...props} />
				)}
			</TabPane>
			<TabPane tab="监控" key="2">
				{loading ? (
					<Loading />
				) : (
          <Monitor />
					// <BackupTab basicData={basicData} {...props} />
				)}
			</TabPane>
			<TabPane tab="告警" key="3">
				{loading ? <Loading /> : <Alarm/>}
			</TabPane>

		</Tabs>
	);
}
