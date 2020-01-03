/*
 * @Author: kuangdan
 * @Date: 2019-12-16 14:48:48
 * @Last Modified: 2019-12-16 14:48:48
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { Tabs, message } from "antd";

const { TabPane } = Tabs;

import BasicInfo from "./Basic-tab";
import BackupTab from "./Backup-tab";
import ActionsLogTab from "./Action.logs-tab";
import MonitorTab from "./Monitor-tab";
import Loading from "@com/UI/Loading";

import { getClusterDetail } from "../Home/service";
import { getActionlogs, getBackupList } from "./service";

import "./style.less";

export default function(props) {
	const {
		match: {
			params: { id }
		}
	} = props;

	const [basicData, setbasicData] = useState({});
	const [loading, setloading] = useState(true);
	const [logs, setlogs] = useState(Array());
	const [backList, setbackList] = useState(Array());

	useEffect(() => {
		changeTab("1");
	}, []);

	const changeTab = key => {
		setloading(true);
		switch (key) {
			case "1":
				if (Object.keys(basicData).length === 0) {
					getClusterDetail(id).then(data => {
						setbasicData(data);
						setloading(false);
					});
				} else {
					setloading(false);
				}
				break;
			case "2":
				if (backList.length === 0) {
					getBackupList(id)
						.then(res => {
							if (res.code === 200) {
								setbackList(res.data.history);
								setloading(false);
							} else {
								setbackList([])
								setloading(false);
								message.error(res.message)
							}
						})
						.catch(e => {
							setbackList([])
							setloading(false);
							message.error(e)
						});
				} else {
					setloading(false);
				}
				break;
			case "3":
				if (logs.length === 0) {
					getActionlogs(id).then(res => {
						if (res.code === 200) {
							setlogs(res.data.logs);
							setloading(false);
						} else {
							setlogs([]);
							setloading(false);
							message.error(res.message)
						}
					}).catch(e => {
						setlogs([]);
						setloading(false);
						message.error(e)
					});
				} else {
					setloading(false);
				}
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
			<TabPane tab="备份与恢复" key="2">
				{loading ? (
					<Loading />
				) : (
					<BackupTab
						{...props}
						backList={backList}
						basicData={basicData}
					/>
				)}
			</TabPane>
			<TabPane tab="操作日志" key="3">
				{loading ? (
					<Loading />
				) : (
					<ActionsLogTab {...props} logs={logs} />
				)}
			</TabPane>
			<TabPane tab="监控" key="4">
				{loading ? <Loading /> : <MonitorTab {...props} />}
			</TabPane>
			<TabPane tab="告警" key="5">
				告警
			</TabPane>
		</Tabs>
	);
}
