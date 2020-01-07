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

import Loading from "@com/UI/Loading";

import { YhOp, YhAdd } from "@styled/Button";

import StatusControl from "@com/Status.control";
import OperationControl from "@com/Operation.control";

import { FormatTime } from "@tools";
import { useIntervalWithCondition } from "@hooks/use-interval";
import useTenants from "@hooks/use-tenants";

import {
	getMysqlClusters,
	getClusterDetail,
	deployCluster,
	unload,
	deleteCluster,
	showtopology,
	showClusterFullOutput,
	switchRole
} from "./service";

import { getTenantList } from "../../Redis/Home/service";

import { filterClusterStatus } from "@funcs/Filter.status";

import { filterKeywordswithChinese } from "@funcs/Filter.Ch";

import { myslqClustersTypes } from "./data";

import { checkStatusBeforeOperate } from "@funcs/Check-status-before-action";

function MysqlCluster(props) {
	const { tableModalVisibility, history } = props;
	let tenantList = useTenants();

	const [loading, setloading] = useState(true);
	const [tableList, setTableList] = useState(Array());
	let [loadingListCount, setLoadListCount] = useState(0);
	let [com, setCom] = useState();

	useEffect(() => {
		getList({});
	}, [loadingListCount]);

	useEffect(() => {
		if (!tableModalVisibility.visible && com) {
			removeLayer();
		}
	}, [tableModalVisibility.visible]);

	const removeLayer = () => {
		setTimeout(() => {
			setCom("");
			setLoadListCount(loadListCount => loadListCount + 1);
		}, 400);
	};

	/**
	 * 获取列表
	 * @param param
	 */
	const getList = ({
		name = "",
		status = "",
		type = "",
		tenantId = "",
		userId = ""
	}) => {
		getMysqlClusters({ name, status, type, tenantId, userId }).then(
			data => {
				setTableList(data.clusters);
				setloading(false);
			}
		);
	};

	/**
	 * 卸载集群
	 * @param id 
	 */
	const unloadAction = id => {
		unload(id)
			.then(msg => {
				if (msg === "ok") {
					getList({});
					message.success(`集群${id} 卸载成功`);
				} else {
					message.error(`${msg}`);
				}
			})
			.catch(e => message.error(e.message));
	};

	/**
	 * 删除集群
	 * @param id
	 */
	const deleteAction = id => {
		deleteCluster(id)
			.then(msg => {
				if (msg === "ok") {
					getList({});
					message.success(`集群${id} 删除成功`);
				} else {
					message.error(`${msg}`);
				}
			})
			.catch(e => message.error(e.message));
	};

	/**
	 * 部署集群
	 * @param id
	 */
	const depolyAction = id => {
		deployCluster(id)
			.then(msg => {
				getList({});
			})
			.catch(e => message.error(e.message));
	};

	const showFormModal = async (id?) => {
		import("./Form.modal").then((component:any) => {
			if (id && typeof id === "number") {
				setCom(
					<component.default
						tenantRes={tenantList}
						id={id}
					/>
				);
			} else {
				setCom(
					<component.default
						tenantRes={tenantList}
					/>
				);
			}
		});
	};

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
	};

	const handleReset = clearFilters => {
		clearFilters();
		setLoadListCount(loadListCount => loadListCount + 1);
	};

	/**
	 * 前往mysql集群详情
	 * @param taskId
	 */
	const gotoDetail = id => {
		history.push(`/middleware/mysql/${id}/detail`);
	};

	/**
	 * 前往mysql节点列表页
	 * @param text
	 */
	const gotoInstance = (id, name) => {
		history.push(`/middleware/mysql/${id}/instance`, {
			query: {
				name
			}
		});
	};

	/**
	 * 调取“拓扑图”接口
	 * @param taskId
	 */
	const getMapRelationsInfo = id => {
		showtopology(id)
			.then(res => {
				if (res.message === "ok") {
					import("./Topology.modal").then((component:any) => {
						setCom(
							<component.default
								data={res.data}
							/>
						);
					});
				} else {
					message.error(res.message);
				}
			})
			.catch(e => message.error(e.message));
	};

	/**
	 * 展示部署日志
	 * @param id 
	 */
	const getOutput = id => {
		showClusterFullOutput(id)
			.then(res => {
				if (res.code === 200) {
					if (Array.isArray(res.data) && res.data.length > 0) {
						import("./Log.modal").then((component: any) => {
							setCom(
								<component.default
									loginfo={res.data}
									{...props}
								/>
							);
						});
					} else {
						message.warning("暂无日志信息");
					}
				} else {
					message.error(res.message);
				}
			})
			.catch(e => message.error(e));
	};

	const gotoSwitchRole = id => {
		switchRole(id)
			.then(res => {
				if (res.code === 200) {
					setLoadListCount(loadListCount => loadListCount + 1);
				} else {
					message.error(res.message);
				}
			})
			.catch(e => message.error(e));
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
			if (dataIndex === "status") {
				return filterClusterStatus(value, record, dataIndex);
			} else if (dataIndex === "type") {
				return typeof filterKeywordswithChinese(
					value,
					record,
					dataIndex
				) === "function"
					? filterKeywordswithChinese(
							value,
							record,
							dataIndex
					  )(myslqClustersTypes, "text")
					: filterKeywordswithChinese(value, record, dataIndex);
			} else {
				return record[dataIndex]
					? record[dataIndex].toString().includes(value)
					: false;
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
				return <a onClick={() => gotoDetail(text.id)}>{text.name}</a>;
			case "type":
				return text === "ha" ? "主从复制" : "InnodbCluster";
			case "tenantName":
				return text.tenantName;
			case "status":
				if (text.status === "running") {
					// setStatusTaskId(text.taskId)
				}
				return <StatusControl text={text.status} />;
			default:
				return text;
		}
	};

	const menu = text => {
		return (
			<Menu>
				<Menu.Item key="1">
					<a
						onClick={() =>
							checkStatusBeforeOperate("deploy", text.status)(
								text.id,
								text.name,
								depolyAction
							)
						}
					>
						部署
					</a>
				</Menu.Item>
				<Menu.Item key="2">
					<a
						onClick={() =>
							checkStatusBeforeOperate("edit", text.status)(
								text.id,
								text.name,
								showFormModal
							)
						}
					>
						编辑
					</a>
				</Menu.Item>
				<Menu.Item key="3">
					<Popconfirm
						placement="topRight"
						title={`确定卸载集群${text.name}?`}
						onConfirm={() =>
							checkStatusBeforeOperate("release", text.status)(
								text.id,
								text.name,
								unloadAction
							)
						}
						okText="是"
						cancelText="否"
					>
						<a>卸载</a>
					</Popconfirm>
				</Menu.Item>
				<Menu.Item key="4">
					<Popconfirm
						placement="topRight"
						title={`确定删除集群${text.name}?`}
						onConfirm={() =>
							checkStatusBeforeOperate("delete", text.status)(
								text.id,
								text.name,
								deleteAction
							)
						}
						okText="是"
						cancelText="否"
					>
						<a>删除</a>
					</Popconfirm>
				</Menu.Item>
				<Menu.Item key="5">
					<a>慢查询</a>
				</Menu.Item>
				{text.instances.length === 2 ? (
					<Menu.Item key="6">
						<a onClick={() => gotoSwitchRole(text.id)}>主从切换</a>
					</Menu.Item>
				) : null}
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
			width: "18%",
			...getColumnSearchProps("name")
		},
		{
			title: "状态",
			key: "status",
			width: "10%",
			...getColumnSearchProps("status")
		},
		{
			title: "类型",
			dataIndex: "type",
			key: "type",
			width: "10%",
			...getColumnSearchProps("type")
		},
		{
			title: "实例个数",
			key: "instances",
			width: "8%",
			render: text => (
				<a onClick={() => gotoInstance(text.id, text.name)}>
					{text.instances.length === 2 ? "1主1从" : "1主2从"}
				</a>
			)
		},
		{
			title: "拓扑",
			key: "topology",
			width: "10%",
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
								)(text.id, text.name, getMapRelationsInfo)
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
						onClick={() =>
							checkStatusBeforeOperate("log", text.status)(
								text.id,
								text.name,
								getOutput
							)
						}
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
			dataIndex: "ctime",
			key: "ctime",
			width: "16%",
			render: text => FormatTime(text)
		},
		{
			title: "操作",
			key: "action",
			width: "16%",
			render: text => {
				return <OperationControl {...props} text={text} menu={menu} />;
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

			{com}
		</>
	);
}

export default connect(
	(state: any) => ({
		tableModalVisibility: state.tableModalVisibility,
		drawerVisibility: state.drawerVisibility
	}),
	dispatch => ({})
)(MysqlCluster);
