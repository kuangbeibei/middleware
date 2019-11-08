/*
 * @Author: kuangdan 
 * @Date: 2019-11-07 18:47:37 
 * @Last Modified: 2019-11-07 18:47:37 
 */ 

import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	Descriptions,
	Drawer,
	Button,
	Divider,
	Table,
	Modal,
	Form,
	Input,
	Popconfirm,
	message,
	Select,
	Icon,
	Popover,
	Tooltip,
	Row,
	Col
} from "antd";

import { YhOp, YhAdd } from "@styled/Button";

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

	useEffect(() => {
		getRmqComponentClusterRecords().then(tableList => {
			setTableList(tableList);
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
        if (!newItemName || !newItemType) return message.info('请确保已填写名称并选择类型！')
		createRmqComponentClusterRecord({
			businessName: newItemName,
			componentType: newItemType
		})
			.then(() => {
				message.success(`${newItemName}集群创建成功!`);
				setLoadListCount(loadingListCount + 1);
				addFlag = false;
			})
			.catch(e => {
				message.error(`${newItemName}集群创建失败!`);
				addFlag = false;
			});
	};

	/**
	 * 删除RMQ集群
	 */
	const deleteRmqCluster = (id, name) => {
		//先进行状态判断
		if (addFlag) {
			return message.warning("请先关闭添加集群的操作");
		}
		deleteRmqComponentClusterRecord(id)
			.then(() => {
				message.success(`${name}删除成功!`);
				setLoadListCount(loadingListCount + 1);
			})
			.catch(e => {
				message.error(`${name}删除失败!`);
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
		props.history.push(`/rocketmq/${type}/${id}`);
	}
	
	/**
	 * table列表的展示表头
	 */
	const columns = [
		{
			title: "id",
			key: "id",
			render: text => <YhOp onClick={() => {
				gotoNameServerList(text.id, text.componentType)
			}}>{text.id}</YhOp> || ""
		},
		{
			title: "名称",
			dataIndex: "businessName",
			key: "businessName",
			width: 280,
			render: text =>
				text ? (
					text
				) : (
					<Input
						placeholder="请输入集群名称"
						onBlur={getNameWhenBlur}
					/>
				)
		},
		{
			title: "类型",
			dataIndex: "componentType",
			key: "componentType",
			width: 280,
			render: text =>
				text ? (
					text
				) : (
					<Select
						style={{ width: "100%" }}
						placeholder="请选择集群类型"
						onChange={getTypeWhenChange}
					>
						{rmqTypes.map(type => (
							<Select.Option key={type} value={type}>
								{type}
							</Select.Option>
						))}
					</Select>
				)
		},
		{
			title: "创建时间",
			key: "createTime",
			dataIndex: "createTime",
			render: text => (text ? FormatTime(text) : "")
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
						<Button type="primary" shape="circle">
							<Icon type="delete" />
						</Button>
					</Popconfirm>
				) : (
					<>
						<Button
							type="primary"
							shape="circle"
							style={{ marginRight: 15 }}
							onClick={createRmqType}
						>
							<Icon type="check" />
						</Button>
						<Button
							type="primary"
							shape="circle"
							onClick={delRmqType}
						>
							<Icon type="close" />
						</Button>
					</>
				)
		}
	];

	return (
		<>
            <YhAdd type="primary" icon="plus" onClick={addRmqType} style={{marginBottom: 10}}/>
			<Table columns={columns} dataSource={tableList} rowKey="id" />
		</>
	);
}

export default connect()(RocketMqHome);
