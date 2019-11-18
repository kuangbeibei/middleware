/*
 * @Author: kuangdan
 * @Date: 2019-11-18 10:22:21
 * @Last Modified: 2019-11-18 10:22:21
 */

import * as React from "react";
import { useState, useEffect } from "react";

import {
	Button,
	Table,
	Input,
	Popconfirm,
	message,
	Select,
	Icon,
	Popover,
	Tooltip
} from "antd";

import { YhOp, YhAdd } from "@styled/Button";
import {
    YHSVG
} from "@styled/svg"

import Loading from "@com/UI/Loading";

import { getRedisClusters, getConfigDetail, deployTaskOutput } from "./service";

import { FormatTime, deepCloneObject } from "@tools";

import "./style.less";

export default function(props) {
	let [loading, setloading] = useState(true);
	let [loadingListCount, setLoadListCount] = useState(0);
	let [tableList, setTableList] = useState(Array());

	useEffect(() => {
		getRedisClusters()
			.then(data => {
				setTableList(data);
				setloading(false);
			})
			.catch(e => {});
	}, [loadingListCount]);

	/**
	 * 部署redis集群
	 * @param taskId
	 */
	const deployCluster = (taskId, status) => {
        if (status === 'ready' || status === 'failed') {
            deployTaskOutput(taskId).then(res => {
                // statusTaskIds.push(taskId);
				// setStatusTaskId(statusTaskIds[statusTaskIds.length - 1]);
                message.success('正在部署...', 10)
            }).catch(e => message.error(e.message))
		} else {
			message.info('集群状态不可部署！')
		}
	};

	/**
	 * 获取redis集群配置详情接口
	 * @param taskId
	 */
	const getConfigDetailInfo = taskId => {
		getConfigDetail(taskId)
			.then(data => {})
			.catch(e => message.error(e.message));
	};

	/**
	 * 获取日志打印数据
	 * @param taskId
	 */
	const getOutput = taskId => {};

	/**
	 * 在操作前校验status
	 * @param type, status
	 */
	const checkStatusBeforeOperate = (type, status) => {
		// switch (type) {
		// 	case 'mapRelations':
		// 		if (status === 'done') {
		// 			return taskId => getMapRelationsInfo(taskId)
		// 		}
		// 		return () => {
		// 			message.info(`集群状态是${status}，无法展示拓扑图!`)
		// 		}
		// 	case 'delete':
		// 		if (status === 'release' || status === 'failed' || status === 'ready') {
		// 			return (id, name) => deleteCluster(id, name)
		// 		}
		// 		return () => {
		// 			message.info(`集群状态是${status}，无法删除!`)
		// 		}
		// 	case 'release':
		// 		if (status !== 'running' && status !== 'release' && status !== 'ready') {
		// 			return taskId => releaseCluster(taskId)
		// 		}
		// 		return () => {
		// 			message.info(`集群状态是${status}，已经释放!`)
		// 		}
		// 	default:
		// 		return () => {}
		// }
		return (id, name) => {};
	};

	/**
	 * 调取“拓扑图”接口
	 * @param taskId
	 */
	const getMapRelationsInfo = taskId => {
		// get(`/mid/v1/deployEntryDetail/redis/${taskId}`).then(res => {
		// 	try {
		// 		setDetailModalVisibility(true);
		// 		setDetail(res && res.data && res.data.data && res.data.data.nodes)
		// 	} catch (e) {
		// 		message.error(e)
		// 	}
		// }).catch(e => message.error(e))
	};

	/**
	 * 删除集群
	 * @param id
	 */
	const deleteCluster = (id, name?) => {
		// del(`/mid/v1/delete/redis/${id}`).then(res => {
		// 	if (res.data.code == 200) {
		// 		setLoadListCount(loadListCount => loadListCount + 1);
		// 		message.success(`删除集群${name}成功!`);
		// 	} else {
		// 		message.success(`删除集群${name}失败! ${res.data.msg}`)
		// 	}
		// })
	};

	/**
	 * 释放集群
	 * @param taskId
	 */
	const releaseCluster = taskId => {
		// del(`/mid/v1/releaseTaskResources/redis/${taskId}`).then(res => {
		// 	message.info(`正在释放集群${taskId}...`);
		// 	setLoadListCount(loadListCount => loadListCount + 1);
		// 	statusTaskIds.push(res.data.data.taskId);
		// 	setStatusTaskId(statusTaskIds[statusTaskIds.length - 1]);
		// }).catch(e => {
		// 	console.log('e', e, e.message)
		// })
	};

	const columns = [
		{
			title: "id",
			dataIndex: "id",
			key: "id",
			render: text => <YhOp type="info">{text}</YhOp>
		},
		{
			title: "名称",
			dataIndex: "name",
			key: "name",
			render: text => text
		},
		{
			title: "状态",
			dataIndex: "status",
			key: "status",
			render: text => text
		},
		{
			title: "配置",
			key: "config",
			render: text => (
				<YhOp
					type="info"
					onClick={() => getConfigDetailInfo(text.taskId)}
				>
					详情
				</YhOp>
			)
		},
		{
			title: "拓扑",
			key: "topology",
			render: text => (
				<YhOp
					color={text.status === "done" ? null : "#999"}
					default={text.status !== "done"}
				>
					<Tooltip placement="top" title={"集群拓扑"}>
						<Button
							type="link"
							icon="eye"
							onClick={() =>
								checkStatusBeforeOperate(
									"mapRelations",
									text.status
								)(text.taskId, text.name)
							}
						/>
					</Tooltip>
				</YhOp>
			)
        },
        {
			title: "监控状态",
			key: "monitor",
			render: text => (
				<YhOp
					color={text.status === "done" ? null : "#999"}
					default={text.status !== "done"}
				>
                    <Tooltip placement="top" title={"监控状态"}>
						<Button
							type="link"
							icon="bar-chart"
							onClick={() =>
								checkStatusBeforeOperate(
									"mapRelations",
									text.status
								)(text.taskId, text.name)
							}
						/>
					</Tooltip>
				</YhOp>
			)
		},
		{
			title: "部署日志",
			key: "log",
			render: text => (
				<YhOp type="info" onClick={() => getOutput(text.taskId)}>
					查看
				</YhOp>
			)
		},
		{
			title: "创建时间",
			dataIndex: "createTime",
			key: "createTime",
			render: text => FormatTime(text)
		},
		{
			title: "操作",
			key: "operation",
			render: text => {
				return (
					<span>
						{/* 部署 */}
						<YhOp
							color={
								text.status === "ready" ||
								text.status === "failed"
									? "#0070cc"
									: "#999"
							}
							default={text.status === "ready"}
						>
							<Tooltip placement="top" title={"部署"}>
								<Button
									type="primary"
									shape="circle"
									onClick={() =>
										deployCluster(text.taskId, text.status)
									}
									icon="build"
								/>
							</Tooltip>
						</YhOp>

						{/* 扩容 */}
						<YhOp>
							<Tooltip placement="top" title={"扩容"}>
								<Button
									type="primary"
									shape="circle"
									icon="setting"
								/>
							</Tooltip>
						</YhOp>

						{/* 编辑 */}
						<YhOp>
							<Tooltip placement="top" title={"修改"}>
								<Button
									type="primary"
									shape="circle"
									icon="form"
								/>
							</Tooltip>
						</YhOp>

						{/* 释放 */}
						<Popconfirm
							placement="topRight"
							title={`确定释放集群${text.name}?`}
							onConfirm={() =>
								checkStatusBeforeOperate(
									"release",
									text.status
								)(text.taskId, text.name)
							}
							okText="是"
							cancelText="否"
						>
							<YhOp
								color={
									text.status === "release" ||
									text.status === "running" ||
									text.status === "ready"
										? "#999"
										: null
								}
								default={text.status === "release"}
							>
								<Tooltip placement="top" title={"释放"}>
									<Button
										type="primary"
										shape="circle"
										icon="stop"
									/>
								</Tooltip>
							</YhOp>
						</Popconfirm>

						{/* 删除 */}
						<Popconfirm
							placement="topRight"
							title={`确定删除集群${text.name}?`}
							onConfirm={() =>
								checkStatusBeforeOperate("delete", text.status)(
									text.id,
									text.name
								)
							}
							okText="是"
							cancelText="否"
						>
							<YhOp
								color={
									text.status !== "failed" &&
									text.status !== "release" &&
									text.status !== "ready"
										? "#999"
										: null
								}
								default={text.status === "release"}
							>
								<Tooltip placement="top" title={"删除"}>
									<Button
										type="primary"
										shape="circle"
										icon="delete"
									/>
								</Tooltip>
							</YhOp>
						</Popconfirm>
					</span>
				);
			}
		}
	];

	return (
		<>
			<YhAdd
				type="primary"
				icon="plus"
				// onClick={addRmqType}
				style={{ marginBottom: 10 }}
			/>

			{loading ? (
				<Loading />
			) : (
				<Table columns={columns} dataSource={tableList} rowKey="id" />
			)}
		</>
	);
}
