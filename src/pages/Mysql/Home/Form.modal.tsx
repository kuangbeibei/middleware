/*
 * Mysql 集群的创建和修改
 * @Date: 2019-12-16 17:17:22
 * @Last Modified: 2019-12-16 17:17:22
 */

import * as React from "react";
import { useState, useEffect } from "react";

import {
	Button,
	Divider,
	Form,
	Input,
	message,
	Select,
	Icon,
	Row,
	Col
} from "antd";
import { YHSmallFormItem, YHFlexDiv } from "@styled/Form";
import Modal from "@com/Modal";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";

import { IPostParams } from "./data";

import {
	getDefaultClusterConfig,
	getClusterDetail,
	createMysqlCluster,
	updateMysqlCluster
} from "./service"

const initIPostParams: IPostParams = {
	name: "",
	tenantId: "",
	type: "ha",
	rootPassword: "",
	backupStrategy: "",
	backupServer: "",
	backupKeepDays: "",
	dbConfiguration: "",
	hosts: [
		{
			ip: "",
			port: "",
			user: "",
			pass: "",
			role: ""
		},
		{
			ip: "",
			port: "",
			user: "",
			pass: "",
			role: ""
		}
	]
};

const formItemBasicLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 12 }
};

const formItemInstanceLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 6 }
};

const formItemInstanceSshLayout = {
	labelCol: { span: 12 },
	wrapperCol: { span: 6 }
}

