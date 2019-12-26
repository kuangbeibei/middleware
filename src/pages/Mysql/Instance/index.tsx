/*
 * @Author: kuangdan
 * @Date: 2019-12-16 15:02:26
 * @Last Modified: 2019-12-16 15:02:26
 */

import * as React from "react";
import { useState, useEffect } from "react";

// import { getConfigDetail } from "../Home/service";

import { Table, message, Tooltip, Button, Icon, Menu } from "antd";

import Loading from "@com/UI/Loading";

import { isEven } from "@tools";
import { YhOp, YhAdd } from "@styled/Button";

import PasswordColumn from "@com/Password-unit";
import StatusControl from "@com/Status.control";
import OperationControl from "@com/Operation.control";

import { getHostList } from "./service";

const slicePart = str => {
	let idx = str.lastIndexOf(".");
	return str.slice(0, idx - 2);
};

export default function(props) {
	const {
		match: {
			params: { id }
		}
	} = props;

	let [loading, setloading] = useState(true);
	let [tableList, setTableList] = useState(Array());

	useEffect(() => {
		getHostList(id)
			.then(data => {
				setloading(false);
				if (data && Array.isArray(data)) {
					data = data.map(item => {
						return {
							...item,
							ip: `${item.ip}.${Math.random()}`,
							port: `${item.port}.${Math.random()}`,
							user: `${item.user}.${Math.random()}`,
							password: item.password
								? `${item.password}.${Math.random()}`
								: "",
						}
					});
					setTableList(data);
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
		// props.history.push(`/middleware/redis/${taskId}/instance/monitor`, {
		// 	query: {
		// 		ip,
		// 		port,
		// 		clusterId: id,
		// 		clusterName: name
		// 	}
		// })
	};

	const menu = text => {
		return (
			<Menu>
				<Menu.Item key="1">
					<a onClick={() => {}}>主机配置</a>
				</Menu.Item>
				<Menu.Item key="2">
					<a onClick={() => {}}>DB配置</a>
				</Menu.Item>
			</Menu>
		);
	};

	const columns = [
		{
			title: "序号",
			key: "no.",
			render: (a, b, idx) => `${idx + 1} `
		},
		{
			title: "实例IP",
			dataIndex: "ip",
			key: "ip",
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
			dataIndex: "role",
			key: "role",
			render: text => text
		},
		{
			title: "用户名",
			dataIndex: "user",
			key: "user",
			render: text => slicePart(text)
		},
		{
			title: "密码",
			dataIndex: "password",
			key: "password",
			render: text => (text ? processPass(slicePart(text)) : "无")
		},
		{
			title: "监控状态",
			key: "monitor",
			render: text => {
				return (
					<Tooltip placement="top" title={"监控状态"}>
						<Button
							type="link"
							icon="bar-chart"
							onClick={() =>
								gotoInstanceMonitor(
									slicePart(text.ip),
									slicePart(text.port)
								)
							}
						/>
					</Tooltip>
				);
			}
		},
		// {
		// 	title: "日志",
		// 	key: "log",
		// 	width: "8%",
		// 	render: text => (
		// 		<YhOp type="info">
		// 			<Button type="link" icon="code" onClick={() => {}} />
		// 		</YhOp>
		// 	)
		// },
		{
			title: "操作",
			key: "action",
			render: text => {
				return <OperationControl {...props} text={text} menu={menu} />;
			}
		}
	];

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Table columns={columns} dataSource={tableList} rowKey="ip" />
			)}
		</>
	);
}
