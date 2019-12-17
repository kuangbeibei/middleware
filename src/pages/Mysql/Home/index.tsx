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

import { getMysqlClusters, getClusterDetail } from "./service";

import { getTenantList } from "../../Redis/Home/service";

import { filterClusterStatus } from "@funcs/Filter.status";

function MysqlCluster(props) {
	const { tableModalVisibility, drawerVisibility, history } = props;

	const [loading, setloading] = useState(true);
	const [tableList, setTableList] = useState(Array());
	let [loadingListCount, setLoadListCount] = useState(0);
	let [com, setCom] = useState();
	const [tenantRes, settenantRes] = useState(Array());

	useEffect(() => {
		getList({});
	}, [loadingListCount]);

	useEffect(() => {
		getTenantList().then(data => {
			settenantRes(data);
		});
	}, []);

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

	// 获取集群列表
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

	const showFormModal = async (id?) => {
		import("./Form.modal").then(component => {
			if (id && typeof id === "number") {
				setCom(
					<component.default
						{...Object.assign({})}
						tenantRes={tenantRes}
						id={id}
					/>
				);
			} else {
				setCom(
					<component.default
						{...Object.assign({})}
						tenantRes={tenantRes}
					/>
				);
			}
		});
	};

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		if (dataIndex === "hosts") {
			// getList({ spec: selectedKeys[0] });
		}
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
	const gotoInstance = id => {
		history.push(`/middleware/mysql/${id}/instance`);
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
				return (
					<a
						onClick={() =>
							gotoDetail(text.id)
						}
					>
						{text.name}
					</a>
				);
			case "hosts":
				return <a onClick={() =>
							gotoInstance(text.id)
						}>{
					text.hosts.length === 2 ? "1主1从" : "1主2从"
				}</a>;
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
					<a onClick={() => {}}>部署</a>
				</Menu.Item>
				<Menu.Item key="2">
					<a
						onClick={() => {
							showFormModal(text.id);
						}}
					>
						编辑
					</a>
				</Menu.Item>
				<Menu.Item key="3">
					<Popconfirm
						placement="topRight"
						title={`确定释放集群${text.name}?`}
						onConfirm={() => {}}
						okText="是"
						cancelText="否"
					>
						<a>释放</a>
					</Popconfirm>
				</Menu.Item>
				<Menu.Item key="4">
					<Popconfirm
						placement="topRight"
						title={`确定删除集群${text.name}?`}
						onConfirm={() => {}}
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
			width: "20%",
			...getColumnSearchProps("name")
		},
		{
			title: "状态",
			key: "status",
			width: "13%",
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
			key: "hosts",
			width: "13%",
			...getColumnSearchProps("hosts")
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
							onClick={() => {}}
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
					<Button type="link" icon="code" onClick={() => {}} />
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
