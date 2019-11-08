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

import FormModal from "@com/Form-modal";
import ConfigDrawer from "@com/Drawer";
import { YhOp, YhAdd } from "@styled/Button";
import { FormatTime, deepCloneObject } from "@tools";

import { getDeployListOfRmqNameServer, deployTask, releaseTaskResources, getConfigInfo } from "./service";

import { rmqNameServerPrototype, rmqNameServerVersions } from "./data";

function RmqNameServer(props) {
	const {
		match: {
			params: { id }
		},
		form: { getFieldDecorator }
	} = props;

	let [loadingListCount, setLoadListCount] = useState(0);
	let [tableList, setTableList] = useState(Array());

    let [visibility, setvisibility] = useState(false);
    let [configVisibility, setconfigVisibility] = useState(false);
    let [postParams, setpostParams] = useState(deepCloneObject(rmqNameServerPrototype));
    let [configInfo, setconfigInfo] = useState(Array())


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
        releaseTaskResources(taskId).then(res => {
            message.success(`删除成功！`)
            setLoadListCount(loadingListCount + 1);
        }).catch(e => message.error(e.message))
    };

	/**
	 * 添加Modal
	 */
	const addNameServer = () => {
		setvisibility(true);
    };
    
    /**
     * 创建
     */
    const handleOk = () => {
        const {
			form: {
				getFieldsValue,
				validateFields,
			}
        } = props;
        validateFields(err => {
            if (err) return message.warning(`信息填写不完全!`);
           
            let deployData = Object.assign({}, {
                params: Object.assign({}, {
                    rmqComponentClusterId: Number(id)
                }, {...getFieldsValue().params})
            }, {
                type: 'rmqNameServer'
            })
            deployData.params.port = Number(deployData.params.port);

            deployTask(deployData).then(() => {
                message.success(`NameServer创建成功`);
                initFormModal();
                setLoadListCount(loadingListCount + 1);
            }).catch(e => message.error(e.message))
        })
    }

    /**
     * 关闭弹窗
     */
    const handleCancel = () => {
        initFormModal();
        setvisibility(false);
    }

    /**
     * 初始化表单
     */
	const initFormModal = () => {
		const {
			form: {
				resetFields
			}
		} = props;
        resetFields();
		setvisibility(false);
	}

    /**
     * 查看日志
     */
    const checkLog = () => {
        
    }

    /**
     * 查看配置
     */
    const checkConfig = (taskId) => {
        getConfigInfo(taskId).then(data => {
            setconfigInfo(data)
            setconfigVisibility(true);
        }).catch(e => message.error(e.message))
    }

    /**
     * 显示配置信息
     */
    const showConfigDetailInfo = () => {
        return configInfo.map(configItem => {
			let val = configItem.value.replace(/\n/g, '\n');
			return (
				<Descriptions.Item 
					key={configItem.enName} 
					label={configItem.name}
				>
					{
						configItem.enName === 'moreConf' || configItem.enName === 'instances' ? <pre>{val}</pre> : <YhOp>{configItem.value || '无'}</YhOp>
					}
				</Descriptions.Item>
			)
		})
    }

    /**
     * 关闭配置信息
     */
    const closeDrawer = () => {
        setconfigInfo([]);
        setconfigVisibility(false)
    }

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
			render: text => <YhOp onClick={checkLog}>日志信息</YhOp>
        },
        {
			title: "配置",
			key: "config",
			render: text => <YhOp onClick={() => checkConfig(text.taskId)}>配置信息</YhOp>
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
					<Button type="primary" shape="circle" style={{marginRight: 10}}>
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

			<FormModal modalName = {`创建RMQ-NameServer`} visible = {visibility} handleOk = {handleOk} handleCancel = {handleCancel}>
				<Form>
					<Divider>基础信息</Divider>
					<Form.Item label="IP">
						{getFieldDecorator("params.ip", {
							initialValue: params.ip,
							rules: [
								{
									required: true,
									message: "请输入集群ip"
								}
							]
						})(<Input placeholder="请输入ip"></Input>)}
					</Form.Item>
					<Form.Item label="PORT">
						{getFieldDecorator("params.port", {
							initialValue: params.port,
							rules: [
								{
									required: true,
									message: "请输入port"
								}
							]
						})(<Input placeholder="请输入port"></Input>)}
                    </Form.Item>
                    <Form.Item label="路径">
						{getFieldDecorator("params.logPath", {
							initialValue: params.logPath,
							rules: [
								{
									required: true,
									message: "请输入logPath"
								}
							]
						})(<Input placeholder="请输入logPath"></Input>)}
                    </Form.Item>
                    <Form.Item label="用户名">
						{getFieldDecorator("params.user", {
							initialValue: params.user,
							rules: [
								{
									required: true,
									message: "请输入用户名"
								}
							]
						})(<Input placeholder="请输入用户名"></Input>)}
                    </Form.Item>
                    <Form.Item label="密码">
						{getFieldDecorator("params.pass", {
							initialValue: params.pass,
							rules: [
								{
									required: true,
									message: "请输入密码"
								}
							]
						})(<Input placeholder="请输入密码"></Input>)}
					</Form.Item>
					<Form.Item label="版本">
						{getFieldDecorator("params.version", {
							initialValue: params.version,
							rules: [
								{
									required: true,
									message: "请选择NameServer版本"
								}
							]
						})(
                            <Select>
                                {
                                    rmqNameServerVersions.map(version => <Select.Option key={version} value={version}>{version}</Select.Option>)
                                }
							</Select>
						)}
					</Form.Item>

					<Divider>自定义配置项目</Divider>
					<Form.Item label="自定义参数">
						{getFieldDecorator("params.moreConf", {
							initialValue: params.moreConf,
							rules: [
								{
									required: false,
									message:
										"请输入自定义参数，格式同rocketrmq.conf"
								}
							]
						})(
							<Input.TextArea placeholder="格式同rocketrmq.conf"></Input.TextArea>
						)}
					</Form.Item>
				</Form>
			</FormModal>
		
            <ConfigDrawer configVisibility={configVisibility} showConfigDetailInfo={showConfigDetailInfo} closeDrawer={closeDrawer}>

            </ConfigDrawer>
        </>
	);
}

export default Form.create({})(RmqNameServer);