function FormModal(props) {
	const {
		tableModalVisibility,
		setTableModalVisibility,
		form: { getFieldDecorator },
		id,
		tenantRes
	} = props;

	let [postParams, setPostParams] = useState(
		Object.assign({}, initIPostParams)
	);
	const [tenantVal, setTenantVal] = useState("");

	useEffect(() => {
		setTableModalVisibility();
	}, []);

	useEffect(() => {
		if (id) {
			getClusterDetail(id).then(data => {
				// setPostParams(data)
			})
		}
	}, [id])

	useEffect(() => {
		if (!id || (id && !postParams.dbConfiguration) ) {
			getDefaultClusterConfig().then(data => {
				// 如果不是编辑，或者编辑但并没有自定义，才默认渲染
				let val = JSON.stringify(data).replace(/[\{\}\"]/g, "").replace(/\,/g, "\n");
				adjustPostParams('dbConfiguration',  JSON.stringify(data));
			})
		}
	}, [])

	/**
	 * 选择租户
	 * @param value
	 */
	const handleTenantChange = value => {
		setTenantVal(value);
	};

	/**
	 * 用户名和密码，自动填充没有写的
	 * @param value
	 * @param type
	 */
	const autoCompleteInput = (value, type) => {
		
	};

	/**
	 * 切换集群类型，变换实例
	 * @param val 
	 */
	const chooseClusterType = val => {
		if (val === 'ha') {
			// 默认一主一从，2个机器实例
			generateHostsTemplate(2)
		} else {
			// 默认一主两从，3个机器实例
			generateHostsTemplate(3)
		}
	}

	/**
	 * 根据type，生成相应的机器实例template
	 * @param type 
	 */
	const generateHostsTemplate = num => {
		let hosts = Array(num).fill({
			ip: "",
			port: "",
			user: "",
			pass: "",
			role: ""
		})
		adjustPostParams('hosts', hosts)
	}
	
	/**
	 * 调整postParams的值，只变化相应部分
	 * @param key 
	 * @param val 
	 */
	const adjustPostParams = (key, val) => {
		const {
			form: { getFieldsValue }
		} = props;
		let newPostParams = Object.assign({}, getFieldsValue());
		newPostParams[key] = val;
		setPostParams(newPostParams);
	}

	/**
	 * 
	 */
	const save = async data => {
		if (id) {
			return updateMysqlCluster(id, data);
		} else {
			return createMysqlCluster(data);
		}
	};


	const handleOk = () => {
		const {
			form: { getFieldsValue, validateFields }
		} = props;
		validateFields(err => {
			if (err) {
				message.warning("信息填写不完全!");
			} else {
				save(getFieldsValue())
					.then(message => {
						if (message === "ok") {
							setTableModalVisibility();
							message.success(
								`mysql集群${id ? "修改" : "创建"}成功!`
							);
						} else {
							message.error(message);
						}
					})
					.catch(e => message.error(e.message));
			}
		});
	};

	const handleCancel = () => {
		setTableModalVisibility();
	};

	return (
		<Modal
			modalName={`创建Mysql集群`}
			visible={tableModalVisibility.visible}
			handleOk={handleOk}
			handleCancel={handleCancel}
			width={"75%"}
		>
			<Form>
				<Divider>基础信息</Divider>
				<Form.Item {...formItemBasicLayout} label="集群名称">
					{getFieldDecorator("name", {
						initialValue: postParams.name,
						rules: [
							{
								required: true,
								message: "请输入集群名称"
							}
						]
					})(<Input placeholder="请输入集群名称"></Input>)}
				</Form.Item>
				<Form.Item {...formItemBasicLayout} label="集群类型">
					{getFieldDecorator("type", {
						initialValue: postParams.type,
						rules: [
							{
								required: true,
								message: "请选择mysql集群类型"
							}
						]
					})(
						<Select
							onChange={chooseClusterType}
						>
							<Select.Option value="ha">HA</Select.Option>
							<Select.Option value="InnodeCluster">
								InnodeCluster
							</Select.Option>
						</Select>
					)}
				</Form.Item>
				<Form.Item {...formItemBasicLayout} label="集群密码">
					{getFieldDecorator("rootPassword", {
						initialValue: postParams.rootPassword,
						rules: [
							{
								message: "请输入mysql集群密码"
							}
						]
					})(<Input.Password placeholder="请输入mysql集群密码" />)}
				</Form.Item>
				<Form.Item {...formItemBasicLayout} label="租户">
					<Select
						showSearch
						value={tenantVal}
						placeholder="请输入租户名称，或者IP地址，以便查询"
						defaultActiveFirstOption={false}
						notFoundContent={null}
						onChange={handleTenantChange}
						optionFilterProp="children"
						filterOption={(input, option) =>
							typeof option.props.children === "string"
								? option.props.children.indexOf(input) > -1
								: false
						}
					>
						{tenantRes.length > 0 &&
							tenantRes.map(tenant => (
								<Select.Option key={tenant.userId}>
									{tenant.name}
								</Select.Option>
							))}
					</Select>
				</Form.Item>

				<Divider>实例配置</Divider>
				{postParams.hosts.map((host, idx) => (
					<YHFlexDiv key={idx}>
						<YHSmallFormItem
							{...formItemInstanceLayout}
							label={
								`IP`
							}
						>
							{getFieldDecorator(`hosts[${idx}].ip`, {
								initialValue: host.ip,
								rules: [
									{
										required: true,
										message: "IP"
									}
								]
							})(<Input placeholder="请输入IP地址"></Input>)}
						</YHSmallFormItem>
						<YHSmallFormItem
							{...formItemInstanceSshLayout}
							label="SSH连接端口"
						>
							{getFieldDecorator(
								`hosts[${idx}].port`,
								{
									initialValue: host.port,
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
						<YHSmallFormItem
							{...formItemInstanceLayout}
							label="用户名"
						>
							{getFieldDecorator(
								`hosts[${idx}].user`,
								{
									initialValue: host.user,
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
						<YHSmallFormItem
							{...formItemInstanceLayout}
							label="密码"
						>
							{getFieldDecorator(
								`hosts[${idx}].pass`,
								{
									initialValue: host.pass,
									rules: [
										{
											required: true,
											message: "请输入密码"
										}
									]
								}
							)(
								<Input.Password
									placeholder="请输入密码"
									onBlur={event => {
										autoCompleteInput(
											event.currentTarget.value,
											"pass"
										);
									}}
								/>
							)}
						</YHSmallFormItem>
						<YHSmallFormItem
							{...formItemInstanceLayout}
							label="角色"
						>
							{getFieldDecorator(
								`hosts[${idx}].role`,
								{
									initialValue: host.role,
									rules: [
										{
											required: true,
											message: "请输入密码"
										}
									]
								}
							)(
								<Select placeholder="请选择机器角色">
									<Select.Option value="M">M</Select.Option>
									<Select.Option value="S">
										S
									</Select.Option>
								</Select>
							)}
						</YHSmallFormItem>
					</YHFlexDiv>
				))}

				<Divider>高级配置</Divider>
				<Form.Item {...formItemBasicLayout} label="备份服务器">
					{getFieldDecorator("backupServer", {
						initialValue: postParams.backupServer,
						rules: [
							{
								message: "请输入备份服务器",
								required: true
							}
						]
					})(<Input placeholder="请输入备份服务器" />)}
				</Form.Item>
				<Form.Item {...formItemBasicLayout} label="自动备份">
					{getFieldDecorator("backupStrategy", {
						initialValue: postParams.backupStrategy,
						rules: [
							{
								message: "自动备份策略，请填写cron表达式"
							}
						]
					})(<Input placeholder="自动备份策略，请填写cron表达式" />)}
				</Form.Item>
				<Form.Item {...formItemBasicLayout} label="备份清理策略">
					{getFieldDecorator("backupKeepDays", {
						initialValue: postParams.backupKeepDays,
						rules: [
							{
								message: "备份清理策略"
							}
						]
					})(<Input placeholder="备份清理策略" />)}
				</Form.Item>

				<Divider>DB参数配置</Divider>
				<Form.Item {...formItemBasicLayout} label="自定义参数">
					{getFieldDecorator("dbConfiguration", {
						initialValue: postParams.dbConfiguration,
						rules: [
							{
								required: false,
								message: "请输入自定义参数"
							}
						]
					})(
						<Input.TextArea placeholder="请输入自定义参数" rows={5}></Input.TextArea>
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
