import * as React from "react";
import {
    useState,
    useEffect
} from "react";

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


function MysqlCluster(props) {

    const { tableModalVisibility, drawerVisibility } = props;

    const [loading, setloading] = useState(true);
    const [tableList, settableList] = useState(Array());
    let [loadingListCount, setLoadListCount] = useState(0);

    useEffect(() => {
        setloading(false)
    }, [loadingListCount])

    const showFormModal = () => {

    }

    const getList = ({
		name = "",
		status = "",
		spec = "",
		tenantId = "",
		userId = ""
	}) => {
		
	};

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		if (dataIndex === "instances") {
			getList({ spec: selectedKeys[0] });
		}
	};

	const handleReset = clearFilters => {
		clearFilters();
		getList({});
    };
    
    /**
	 * 前往redis集群详情
	 * @param taskId
	 */
	const gotoDetail = (taskId, id, name) => {
		
    };
    
    /**
	 * 前往redis节点列表页
	 * @param text
	 */
	const gotoInstance = (taskId, id, name) => {
		
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
		onFilter: (value, record) =>
			record[dataIndex]
				? record[dataIndex].toString().includes(value)
				: false,
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
					// setStatusTaskId(text.taskId)
				}
				return <StatusControl text={text.status} />
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
							{}
						}
					>
						部署
					</a>
				</Menu.Item>
				<Menu.Item key="2">
					<a
						onClick={() =>
							{}
						}
					>
						扩容
					</a>
				</Menu.Item>
				<Menu.Item key="3">
					<a
						onClick={() =>
							{}
						}
					>
						编辑
					</a>
				</Menu.Item>
				<Menu.Item key="4">
					<Popconfirm
						placement="topRight"
						title={`确定释放集群${text.name}?`}
						onConfirm={() =>
							{}
						}
						okText="是"
						cancelText="否"
					>
						<a>释放</a>
					</Popconfirm>
				</Menu.Item>
				<Menu.Item key="5">
					<Popconfirm
						placement="topRight"
						title={`确定删除集群${text.name}?`}
						onConfirm={() =>
							{}
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
								{}
							}
						/>
					</Tooltip>
				</YhOp>
			)
		},
		{
			title: "部署日志",
			key: "log",
			width: "8%",
			render: text => (
				<YhOp type="info">
					<Button
						type="link"
						icon="code"
						onClick={() => {}}
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
				return  <OperationControl {...props} text={text} menu={menu} />
			}
		}
    ]

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
        </>
    )
}

export default connect(
	(state: any) => ({
		tableModalVisibility: state.tableModalVisibility,
		drawerVisibility: state.drawerVisibility
	}),
	dispatch => ({})
)(MysqlCluster);