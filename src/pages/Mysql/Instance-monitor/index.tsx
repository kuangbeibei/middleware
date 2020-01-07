/*
 * Mysql实例监控首页
 * @Date: 2020-01-03 17:40:13
 * @Last Modified: 2020-01-03 17:40:13
 */

import * as React from "react";
import { useState, useEffect } from "react";
import Loading from "@com/UI/Loading";
import ConfigTab from "./config-tab";
import { Tabs, message } from "antd";

const { TabPane } = Tabs;

import { getHostConfig, getDbConfig } from "./service";

export default function(props) {
	const {
		location: {
			state: {
				query: { ip, port, clusterId, clusterName }
			}
		}
	} = props;

	const [loading, setloading] = useState(true);
	const [hostConfig, sethostConfig] = useState({});
	const [dbConfig, setdbConfig] = useState({})

	useEffect(() => {
		changeTab("1");
	}, []);


	const getHostConfigApi = async () => {
		return getHostConfig(clusterId, ip).then(res => {
			sethostConfig(res.data)
			return res
		}).catch(e => {})
	}

	const getDbConfigApi = async () => {
		return getDbConfig(clusterId, ip).then(res => {
			setdbConfig(res.data)
			return res
		}).catch(e => {})
	}

	const changeTab = key => {
		setloading(true);
		switch (key) {	
			case "1":
				if (Object.keys(hostConfig).length > 0 && Object.keys(dbConfig).length > 0) {
					setloading(false);
					return 
				}
				Promise.race([
					getHostConfigApi(),
					getDbConfigApi()
				])
					.then(res => {
						if (res.code === 200) {
							setloading(false);
						} 
						
					})
					.catch(e => {});
				break;
			case "2":
				break;
			default:
				setloading(false);
				break;
		}
	};

	return (
		<Tabs onChange={changeTab} type="card">
			<TabPane tab="实例配置" key="1">
				{loading ? (
					<Loading />
				) : (
					<ConfigTab {...props} host={hostConfig} db={dbConfig} />
				)}
			</TabPane>
			<TabPane tab="节点监控" key="2">
				2
			</TabPane>
			<TabPane tab="机器监控" key="3">
				3
			</TabPane>
		</Tabs>
	);
}
