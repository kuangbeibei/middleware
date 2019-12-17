/*
 * @Author: kuangdan 
 * @Date: 2019-12-16 15:02:26 
 * @Last Modified: 2019-12-16 15:02:26 
 */ 

import * as React from "react";
import { useState, useEffect } from "react";

// import { getConfigDetail } from "../Home/service";

import { Table, message, Tooltip, Button, Icon } from "antd";

import Loading from "@com/UI/Loading";

import { isEven } from "@tools";

import PasswordColumn from "../../Redis/Instance/Password-unit";
import {
	getHostList
} from "./service"

const slicePart = (str) => {
	let idx = str.lastIndexOf(".");
	return str.slice(0, idx - 2)
}

export default function(props) {
	const {
		match: {
			params: { id }
		},
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
							ip: `${item.ip}.${Math.random()}`,
							port: `${item.port}.${Math.random()}`,
							user: `${item.user}.${Math.random()}`,
							password: item.password ? `${item.password}.${Math.random()}` : ""
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
			dataIndex: "password",
			width: 250,
			key: "password",
            render: text => text ? processPass(slicePart(text)) : "无"
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
