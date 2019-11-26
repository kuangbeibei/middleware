/*
 * 扩容Form.modal
 * @Author: kuangdan
 * @Date: 2019-11-25 14:37:02
 * @Last Modified: 2019-11-25 14:37:02
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
	Col,
	Checkbox
} from "antd";
import Modal from "@com/Modal";
import { YHSmallFormItem, YHFlexDiv } from "@styled/Form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";
import IextensionFormParams from "./data";
import { isEven, deepCloneObject } from "@utils/tools";

import {
	createExtension,
	getExtensionDetail,
	updateExtension
} from "./service";

import "./style.less";

const formTitleLayout = {
	labelCol: { span: 2 },
};

const formItemBasicLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 12 }
};

const formItemInstanceLayout = {
	labelCol: { span: 6},
    wrapperCol: { span: 6 },
};

const formSlotSourceCheckboxLayout = {
    labelCol: { span: 2, offset: 2},
    wrapperCol: { span: 8 },
}

const initIPostParams: IextensionFormParams = {
	type: "redisExtend",
	params: {
		redisClusterId: "",
		timeout: 3000,
		slot: "",
		instances: [
			{
				ip: "",
				port: "",
				user: "",
				pass: "",
				slotSources: [
					{
						ip: "",
						port: ""
					}
				]
			},
			{
				ip: "",
				port: "",
				user: "",
				pass: ""
			}
		]
	}
};

function FormModal(props) {
	const {
		tableModalVisibility,
		setTableModalVisibility,
		form: { getFieldDecorator },
		match: {
			params: { id }
		},
		taskId
	} = props;

	useEffect(() => {
		if (taskId) {
			getExtensionDetail(taskId).then(data => {
				setpostParams(data);
			});
		}
	}, [taskId]);

	const [postParams, setpostParams] = useState(
		deepCloneObject(initIPostParams)
    );
    const [checked, setchecked] = useState(false)

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
		setpostParams(newPostParams);
	};

	const handleOk = () => {
		const {
			form: { getFieldsValue, validateFields }
		} = props;

		validateFields(err => {
			if (err) {
				message.warning("信息填写不完全!");
			} else {
				let params = Object.assign(
					{},
					{
						redisClusterId: Number(id),
						timeout: 3000
					},
					postParams.params,
					getFieldsValue().params
				);

				let { instances } = getFieldsValue().params;
				instances.forEach(i => (i.port = Number(i.port)));
				params.instances = instances;

				let data = {
					type: "redisExtend",
					params
				};

				save(data)
					.then(res => {
						message.success("扩容成功!");
						initFormModal();
					})
					.catch(e => message.error(e.message));
			}
		});
	};

	const save = async data => {
		if (taskId) {
			return updateExtension(data.params, taskId);
		} else {
			return createExtension(data);
		}
	};

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
		setpostParams(deepCloneObject(initIPostParams));
		setTableModalVisibility();
    };
    
    const checkboxChange = (e) => {
        if (e.target.checked) {
            setchecked(true)
        } else {
            setchecked(false)
        }
    }

	return (
		<>
			<Modal
				modalName={`扩容Redis集群`}
				visible={tableModalVisibility.visible}
				handleOk={handleOk}
				handleCancel={handleCancel}
				width={"60%"}
			>
				<Form>
					<Form.Item {...formItemBasicLayout} label="slot">
						{getFieldDecorator("params.slot", {
							initialValue: postParams.params.slot,
							rules: [
								{
									required: true,
									message: "请输入集群slot"
								}
							]
						})(<Input placeholder="请输入集群slot"></Input>)}
					</Form.Item>

					<Divider>扩容实例</Divider>

					{postParams.params.instances.map((instance, idx) => (
						<div key={idx}>
							<YHFlexDiv>
								<YHSmallFormItem
									className="extensionFormItemTitle"
									{...formTitleLayout}
								>{`${
									isEven(idx) ? "主" : "从"
								}`}</YHSmallFormItem>
								<YHSmallFormItem
									{...formItemInstanceLayout}
									label="IP"
								>
									{getFieldDecorator(
										`params.instances[${idx}].ip`,
										{
											initialValue: instance.ip,
											rules: [
												{
													required: true,
													message: "Master IP"
												}
											]
										}
									)(
										<Input placeholder="请输入IP地址"></Input>
									)}
								</YHSmallFormItem>
								<YHSmallFormItem
									{...formItemInstanceLayout}
									label="Port"
								>
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
								<YHSmallFormItem
									{...formItemInstanceLayout}
									label="用户名"
								>
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
								<YHSmallFormItem
									{...formItemInstanceLayout}
									label="密码"
								>
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
                            {isEven(idx) ? (
                                <div className="slotSourceWrap">
                                   <YHSmallFormItem
                                        {...formSlotSourceCheckboxLayout}
                                        label="选择slot源"
                                        labelAlign="left"
                                    >
                                        <Checkbox onChange={checkboxChange} />
                                    </YHSmallFormItem>
                                   {
                                        checked ? 
                                            <>
                                                <div className="slotSourceItemWrap">
                                                    <Form.Item>
                                                        <Select>
                                                            <Select.Option value="4.0.14">4.0.14</Select.Option>
                                                            <Select.Option value="5.0.5">5.0.5</Select.Option>
                                                        </Select>
                                                    </Form.Item>
                                                    <Icon type="minus" />
                                                </div>
                                                <Icon type="plus" />
                                            </>
                                         : null
                                    }
                                </div>
							) : null}
						</div>
					))}
				</Form>
			</Modal>
		</>
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
