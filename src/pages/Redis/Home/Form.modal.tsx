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
import { YHSmallFormItem, YHFlexDiv } from "@styled/Form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";
import IPostParams, { initInstancesType } from "./data";
import {isEven} from "@tools"

const initIPostParams: IPostParams = {
	type: "redis",
	params: {
		name: "",
		version: "4.0.14",
		redisPass: "",
		moreConf: "",
		instances: []
	}
};

const formItemBasicLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8 }
};

const formItemInstanceLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 6 }
};

function FormModal(props) {
	const {
		tableModalVisibility,
		setTableModalVisibility,
		form: { getFieldDecorator }
	} = props;

	let [postParams, setPostParams] = useState(initIPostParams);
	let [chosedType, setChosedType] = useState(initInstancesType[0].id);

	useEffect(() => {
		setTableModalVisibility();
	}, []);

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
		setChosedType(id);
		message.info(
			`reids实例类型切换为 "${
				initInstancesType[
					initInstancesType.findIndex(type => type.id === id)
				].name
			}"`
        );
        switch (id) {
            case 3:
                createInstances(6)
                break;
            case 5:
                createInstances(10)
                break;
            case 7:
                createInstances(14)
                break;
            case 9:
                createInstances(18)
                break;
            case 11:
                createInstances(22)
                break;
            default:
                break;
        }
    };
    
    // 生成机器实例
    const createInstances = (num) => {
        let instances = Array(num).fill({
            ip: "",
            port: "",
            user: "",
            pass: ""
        });
        const {
			form: { getFieldsValue }
		} = props;
        let newPostParams = Object.assign({}, getFieldsValue());
        newPostParams.params.instances = instances;
        setPostParams(newPostParams);
    }

	const handleOk = () => {
		setTableModalVisibility();
	};

	const handleCancel = () => {
		setTableModalVisibility();
	};

	return (
		<Modal
			modalName={`创建Redis集群`}
			visible={tableModalVisibility.visible}
			handleOk={handleOk}
            handleCancel={handleCancel}
            width={'60%'}
		>
			<Form>
				<Divider>基础信息</Divider>
				<Form.Item {...formItemBasicLayout} label="集群名称">
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
				<Form.Item {...formItemBasicLayout} label="集群版本">
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
				<Form.Item {...formItemBasicLayout} label="集群密码">
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
				<Form.Item {...formItemBasicLayout} label="集群类型：">
					<Select
						placeholder="请选择集群类型"
						onChange={chooseInstanceType}
					>
						{initInstancesType.map(type => (
							<Select.Option key={type.id} value={type.id}>
								{`${type.name}`}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				{postParams.params.instances.map((instance, idx) => (
					<YHFlexDiv key={idx}>
						<YHSmallFormItem {...formItemInstanceLayout}
							label={
								isEven(idx) ? `M ${Math.floor(idx/2 + 1)}` : `S ${Math.ceil(idx/2)}`
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
						</YHSmallFormItem>
						<YHSmallFormItem {...formItemInstanceLayout} label="Port">
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
						</YHSmallFormItem>
						<YHSmallFormItem {...formItemInstanceLayout} label="用户名">
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
						</YHSmallFormItem>
						<YHSmallFormItem {...formItemInstanceLayout} label="密码">
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
						</YHSmallFormItem>
					</YHFlexDiv>
				))}
				<Divider>自定义配置项目</Divider>
				<Form.Item {...formItemInstanceLayout} label="自定义参数">
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