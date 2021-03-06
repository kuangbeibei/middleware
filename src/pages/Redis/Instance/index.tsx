/*
 * @Author: kuangdan
 * @Date: 2019-11-18 10:22:21
 * @Last Modified: 2019-11-18 10:22:21
 */

import * as React from "react";
import { useState, useEffect } from "react";

import { getConfigDetail } from "../Home/service";

import { Table, message, Tooltip, Button, Icon } from "antd";

import Loading from "@com/UI/Loading";

import { isEven } from "@tools";

import PasswordColumn from "@com/Password-unit";

const slicePart = (str) => {
	let idx = str.lastIndexOf(".");
	return str.slice(0, idx - 2)
}

export default function(props) {
	const {
		match: {
			params: { taskId }
		},
		history: {
			location: {
				state: {
					query: {
						id,
						name
					}
				}
			}
		}
	} = props;

	let [loading, setloading] = useState(true);
	let [tableList, setTableList] = useState(Array());

	useEffect(() => {
		getConfigDetail(taskId)
			.then(data => {
				setloading(false);
				if (data && Array.isArray(data)) {
					let instances = data.find(
						item => item.enName === "instances"
					).value;
					
					instances = instances.map(item => {
						return {
							ip: `${item.ip}.${Math.random()}`,
							port: `${item.port}.${Math.random()}`,
							user: `${item.user}.${Math.random()}`,
							pass: `${item.pass}.${Math.random()}`
						}
					});
					setTableList(instances);
				}
			})
			.catch(e => {});
	}, []);

	/**
	 * 处理密码展示
	 * @param pass
	 */
	const processPass = pass => {
		return <PasswordColumn pass={pass} />;
	};

	/**
	 * 跳转实例监控页面
	 */
	const gotoInstanceMonitor = (ip, port) => {
		props.history.push(`/middleware/redis/${taskId}/instance/monitor`, {
			query: {
				ip,
				port,
				clusterId: id,
				clusterName: name
			}
		})
	}

	const columns = [
		{
			title: "序号",
			key: "no.",
			render: (a, b, idx) => `${idx + 1} `
		},
		{
			title: "实例IP",
			dataIndex: "ip",
			key: 'ip' ,
			render: text => slicePart(text)
		},
		{
			title: "实例port",
			dataIndex: "port",
			key: "port",
			render: text => slicePart(text)
		},
		{
			title: "角色",
			key: "role",
			render: (a, b, idx) =>
				`${isEven(idx) ? idx / 2 + 1 : Math.ceil(idx / 2)} ` +
				` - ${isEven(idx) ? "Master" : "Slave"}`
		},
		{
			title: "监控状态",
			key: "monitor",
			render: text => {
				return (
					<Tooltip placement="top" title={"监控状态"}>
						<Button type="link" icon="bar-chart" onClick={() => gotoInstanceMonitor(slicePart(text.ip), slicePart(text.port))}/>
					</Tooltip>
				)
			}
		},
		{
			title: "用户名",
			dataIndex: "user",
			key: "user",
			render: text => slicePart(text)
		},
		{
			title: "密码",
			dataIndex: "pass",
			width: 250,
			key: "pass",
			render: text => {
				return processPass(slicePart(text));
			}
		}
	];

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Table
					columns={columns}
					dataSource={tableList}
					rowKey="ip"
				/>
			)}
		</>
	);
}
