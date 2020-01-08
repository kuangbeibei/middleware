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
	Tooltip,
	Divider,
	Menu,
	Dropdown,
	Input
} from "antd";

import { YhOp, YhAdd } from "@styled/Button";

import Loading from "@com/UI/Loading";
import StatusControl from "@com/Status.control"
import OperationControl from "@com/Operation.control"

import {
	getRedisClusters,
	deployTaskOutput,
	delCluster,
	releaseCluster,
	deployClusterApi,
	deployEntryDetail,
	checkStatus,
	getClusterDetail,
	getTenantList
} from "./service";

import { FormatTime } from "@tools";
import { useIntervalWithCondition } from "@hooks/use-interval";
import useTenants from "@hooks/use-tenants";

import {
	filterClusterStatus
} from "@funcs/Filter.status"

import { checkStatusBeforeOperate } from "@funcs/Check-status-before-action";

import "./style.less";

function RedisCluster(props) {
	const { tableModalVisibility, drawerVisibility } = props;

	let [loading, setloading] = useState(true);
	let [loadingListCount, setLoadListCount] = useState(0);
	let [tableList, setTableList] = useState(Array());
	let [com, setCom] = useState();
	// const statusTaskIds = Array();
	const [statusTaskId, setStatusTaskId] = useState("");

	let tenantList = useTenants();

	const getList = ({
		name = "",
		status = "",
		spec = "",
		tenantId = "",
		userId = ""
	}) => {
		getRedisClusters({ name, status, spec, tenantId, userId }).then(
			data => {
				setTableList(data);
				setloading(false);
			}
		);
	};

	useEffect(() => {
		getList({});
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
	 * 当添加或卸载集群时，轮询状态
	 */
	useIntervalWithCondition((timer, rely) => {
		if (timer) {
			checkStatus(rely).then(res => {
				setLoadListCount(loadListCount => loadListCount + 1);
				const {
					data: {
						status
					}
				} = res;
				if (
					status === "done" ||
					status === "failed"
				) {
					clearInterval(timer);
					timer = null;
					setStatusTaskId("")
				}
			});
		}
	}, statusTaskId);

	/**
	 * 前往redis节点列表页
	 * @param text
	 */
	const gotoInstance = (taskId, id, name) => {
		props.history.push(`/middleware/redis/${taskId}/instance`, {
			query: {
				id,
				name
			}
		});
	};

	/**
	 * 前往redis集群详情
	 * @param taskId
	 */
	const gotoDetail = (taskId, id, name) => {
		props.history.push(`/middleware/redis/${taskId}/detail`, {
			query: {
				id,
				clusterId: id,
				clusterName: name
			}
		});
	};

	/**
	 * 添加 / 编辑是打开modal
	 * @param taskId
	 */
	const showFormModal = async (taskId?) => {
		import("./Form.modal").then((component:any) => {
			if (taskId && typeof taskId === "number") {
				getClusterDetail(taskId)
					.then(data => {
						setCom(
							<component.default
								{...Object.assign(
									{},
									{
										taskId
									},
									data
								)}
								tenantRes={tenantList}
							/>
						);
					})
					.catch(e => message.error(e.message));
			} else {
				setCom(
					<component.default
						tenantRes={tenantList}
					/>
				);
			}
		});
	};

	/**
	 * 部署redis集群
	 * @param taskId
	 */
	const deployCluster = taskId => {
		message.success("正在部署...", 5);
		deployClusterApi(taskId)
			.then(res => {
				// if (res.msg === 'ok') {
				setStatusTaskId(taskId)
				// } else {
				// 	message.error(res.msg)
				// }
				// statusTaskIds.push(taskId);
				// setStatusTaskId(statusTaskIds[statusTaskIds.length - 1]);

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
					return message.warning('无日志信息');
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
					return message.error(data.msg);
				}
			})
			.catch(e => {
				// console.log('拓扑, ', e, '..', e.response && e.response.status, 'e.message,', e.message);
				if (e.response && e.response.status && e.response.status === 500) {
					message.error('集群状态异常，不能获取')
				} else {
					message.error(e.messagge)
				}
			});
	};

	/**
	 * 删除集群
	 * @param id
	 */
	const deleteCluster = (id, name?) => {
		delCluster(id)
			.then(res => {
				if (res === 'ok') {
					setLoadListCount(loadListCount => loadListCount + 1);
					message.success(`删除集群${name}成功!`);
				} else {
					message.error(res.msg || `删除集群${name}失败! `);
				}
			})
			.catch(e => message.error(e.message));
	};

	/**
	 * 卸载集群
	 * @param taskId
	 */
	const releaseClusterByTaskId = (taskId, name) => {
		releaseCluster(taskId)
			.then(res => {
				if (res === 'ok') {
					message.info(`正在卸载集群${name}...`);
					setLoadListCount(loadListCount => loadListCount + 1);
					// statusTaskIds.push(taskId);
					// setStatusTaskId(statusTaskIds[statusTaskIds.length - 1]);
					setStatusTaskId(taskId)
				} else {
					message.error(res.msg || `卸载集群${name}失败! `);
				}
			})
			.catch(e => message.error(e.message));
	};

	/**
	 * 监控状态
	 * @param type
	 * @param status
	 */
	const checkMonitorStatus = (id, name) => {
		import("./Monitor.modal").then(component => {
			setCom(<component.default name={name} id={id} />);
		});
	};

	/**
	 * 跳转到扩容页面
	 * @param type
	 * @param status
	 */
	const gotoExtension = (id, taskId) => {
		props.history.push(`/middleware/redis/${id}/extension`);
	};

	const getColumnSearchProps = dataIndex => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters
		}) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder={`搜索 ${dataIndex}`}
						value={selectedKeys[0]}
						onChange={e =>
							setSelectedKeys(e.target.value ? [e.target.value] : [])
						}
						onPressEnter={() =>
							handleSearch(selectedKeys, confirm, dataIndex)
						}
						style={{ width: 188, marginBottom: 8, display: "block" }}
					/>
					<Button
						type="primary"
						onClick={() =>
							handleSearch(selectedKeys, confirm, dataIndex)
						}
						icon="search"
						size="small"
						style={{ width: 90, marginRight: 8 }}
					>
						搜索
				</Button>
					<Button
						onClick={() => handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						重置
				</Button>
				</div>
			),
		filterIcon: filtered => (
			<Icon
				type="search"
				style={{ color: filtered ? "#1890ff" : undefined }}
			/>
		),
		onFilter: (value, record) => {
			if (dataIndex === 'status') {
				return filterClusterStatus(value, record, dataIndex)
			} else {
				return record[dataIndex]
					? record[dataIndex].toString().includes(value)
					: false
			}
		},

		onFilterDropdownVisibleChange: visible => {
			// if (visible) {
			// 	setTimeout(() => this.searchInput.select());
			// }
		},
		render: text => processColumnText(dataIndex, text)
	});

	const processColumnText = (dataIndex, text) => {
		switch (dataIndex) {
			case "name":
				return (
					<a onClick={() => gotoDetail(text.taskId, text.id, text.name)}>
						{text.name}
					</a>
				);
			case "instances":
				let num = JSON.parse(text.instances).length / 2;
				return (
					<a
						onClick={() =>
							gotoInstance(text.taskId, text.id, text.name)
						}
					>{`${num}主${num}从`}</a>
				);
			case "tenantName":
				return text.tenantName;
			case "status":
				if (text.status === 'running') {
					setStatusTaskId(text.taskId)
				}
				return <StatusControl text={text.status} />
			default:
				return text;
		}
	};

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		if (dataIndex === "instances") {
			getList({ spec: selectedKeys[0] });
		}
	};

	const handleReset = clearFilters => {
		clearFilters();
		setLoadListCount(loadListCount => loadListCount + 1);
	};

	const menu = text => {
		return (
			<Menu>
				<Menu.Item key="1">
					<a
						onClick={() =>
							checkStatusBeforeOperate("deploy", text.status)(
								text.taskId,
								text.name,
								deployCluster
							)
						}
					>
						部署
					</a>
				</Menu.Item>
				<Menu.Item key="2">
					<a
						onClick={() =>
							checkStatusBeforeOperate("extension", text.status)(
								text.id,
								text.taskId,
								gotoExtension
							)
						}
					>
						扩容
					</a>
				</Menu.Item>
				<Menu.Item key="3">
					<a
						onClick={() =>
							checkStatusBeforeOperate("edit", text.status)(
								text.taskId,
								text.name,
								showFormModal
							)
						}
					>
						编辑
					</a>
				</Menu.Item>
				<Menu.Item key="4">
					<Popconfirm
						placement="topRight"
						title={`确定卸载集群${text.name}?`}
						onConfirm={() =>
							checkStatusBeforeOperate("release", text.status)(
								text.taskId,
								text.name,
								releaseClusterByTaskId
							)
						}
						okText="是"
						cancelText="否"
					>
						<a>卸载</a>
					</Popconfirm>
				</Menu.Item>
				<Menu.Item key="5">
					<Popconfirm
						placement="topRight"
						title={`确定删除集群${text.name}?`}
						onConfirm={() =>
							checkStatusBeforeOperate("delete", text.status)(
								text.id,
								text.name,
								deleteCluster
							)
						}
						okText="是"
						cancelText="否"
					>
						<a>删除</a>
					</Popconfirm>
				</Menu.Item>
			</Menu>
		);
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
			key: "name",
			width: "24%",
			...getColumnSearchProps("name")
		},
		{
			title: "状态",
			key: "status",
			width: "13%",
			...getColumnSearchProps("status")
		},
		{
			title: "实例个数",
			key: "instances",
			width: "13%",
			...getColumnSearchProps("instances")
		},
		{
			title: "拓扑",
			key: "topology",
			width: "8%",
			render: text => (
				<YhOp
					color={text.status === "done" ? null : "#999"}
					default={text.status !== "done"}
				>
					<Tooltip placement="top" title={"集群拓扑"}>
						<Button
							type="link"
							icon="apartment"
							onClick={() =>
								checkStatusBeforeOperate(
									"mapRelations",
									text.status
								)(text.taskId, text.name, getMapRelationsInfo)
							}
						/>
					</Tooltip>
				</YhOp>
			)
		},
		{
			title: "日志",
			key: "log",
			width: "8%",
			render: text => (
				<YhOp type="info">
					<Button
						type="link"
						icon="code"
						onClick={() => checkStatusBeforeOperate(
							"log",
							text.status
						)(text.taskId, text.name, getOutput)}
					/>
				</YhOp>
			)
		},
		{
			title: "租户",
			key: "tenantName",
			width: "14%",
			...getColumnSearchProps("tenantName")
		},
		{
			title: "创建时间",
			dataIndex: "createTime",
			key: "createTime",
			width: "14%",
			render: text => FormatTime(text)
		},
		{
			title: "操作",
			key: "action",
			width: "12%",
			render: text => {
				return <OperationControl {...props} text={text} menu={menu} />
			}
		}
	];

	return (
		<>
			<YhAdd
				type="primary"
				onClick={() => showFormModal()}
				style={{ marginBottom: 10 }}
			>
				添加
			</YhAdd>

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
