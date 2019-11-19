/*
 * @Author: kuangdan
 * @Date: 2019-11-18 10:22:21
 * @Last Modified: 2019-11-18 10:22:21
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
	Button,
	Table,
	Popconfirm,
	message,
	Icon,
	Popover,
	Tooltip
} from "antd";

import { YhOp, YhAdd } from "@styled/Button";

import Loading from "@com/UI/Loading";

import {
	getRedisClusters,
	getConfigDetail,
	deployTaskOutput,
	delCluster,
	releaseCluster,
	deployEntryDetail,
	checkStatus,
	getClusterDetail
} from "./service";

import { FormatTime } from "@tools";
import { useIntervalWithCondition } from "@hooks/use-interval";

import "./style.less";

function RedisCluster(props) {
	const { tableModalVisibility, drawerVisibility } = props;

	let [loading, setloading] = useState(true);
	let [loadingListCount, setLoadListCount] = useState(0);
	let [tableList, setTableList] = useState(Array());
	let [com, setCom] = useState();
	const statusTaskIds = Array();
	const [statusTaskId, setStatusTaskId] = useState("");

	useEffect(() => {
		getRedisClusters()
			.then(data => {
				setTableList(data);
				setloading(false);
			})
			.catch(e => {});
	}, [loadingListCount]);

	useEffect(() => {
		if (!tableModalVisibility.visible && com) {
			removeLayer();
		}
	}, [tableModalVisibility.visible]);

	useEffect(() => {
		if (!drawerVisibility.visible && com) {
			removeLayer();
		}
	}, [drawerVisibility.visible]);

	const removeLayer = () => {
		setTimeout(() => {
			setCom("");
			setLoadListCount(loadListCount => loadListCount + 1);
		}, 400);
	};

	/**
	 * 当添加或释放集群时，轮询状态
	 */
	useIntervalWithCondition((timer, rely) => {
		if (timer) {
			checkStatus(rely).then(res => {
				setLoadListCount(loadListCount => loadListCount + 1);
				if (
					res.data.data.status === "done" ||
					res.data.data.status === "failed"
				) {
					clearInterval(timer);
					timer = null;
				}
			});
		}
	}, statusTaskId);

	const showFormModal = async (taskId?) => {
		import("./Form.modal").then(component => {
			if (taskId && typeof taskId === "number") {
				getClusterDetail(taskId)
					.then(data => {
						setCom(
							<component.default
								{...Object.assign(
									{},
									{
										taskId: taskId
									},
									data
								)}
							/>
						);
					})
					.catch(e => message.error(e.message));
			} else {
				setCom(<component.default />);
			}
		});
	};

	/**
	 * 部署redis集群
	 * @param taskId
	 */
	const deployCluster = taskId => {
		deployTaskOutput(taskId)
			.then(res => {
				statusTaskIds.push(taskId);
				setStatusTaskId(statusTaskIds[statusTaskIds.length - 1]);
				message.success("正在部署...", 10);
			})
			.catch(e => message.error(e.message));
	};

	/**
	 * 获取redis集群配置详情接口
	 * @param taskId
	 */
	const getConfigDetailInfo = taskId => {
		getConfigDetail(taskId)
			.then(data => {
				if (data.data && Array.isArray(data.data)) {
					import("./Config.modal").then(component => {
						setCom(<component.default {...data} />);
					});
				} else {
					return message.error(data.msg);
				}
			})
			.catch(e => message.error(e.message));
	};

	/**
	 * 获取日志打印数据
	 * @param taskId
	 */
	const getOutput = taskId => {
		deployTaskOutput(taskId)
			.then(data => {
				if (data.loginfo) {
					import("./Log.modal").then(component => {
						setCom(<component.default {...data} />);
					});
				} else {
					return message.error(data.msg);
				}
			})
			.catch(e => message.error(e.message));
	};

	/**
	 * 调取“拓扑图”接口
	 * @param taskId
	 */
	const getMapRelationsInfo = taskId => {
		deployEntryDetail(taskId)
			.then(data => {
				if (data.nodes && Array.isArray(data.nodes)) {
					import("./Topology.modal").then(component => {
						setCom(<component.default {...data} />);
					});
				} else {
					return message.error(data.message);
				}
			})
			.catch(e => message.error(e));
	};

	/**
	 * 删除集群
	 * @param id
	 */
	const deleteCluster = (id, name?) => {
		delCluster(id)
			.then(res => {
				if (res) {
					setLoadListCount(loadListCount => loadListCount + 1);
					message.success(`删除集群${name}成功!`);
				} else {
					message.error(`删除集群${name}失败! `);
				}
			})
			.catch(e => message.error(e.message));
	};

	/**
	 * 释放集群
	 * @param taskId
	 */
	const releaseClusterByTaskId = (taskId, name) => {
		releaseCluster(taskId)
			.then(res => {
				if (res) {
					message.info(`正在释放集群${name}...`);
					setLoadListCount(loadListCount => loadListCount + 1);
					statusTaskIds.push(taskId);
					setStatusTaskId(statusTaskIds[statusTaskIds.length - 1]);
				} else {
					message.error(`释放集群${name}失败! `);
				}
			})
			.catch(e => message.error(e.message));
	};

	/**
	 * 在操作前校验status
	 * @param type
	 * @param status
	 */
	const checkStatusBeforeOperate = (type, status) => {
		switch (type) {
			case "mapRelations":
				if (status === "done") {
					return taskId => getMapRelationsInfo(taskId);
				}
				return () =>
					message.info(`集群状态是${status}，无法展示拓扑图!`);
			case "delete":
				if (
					status === "release" ||
					status === "failed" ||
					status === "ready"
				) {
					return (id, name) => deleteCluster(id, name);
				}
				return () => message.info(`集群状态是${status}，无法删除!`);
			case "release":
				if (
					status !== "running" &&
					status !== "release" &&
					status !== "ready"
				) {
					return taskId => releaseCluster(taskId);
				}
				return () => message.info(`集群状态是${status}，不可释放!`);
			case "deploy":
				if (status === "ready" || status === "failed") {
					return taskId => deployCluster(taskId);
				}
				return message.info("集群状态不可部署！");
			case "edit":
				if (status !== "done" && status !== "release") {
					return taskId => showFormModal(taskId);
				}
				return () => message.info("集群状态不可编辑");
			default:
				return () => {};
		}
	};

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			render: text => text
		},
		{
			title: "名称",
			dataIndex: "name",
			key: "name",
			render: text => <YhOp type="info">{text}</YhOp>
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
						<Tooltip placement="top" title={"部署"}>
							<YhOp>
								<Button
									type={
										text.status !== "ready" &&
										text.status !== "failed"
											? "default"
											: "primary"
									}
									shape="circle"
									onClick={() =>
										checkStatusBeforeOperate(
											"deploy",
											text.status
										)(text.taskId, text.name)
									}
									icon="build"
								/>
							</YhOp>
						</Tooltip>

						{/* 扩容 */}
						<Tooltip placement="top" title={"扩容"}>
							<YhOp>
								<Button
									type={
										text.status === "done"
											? "primary"
											: "default"
									}
									shape="circle"
									icon="setting"
								/>
							</YhOp>
						</Tooltip>

						{/* 编辑 */}
						<Tooltip placement="top" title={"修改"}>
							<YhOp>
								<Button
									type={
										text.status !== "done" &&
										text.status !== "release"
											? "primary"
											: "default"
									}
									shape="circle"
									icon="form"
									onClick={() =>
										checkStatusBeforeOperate(
											"edit",
											text.status
										)(text.taskId, text.name)
									}
								/>
							</YhOp>
						</Tooltip>

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
							<Tooltip placement="top" title={"释放"}>
								<YhOp>
									<Button
										type={
											text.status !== "running" &&
											text.status !== "release" &&
											text.status !== "ready"
												? "primary"
												: "default"
										}
										shape="circle"
										icon="stop"
									/>
								</YhOp>
							</Tooltip>
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
							<Tooltip placement="top" title={"删除"}>
								<YhOp>
									<Button
										type={
											text.status !== "release" &&
											text.status !== "failed" &&
											text.status !== "ready"
												? "default"
												: "primary"
										}
										shape="circle"
										icon="delete"
									/>
								</YhOp>
							</Tooltip>
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
				onClick={() => showFormModal()}
				style={{ marginBottom: 10 }}
			/>

			{loading ? (
				<Loading />
			) : (
				<Table columns={columns} dataSource={tableList} rowKey="id" />
			)}

			{
				// Modal
				com
			}
		</>
	);
}

export default connect(
	(state: any) => ({
		tableModalVisibility: state.tableModalVisibility,
		drawerVisibility: state.drawerVisibility
	}),
	dispatch => ({})
)(RedisCluster);
