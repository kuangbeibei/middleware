/*
 * @Author: kuangdan
 * @Date: 2019-11-18 15:07:33
 * @Last Modified: 2019-11-18 15:07:33
 */

import * as React from "react";
import { useState, useEffect } from "react";
import {
	Button,
	Divider,
	Table,
	Form,
	Input,
	message,
	Select,
	Icon,
	Row,
	Col
} from "antd";
import Modal from "@com/Modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";
import IPostParams, { initInstancesType } from "./data";

const initIPostParams: IPostParams = {
	type: "redis",
	params: {
		name: "",
		version: "4.0.14",
		redisPass: "",
		moreConf: "",
		instances: Array(6).fill({
			ip: "",
			port: "",
			user: "",
			pass: ""
		})
	}
};

function FormModal(props) {
	const {
		tableModalVisibility,
		setTableModalVisibility,
		form: { getFieldDecorator }
	} = props;

    let [postParams, setPostParams] = useState(initIPostParams);
    
    useEffect(() => {
        setTableModalVisibility()
    }, [])

	/**
	 * 用户名和密码，自动填充没有写的
	 * @param value
	 * @param type
	 */
	const autoCompleteInput = (value, type) => {
		const {
			form: { getFieldsValue }
		} = props;

		let newPostParams = Object.assign({}, getFieldsValue());
		let {
			params: { instances }
		} = newPostParams;

		instances.forEach(instance => {
			if (!instance[type]) {
				instance[type] = value;
			}
		});
		setPostParams(newPostParams);
	};

	/**
	 * 选择机器实例的类型
	 * @param id
	 */
	const chooseInstanceType = id => {
		// setChosedType(id);
		message.info(
			`reids实例类型切换为 "${
				initInstancesType[
					initInstancesType.findIndex(type => type.id === id)
				].name
			}"`
		);
    };
    
    const handleOk = () => {
        setTableModalVisibility()
    }

    const handleCancel = () => {
        setTableModalVisibility()
    }

	return (
		<Modal
			modalName={`创建Redis集群`}
			visible={tableModalVisibility.visible}
			handleOk={handleOk}
			handleCancel={handleCancel}
		>
			<Form>
				<Divider>基础信息</Divider>
				<Form.Item label="集群名称">
					{getFieldDecorator("params.name", {
						initialValue: postParams.params.name,
						rules: [
							{
								required: true,
								message: "请输入集群名称"
							}
						]
					})(<Input placeholder="请输入集群名称"></Input>)}
				</Form.Item>
				<Form.Item label="集群版本">
					{getFieldDecorator("params.version", {
						initialValue: postParams.params.version,
						rules: [
							{
								required: true,
								message: "请选择redis集群版本"
							}
						]
					})(
						<Select>
							<Select.Option value="4.0.14">4.0.14</Select.Option>
							<Select.Option value="5.0.5">5.0.5</Select.Option>
						</Select>
					)}
				</Form.Item>
				<Form.Item label="集群密码">
					{getFieldDecorator("params.redisPass", {
						initialValue: postParams.params.redisPass,
						rules: [
							{
								message: "请输入redis集群密码"
							}
						]
					})(<Input placeholder="请输入redis集群密码"></Input>)}
				</Form.Item>
				<Divider>实例配置</Divider>
				<Row type="flex" justify="start" align="top">
					<Col span={12}>
						redis集群类型：
						{
							// initInstancesType.map(instanceType => (<span onClick={() => {chooseInstanceType(instanceType.id)}} key={instanceType.id} className={instanceType.id === chosedType ? 'active' : ''}>{`${instanceType.name}`}</span>))
						}
					</Col>
				</Row>
				{postParams.params.instances.map((instance, idx) => (
					<Form.Item key={idx}>
						<Form.Item
							label={
								idx < 3
									? `Master IP ${idx + 1}`
									: `Slave IP ${idx - 2}`
							}
						>
							{getFieldDecorator(`params.instances[${idx}].ip`, {
								initialValue: instance.ip,
								rules: [
									{
										required: true,
										message: "Master IP"
									}
								]
							})(<Input placeholder="请输入IP地址"></Input>)}
						</Form.Item>
						<Form.Item label="Port">
							{getFieldDecorator(
								`params.instances[${idx}].port`,
								{
									initialValue: instance.port,
									rules: [
										{
											required: true,
											message: "请输入端口号"
										}
									]
								}
							)(
								<Input
									placeholder="请输入端口号"
									onBlur={event => {
										autoCompleteInput(
											event.currentTarget.value,
											"port"
										);
									}}
								></Input>
							)}
						</Form.Item>
						<Form.Item label="用户名">
							{getFieldDecorator(
								`params.instances[${idx}].user`,
								{
									initialValue: instance.user,
									rules: [
										{
											required: true,
											message: "请输入用户名"
										}
									]
								}
							)(
								<Input
									placeholder="请输入用户名"
									onBlur={event => {
										autoCompleteInput(
											event.currentTarget.value,
											"user"
										);
									}}
								></Input>
							)}
						</Form.Item>
						<Form.Item label="密码">
							{getFieldDecorator(
								`params.instances[${idx}].pass`,
								{
									initialValue: instance.pass,
									rules: [
										{
											required: true,
											message: "请输入密码"
										}
									]
								}
							)(
								<Input
									placeholder="请输入密码"
									onBlur={event => {
										autoCompleteInput(
											event.currentTarget.value,
											"pass"
										);
									}}
								></Input>
							)}
						</Form.Item>
					</Form.Item>
				))}
				<Divider>自定义配置项目</Divider>
				<Form.Item label="自定义参数">
					{getFieldDecorator("params.moreConf", {
						initialValue: postParams.params.moreConf,
						rules: [
							{
								required: false,
								message: "请输入自定义参数，格式同redis.conf"
							}
						]
					})(
						<Input.TextArea placeholder="格式同redis.conf"></Input.TextArea>
					)}
				</Form.Item>
			</Form>
		</Modal>
	);
}

export default connect(
	(state: any) => ({
		tableModalVisibility: state.tableModalVisibility
	}),
	dispatch => ({
		setTableModalVisibility: bindActionCreators(
			setTableModalVisibility,
			dispatch
		)
	})
)(Form.create({})(FormModal));
