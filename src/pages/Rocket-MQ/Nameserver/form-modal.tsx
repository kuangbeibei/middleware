import * as React from "react"
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

import FormModal from "@com/Form-modal";

import { FormatTime, deepCloneObject } from "@tools";

import {
	getDeployListOfRmqNameServer,
	deployTask,
	releaseTaskResources,
    getConfigInfo,
    deployTaskOutput
} from "./service";

import { rmqNameServerPrototype, rmqNameServerVersions } from "./data";

function FormModalOfNameServer(props) {

    const {
        tableModalVisibility,
        setTableModalVisibility,
		form: { getFieldDecorator }
    } = props;
    
    let [postParams, setpostParams] = useState(
		deepCloneObject(rmqNameServerPrototype)
	);
    let { params } = postParams;
    	/**
	 * 创建
	 */
	const handleOk = () => {
		// const {
		// 	form: { getFieldsValue, validateFields }
		// } = props;
		// validateFields(err => {
		// 	if (err) return message.warning(`信息填写不完全!`);

		// 	let deployData = Object.assign(
		// 		{},
		// 		{
		// 			params: Object.assign(
		// 				{},
		// 				{
		// 					rmqComponentClusterId: Number(id)
		// 				},
		// 				{ ...getFieldsValue().params }
		// 			)
		// 		},
		// 		{
		// 			type: "rmqNameServer"
		// 		}
		// 	);
		// 	deployData.params.port = Number(deployData.params.port);

		// 	deployTask(deployData)
		// 		.then(() => {
		// 			message.success(`NameServer创建成功`);
		// 			initFormModal();
		// 			setLoadListCount(loadingListCount + 1);
		// 		})
		// 		.catch(e => message.error(e.message));
		// });
	};

	/**
	 * 关闭弹窗
	 */
	const handleCancel = () => {
		initFormModal();
	};

	/**
	 * 初始化表单
	 */
	const initFormModal = () => {
		const {
			form: { resetFields }
		} = props;
		resetFields();
		setTableModalVisibility()
    };
    
    return (
        <FormModal
				modalName={`创建RMQ-NameServer`}
				visible={tableModalVisibility.visible}
				handleOk={handleOk}
				handleCancel={handleCancel}
			>
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
								{rmqNameServerVersions.map(version => (
									<Select.Option
										key={version}
										value={version}
									>
										{version}
									</Select.Option>
								))}
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

			
    )
}

export default connect((state: any) => {
    return {
        tableModalVisibility: state.tableModalVisibility
    }
}, dispatch => ({
    setTableModalVisibility: bindActionCreators(setTableModalVisibility, dispatch)
}))(Form.create({})(FormModalOfNameServer));