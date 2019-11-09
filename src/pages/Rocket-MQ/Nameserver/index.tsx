import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import setTableModalVisibility from "@actions/setModalVisibility"

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

import ConfigDrawer from "@com/Drawer";
import { YhOp, YhAdd } from "@styled/Button";
import { FormatTime, deepCloneObject } from "@tools";

import FormMdal from "./form-modal"

import {
	getDeployListOfRmqNameServer,
	deployTask,
	releaseTaskResources,
    getConfigInfo,
    deployTaskOutput
} from "./service";

import { rmqNameServerPrototype, rmqNameServerVersions } from "./data";

function RmqNameServer(props) {
	const {
		match: {
			params: { id }
        },
        setTableModalVisibility
	} = props;

	let [loadingListCount, setLoadListCount] = useState(0);
	let [tableList, setTableList] = useState(Array());

	// let [visibility, setvisibility] = useState(false);
	let [configVisibility, setconfigVisibility] = useState(false);

    let [configInfo, setconfigInfo] = useState(Array());
    let [loginfo, setloginfo] = useState("")

	let [postParams, setpostParams] = useState(
		deepCloneObject(rmqNameServerPrototype)
	);
	let { params } = postParams;

	useEffect(() => {
		getDeployListOfRmqNameServer(id)
			.then(data => {
				setTableList(data);
			})
			.catch();
	}, [loadingListCount]);

	/**
	 * 释放
	 */
	const delNameserver = (taskId, status) => {
		releaseTaskResources(taskId)
			.then(res => {
				message.success(`删除成功！`);
				setLoadListCount(loadingListCount + 1);
			})
			.catch(e => message.error(e.message));
	};

	/**
	 * 添加Modal
	 */
	const addNameServer = () => {
        // setvisibility(true);
        setTableModalVisibility();
	};

	/**
	 * 创建
	 */
	// const handleOk = () => {
	// 	const {
	// 		form: { getFieldsValue, validateFields }
	// 	} = props;
	// 	validateFields(err => {
	// 		if (err) return message.warning(`信息填写不完全!`);

	// 		let deployData = Object.assign(
	// 			{},
	// 			{
	// 				params: Object.assign(
	// 					{},
	// 					{
	// 						rmqComponentClusterId: Number(id)
	// 					},
	// 					{ ...getFieldsValue().params }
	// 				)
	// 			},
	// 			{
	// 				type: "rmqNameServer"
	// 			}
	// 		);
	// 		deployData.params.port = Number(deployData.params.port);

	// 		deployTask(deployData)
	// 			.then(() => {
	// 				message.success(`NameServer创建成功`);
	// 				initFormModal();
	// 				setLoadListCount(loadingListCount + 1);
	// 			})
	// 			.catch(e => message.error(e.message));
	// 	});
	// };

	/**
	 * 关闭弹窗
	 */
	// const handleCancel = () => {
	// 	initFormModal();
	// 	setvisibility(false);
	// };

	/**
	 * 初始化表单
	 */
	const initFormModal = () => {
		const {
			form: { resetFields }
		} = props;
		resetFields();
		// setvisibility(false);
	};

	/**
	 * 查看日志
	 */
    const checkLog = (taskId) => {
        deployTaskOutput(taskId).then(res => {

        }).catch(e => message.error(e.message))
    };

	/**
	 * 查看配置
	 */
	const checkConfig = taskId => {
		getConfigInfo(taskId)
			.then(data => {
				setconfigInfo(data);
				setconfigVisibility(true);
			})
			.catch(e => message.error(e.message));
	};

	/**
	 * 显示配置信息
	 */
	const showConfigDetailInfo = () => {
		return configInfo.map(configItem => {
			let val = configItem.value.replace(/\n/g, "\n");
			return (
				<Descriptions.Item
					key={configItem.enName}
					label={configItem.name}
				>
					{configItem.enName === "moreConf" ||
					configItem.enName === "instances" ? (
						<pre>{val}</pre>
					) : (
						<YhOp>{configItem.value || "无"}</YhOp>
					)}
				</Descriptions.Item>
			);
		});
	};

	/**
	 * 关闭配置信息
	 */
	const closeDrawer = () => {
		setconfigInfo([]);
		setconfigVisibility(false);
	};

	const columns = [
		{
			title: "id",
			key: "id",
			dataIndex: "id",
			render: text => <YhOp>{text}</YhOp>
		},
		{
			title: "IP",
			dataIndex: "ip",
			key: "ip",
			render: text => text
		},
		{
			title: "PORT",
			dataIndex: "port",
			key: "port",
			render: text => text
		},
		{
			title: "状态",
			key: "status",
			dataIndex: "status",
			render: text => text
		},
		{
			title: "日志",
			key: "log",
			render: text => <YhOp onClick={() => checkLog(text.taskId)}>日志信息</YhOp>
		},
		{
			title: "配置",
			key: "config",
			render: text => (
				<YhOp onClick={() => checkConfig(text.taskId)}>配置信息</YhOp>
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
			render: text => (
				<>
					<Button
						type="primary"
						shape="circle"
						style={{ marginRight: 10 }}
					>
						<Icon type="caret-right" theme="filled" />
					</Button>

					<Popconfirm
						placement="topRight"
						title={`确定删除NameServer: ${text.ip} ?`}
						onConfirm={() =>
							delNameserver(text.taskId, text.status)
						}
						okText="是"
						cancelText="否"
					>
						<Button type="primary" shape="circle">
							<Icon type="delete" />
						</Button>
					</Popconfirm>
				</>
			)
		}
	];

	return (
		<>
			<YhAdd type="primary" icon="plus" onClick={addNameServer} />
			<Table columns={columns} dataSource={tableList} rowKey="id" />

            <FormMdal />

			<ConfigDrawer
				configVisibility={configVisibility}
				showConfigDetailInfo={showConfigDetailInfo}
				closeDrawer={closeDrawer}
			></ConfigDrawer>
		</>
	);
}

export default connect((state:any) => ({
    tableModalVisibility: state.tableModalVisibility
}), dispatch => ({
    setTableModalVisibility: bindActionCreators(setTableModalVisibility, dispatch)
}))(RmqNameServer)
