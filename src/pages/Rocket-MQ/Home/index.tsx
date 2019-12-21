/*
 * @Author: kuangdan
 * @Date: 2019-11-07 18:47:37
 * @Last Modified: 2019-11-07 18:47:37
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	Button,
	Table,
	Input,
	Popconfirm,
	message,
	Select,
	Icon,
	Popover,
  Tooltip, 
} from "antd";

import { YhOp, YhAdd, YhId } from "@styled/Button";
import Loading from "@com/UI/Loading";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";
import TableTitle from "../Components/TableTitle";


import {
	getRmqComponentClusterRecords,
	createRmqComponentClusterRecord,
	deleteRmqComponentClusterRecord
} from "./service";
import { FormatTime, deepCloneObject } from "@tools";
import { rmqTypes, rmqDataPrototype } from "./data";

let addFlag = false;

function RocketMqHome(props) {
	let [loadingListCount, setLoadListCount] = useState(0);
	let [tableList, setTableList] = useState(Array());
	let [newItemName, setNewItemName] = useState("");
	let [newItemType, setNewItemType] = useState("");
	let [loading, setloading] = useState(true);
	let [delLoading, setDelLoading] = useState(false);
  let [addLoading, setAddLoading] = useState(false);

  let {
    tableModalVisibility,
    setTableModalVisibility
  } = props;

  
  let [com, setCom] = useState()

	useEffect(() => {
    console.log('kevin---->>>>>');
		getRmqComponentClusterRecords().then(tableList => {

      let fakeList = [
        {
          id: '1',
          businessName: 'MQ001',
          summary: "集群一的概要信息",
          instance: '2N4B',
          topo: '',
          tenant: 'user001',
          createTime: '2019-12-20 08:24:00',
          updateTime: '2019-12-30 09:32:00'
        },
        {
          id: '2',
          businessName: 'MQ003',
          summary: "集群二的信息",
          instance: '4N2B',
          topo: '',
          tenant: 'user002',
          createTime: '2019-12-20 12:90:00',
          updateTime: '2019-12-30 12:20:00'
        }
      ]

			setTableList(fakeList);
			setloading(false);
		});
	}, [loadingListCount]);

	/**
	 * 删除一个未创建的RMQ类型
	 */
	const delRmqType = () => {
		if (addFlag) {
			addFlag = false;
			setTableList(tableList => tableList.slice(0, -1)); // 对数组的操作一定要返回新的值
		}
	};

	/**
	 *  添加RMQ类型
	 */
	const addRmqType = () => {
		if (!addFlag) {
			addFlag = true;
			setTableList(setTableList => [
				...setTableList,
				deepCloneObject(rmqDataPrototype)
			]);
		}
	};

	/**
	 * 创建一个RMQ 类型
	 */
	const createRmqType = () => {
		setAddLoading(true);
		if (!newItemName || !newItemType)
			return message.info("请确保已填写名称并选择类型！");
		createRmqComponentClusterRecord({
			businessName: newItemName,
			componentType: newItemType
		})
			.then(() => {
				message.success(`${newItemName}集群创建成功!`);
				setLoadListCount(loadingListCount + 1);
				addFlag = false;
				setAddLoading(false);
			})
			.catch(e => {
				message.error(`${newItemName}集群创建失败!`);
				addFlag = false;
				setAddLoading(false);
			});
	};

	/**
	 * 删除RMQ集群
	 */
	const deleteRmqCluster = (id, name) => {
		setDelLoading(true);
		//先进行状态判断
		if (addFlag) {
			return message.warning("请先关闭添加集群的操作");
		}
		deleteRmqComponentClusterRecord(id)
			.then(() => {
				message.success(`${name}删除成功!`);
				setLoadListCount(loadingListCount + 1);
				setDelLoading(false);
			})
			.catch(e => {
				message.error(`${name}删除失败!`);
				setDelLoading(false);
			});
	};

	/**
	 * 获取newItemName
	 */
	const getNameWhenBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewItemName(event.currentTarget.value);
	};

	/**
	 * 获取newItemType
	 */
	const getTypeWhenChange = value => {
		setNewItemType(value);
	};

	/**
	 * 前往二级列表页
	 */
	const gotoNameServerList = (id, type) => {
		addFlag = false;
		type = type.toLowerCase();
		props.history.push(`/middleware/rocketmq/${type}/${id}`);
	};

  const gotToRocketMQClusterDetail = (id) => {
    addFlag = false;
    // addFlag = false;
		// type = type.toLowerCase();
		props.history.push(`/middleware/rocketmq/detail/${id}`);
  }

	/**
	 * table列表的展示表头
	 */
  // 字段： id 名称  概要  实例个数  拓扑 租户 创建时间  更新时间  操作
  // TODO  确认字段
	const columns = [
		{
			title: "ID",
      key: "id",
      dataIndex: 'id',
			render: text => text || ""
		},
		{
			title: "名称",
			dataIndex: "businessName",
			key: "businessName",
			width: 280,
			render: (name, record) =>
				name ? (
					<YhOp
            color = {'#0070cc'}
						onClick={() => {
              console.log(name, 'kevinkang')
              // gotoNameServerList(text.id, text.componentType);
              gotToRocketMQClusterDetail(record.id);
						}}
					>
						{name}
					</YhOp>
				) : (
					<Input
						placeholder="请输入集群名称"
						onBlur={getNameWhenBlur}
					/>
				)
    },
    // TODO 对接字段
    {
      title: "摘要",
      key: 'summary',
      dataIndex: 'summary'
    },
    // TODO 对接字段
    { 
      title: "实例个数",
      key: "instance",
      dataIndex: 'instance'
    },
    {
      title: "拓扑",
      key: "topo",
      render: text => (
				<YhOp
					// color={text.status === "done" ? null : "#999"}
					// default={text.status !== "done"}
				>
					<Tooltip placement="top" title={"集群拓扑"}>
						<Button
							type="link"
							icon="apartment"
							onClick={() =>{ showTopoModal() }}
						/>
					</Tooltip>
				</YhOp>
      )
    },
    {
      title: "租户",
      key: "tenant",
      dataIndex: 'tenant'
    },
		// {
		// 	title: "类型",
		// 	dataIndex: "componentType",
		// 	key: "componentType",
		// 	width: 280,
		// 	render: text =>
		// 		text ? (
		// 			text
		// 		) : (
		// 			<Select
		// 				style={{ width: "100%" }}
		// 				placeholder="请选择集群类型"
		// 				onChange={getTypeWhenChange}
		// 			>
		// 				{rmqTypes.map(type => (
		// 					<Select.Option key={type} value={type}>
		// 						{type}
		// 					</Select.Option>
		// 				))}
		// 			</Select>
		// 		)
		// },
		{
			title: "创建时间",
			key: "createTime",
			dataIndex: "createTime",
      // render: text => (text ? FormatTime(text) : "")
      
    },
    {
      title: "更新时间",
      key:"updateTime",
      dataIndex: 'updateTime'
      // render: time => (time ? FormatTime(time): "")
    },
		{
			title: "操作",
			key: "operation",
			render: text =>
				text.id ? (
					<Popconfirm
						placement="topRight"
						title={`确定删除集群 ${text.businessName} ?`}
						onConfirm={() =>
							deleteRmqCluster(text.id, text.businessName)
						}
						okText="是"
						cancelText="否"
					>
						<Button
							type="primary"
							shape="circle"
							icon="delete"
							loading={delLoading}
						/>
					</Popconfirm>
				) : (
					<>
						<Button
							type="primary"
							shape="circle"
							style={{ marginRight: 15 }}
							onClick={createRmqType}
							icon="check"
							loading={addLoading}
						/>
						<Button
							type="primary"
							shape="circle"
							onClick={delRmqType}
							icon="close"
						/>
					</>
				)
		}
	];


  useEffect(()=> {
    if (!tableModalVisibility.visible && com) {
      setTimeout(()=>{
        // 隐藏组件之后销毁组件
        setCom("");
      }, 0)
    }
  }, [tableModalVisibility.visible]) // 监听store里面的visible元素


  const showFormModal = async () => {
    // 动态加载
    import("./modal/Cluster.modal").then((component) => {
      console.log('加载进来了吗？？？')
      setCom(
        <component.default />
        
      )
    }).catch(e => message.error(e.message))
  }

  const showTopoModal = async () => {
    // 动态加载
    import("./modal/Topo.modal").then((component) => {
      console.log('topo')
      setCom(
        <component.default />
      )
    }).catch(e => message.error(e.message))
  }

	return (
		<>
			<YhAdd
				type="primary"
				// icon="plus"
				onClick={() => {showFormModal() }}
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
  dispatch => ({
		setTableModalVisibility: bindActionCreators(
			setTableModalVisibility,
			dispatch
		)
	})
)(RocketMqHome);
