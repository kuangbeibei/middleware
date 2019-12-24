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
	InputNumber,
	message,
	Select,
	Icon,
	Row,
	Col
} from "antd";
import {
	YHSmallFormItem,
	YHFlexDiv,
	YHSmallFormItemWide,
	YHSmallFormItemNarrow
} from "@styled/Form";
import Modal from "@com/Modal";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";

import {
	IPostParams,
	formItemBasicLayout,
	formItemBasicLayoutOther,
	formItemInstanceLayout,
	formItemInstanceSshLayout,
	formAdvancesLayout,
	dbConfigurationLayout,
	formAdvancesServerLayout
} from "./data";

import {
	getDefaultClusterConfig,
	getClusterDetail,
	createMysqlCluster,
	updateMysqlCluster
} from "./service";

import {
	generateInteger
} from "@utils/tools"

const initIPostParams: IPostParams = {
	name: "",
	tenantId: "",
	type: "ha",
	rootPassword: "",
	backupStrategy: "",
	backupServer: "",
	backupKeepDays: 30,
	dbConfiguration: {},
	instances: [
		{
			ip: "",
			port: "",
			user: "",
			password: "",
			role: ""
		},
		{
			ip: "",
			port: "",
			user: "",
			password: "",
			role: ""
		}
	]
};

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
	const [hour, sethour] = useState(0); // 随机生成0-6之间的整数
	const [minute, setminute] = useState(0); // 随机生成0-59之间的整数

	useEffect(() => {
		setTableModalVisibility();
	}, []);

	useEffect(() => {
		if (id) {
			getClusterDetail(id).then(data => {
				const {
					backupStrategy
				} = data;
				backupStrategy.replace(/\*/g, '').split(' ').filter(i => i).forEach((item, idx) => {
					console.log('item,', item);
					idx === 0 ? setminute(item) : sethour(item)
				})
				setPostParams(data)
			});
		} else {
			sethour(generateInteger(0, 6));
			setminute(generateInteger(0, 59));
		}
	}, [id]);

	useEffect(() => {
		if (!id || (id && !postParams.dbConfiguration)) {
			getDefaultClusterConfig().then(data => {
				// 如果不是编辑，或者编辑但并没有自定义，才默认渲染
				let val = JSON.stringify(data)
					.replace(/[\{\}\"]/g, "")
					.replace(/\,/g, ",\n");
				adjustPostParams("dbConfiguration", val);
			});
		}
	}, []);


	/**
	 * 设置自动备份时间
	 * @param type 
	 * @param val 
	 */
	const setBackupTime = (type, val) => {
		if (type === 'hour') {
			sethour(val)
		} else {
			setminute(val)
		}
	}

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
	const autoCompleteInput = (value, type) => {};

	/**
	 * 切换集群类型，变换实例
	 * @param val
	 */
	const chooseClusterType = val => {
		if (val === "ha") {
			// 默认一主一从，2个机器实例
			generateHostsTemplate(2);
		} else {
			// 默认一主两从，3个机器实例
			generateHostsTemplate(3);
		}
	};

	/**
	 * 根据type，生成相应的机器实例template
	 * @param type
	 */
	const generateHostsTemplate = num => {
		let instances = Array(num).fill({
			ip: "",
			port: "",
			user: "",
			pass: "",
			role: ""
		});
		adjustPostParams("instances", instances);
	};

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
	};

	/**
	 * 提交数据
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
				const data = getFieldsValue();
				data.backupStrategy = `${minute} ${hour} * * *`;
				
				if (!data.dbConfiguration) {
					data.dbConfiguration = {};
				}

				save(data)
					.then(msg => {
						if (msg === "ok") {
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
			width={"70%"}
		>
			<Form>
				<Divider>基础信息</Divider>
				<YHFlexDiv>
					<YHSmallFormItemWide
						{...formItemBasicLayout}
						label="集群名称"
					>
						{getFieldDecorator("name", {
							initialValue: postParams.name,
							rules: [
								{
									required: true,
									message: "请输入集群名称"
								}
							]
						})(<Input placeholder="请输入集群名称"></Input>)}
					</YHSmallFormItemWide>
					<YHSmallFormItem
						{...formItemBasicLayoutOther}
						label="集群类型"
					>
						{getFieldDecorator("type", {
							initialValue: postParams.type,
							rules: [
								{
									required: true,
									message: "请选择mysql集群类型"
								}
							]
						})(
							<Select onChange={chooseClusterType}>
								<Select.Option value="ha">HA</Select.Option>
								<Select.Option value="InnodeCluster">
									InnodeCluster
								</Select.Option>
							</Select>
						)}
					</YHSmallFormItem>
					<YHSmallFormItem
						{...formItemBasicLayoutOther}
						label="集群密码"
					>
						{getFieldDecorator("rootPassword", {
							initialValue: postParams.rootPassword,
							rules: [
								{
									message: "请输入mysql集群密码"
								}
							]
						})(
							<Input.Password placeholder="请输入mysql集群密码" />
						)}
					</YHSmallFormItem>
					<YHSmallFormItemWide
						{...formItemBasicLayoutOther}
						label="租户"
					>
						{getFieldDecorator("tenantId", {
							initialValue: postParams.tenantId || tenantVal,
							rules: [
								{
									message: "请选择租户",
									required: true
								}
							]
						})(
							<Select
								showSearch
								placeholder="请选择租户"
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
						)}
					</YHSmallFormItemWide>
				</YHFlexDiv>
				<Divider>实例配置</Divider>
				{postParams.instances.map((instance, idx) => (
					<YHFlexDiv key={idx}>
						<YHSmallFormItem
							{...formItemInstanceLayout}
							label={`IP`}
						>
							{getFieldDecorator(`instances[${idx}].ip`, {
								initialValue: instance.ip,
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
							{getFieldDecorator(`instances[${idx}].port`, {
								initialValue: instance.port,
								rules: [
									{
										required: true,
										message: "请输入端口号"
									}
								]
							})(
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
							{getFieldDecorator(`instances[${idx}].user`, {
								initialValue: instance.user,
								rules: [
									{
										required: true,
										message: "请输入用户名"
									}
								]
							})(
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
							{getFieldDecorator(`instances[${idx}].password`, {
								initialValue: instance.password,
								rules: [
									{
										required: true,
										message: "请输入密码"
									}
								]
							})(
								<Input.Password
									placeholder="请输入密码"
									onBlur={event => {
										autoCompleteInput(
											event.currentTarget.value,
											"password"
										);
									}}
								/>
							)}
						</YHSmallFormItem>
						<YHSmallFormItem
							{...formItemInstanceLayout}
							label="角色"
						>
							{getFieldDecorator(`instances[${idx}].role`, {
								initialValue: instance.role,
								rules: [
									{
										required: true,
										message: "请输入密码"
									}
								]
							})(
								<Select placeholder="请选择机器角色">
									<Select.Option value="M">M</Select.Option>
									<Select.Option value="S">S</Select.Option>
								</Select>
							)}
						</YHSmallFormItem>
					</YHFlexDiv>
				))}

				<Divider>高级配置</Divider>
				<YHFlexDiv>
					<YHSmallFormItemWide
						{...formAdvancesServerLayout}
						label="备份服务器"
					>
						{getFieldDecorator("backupServer", {
							initialValue: postParams.backupServer,
							rules: [
								{
									message: "请输入备份服务器",
									required: true
								}
							]
						})(<Input placeholder="请输入备份服务器" />)}
					</YHSmallFormItemWide>
					<YHSmallFormItemNarrow
						{...formAdvancesLayout}
						label="自动备份"
					>
						<InputNumber defaultValue={hour} min={0} max={6} formatter={value => `${value}时`} onChange={(val) => setBackupTime('hour', val)}/>
					</YHSmallFormItemNarrow>
					<YHSmallFormItemNarrow>
						<InputNumber defaultValue={minute} min={0} max={59} formatter={value => `${value}分`} onChange={(val) => setBackupTime('minute', val)}/>
					</YHSmallFormItemNarrow>
					<YHSmallFormItemNarrow
						{...formAdvancesLayout}
						label="备份清理策略"
					>
						<InputNumber defaultValue={postParams.backupKeepDays} min={-1} formatter={value => `${value}天`}/>
					</YHSmallFormItemNarrow>
				</YHFlexDiv>
				<Divider>自定义配置项目</Divider>
				<Form.Item {...dbConfigurationLayout} label="自定义参数">
					{getFieldDecorator("dbConfiguration", {
						initialValue: postParams.dbConfiguration,
						rules: [
							{
								required: false,
								message: "请输入自定义参数"
							}
						]
					})(
						<Input.TextArea
							placeholder="请输入自定义参数"
							rows={8}
						></Input.TextArea>
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
