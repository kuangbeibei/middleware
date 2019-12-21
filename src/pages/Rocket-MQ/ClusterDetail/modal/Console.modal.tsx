/*
 * @Author: kevinkang
 * @Date: 2019-12-17 16:35:46
 * @LastEditTime : 2019-12-18 11:35:06
 * @FilePath: /middleware-frontend/src/pages/Rocket-MQ/ClusterDetail/modal/NameServer.modal.tsx
 */

import * as React from 'react';
import { Component } from 'react';

import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";
import Modal from "@com/Modal";

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';

const { TextArea } = Input

function ConsoleModal(props) {
  let {
    tableModalVisibility,
    setTableModalVisibility,
    form: {getFieldDecorator, }
  } = props

  const initialNameServerObj: any = {
    version: '',
    ip: '',
    port: '',
    userName: '',
    password: '',
    logPath: '',
    moreConfig: ''
  }

  let [nameServerObj, setNameServerObj] = useState(initialNameServerObj)  

  useEffect(()=>{
    console.log(tableModalVisibility.visible)
    setTableModalVisibility()
  } , [])

  const handleCancel =()=>{setTableModalVisibility()}
  const handleOK = ()=>{
    const { form: { getFieldsValue, validateFields } } = props;
    let values = getFieldsValue()
    console.log('点击了确定按钮，获取到的表单的值为', values.params)
    
  }

  const formItemBasicLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 }
  };


  // const initialNameServerObj: any = {
  //   version: '',
  //   ip: '',
  //   port: '',
  //   userName: '',
  //   password: '',
  //   logPath: '',
  //   moreConfig: ''
  // }


  return (
    <Modal
      modalName = {`添加console`}
      visible={tableModalVisibility.visible}
      width={'60%'}
      handleCancel={handleCancel}
      handleOk= {handleOK}
    >
      <Form>
        <Form.Item {...formItemBasicLayout} label="版本">
					{getFieldDecorator("params.version", {
						initialValue: nameServerObj.version,
						rules: [
							{
								required: true,
								message: "清选择版本"
							}
						]
					})(
						<Select>
                <Select.Option value="1.1.0" > 1.1.0 </Select.Option>
                <Select.Option value="1.1.9" > 1.1.9 </Select.Option>
						</Select>
					)}
				</Form.Item> 

        <Form.Item {...formItemBasicLayout} label="IP">
					{getFieldDecorator("params.ip", {
						initialValue: nameServerObj.ip,
						rules: [
							{
								required: true,
								message: "请输入IP"
							}
						]
					})(<Input placeholder="请输入IP地址"></Input>)}
				</Form.Item>

        <Form.Item {...formItemBasicLayout} label="端口">
					{getFieldDecorator("params.port", {
						initialValue: nameServerObj.summary,
						rules: [
							{
								required: true,
								message: "请输入概要"
							}
						]
					})(<Input placeholder="请输入端口"></Input>)}
				</Form.Item>

        <Form.Item {...formItemBasicLayout} label="用户名">
					{getFieldDecorator("params.userName", {
						initialValue: nameServerObj.userName,
						rules: [
							{
								required: true,
								message: "请输入用户名"
							}
						]
					})(<Input placeholder="请输入用户名"></Input>)}
				</Form.Item>
        <Form.Item {...formItemBasicLayout} label="密码">
					{getFieldDecorator("params.password", {
						initialValue: nameServerObj.password,
						rules: [
							{
								required: true,
								message: "请输入密码"
							}
						]
					})(<Input type="password" placeholder="请输入密码"></Input>)}
				</Form.Item>
        {/* <Form.Item {...formItemBasicLayout} label="dashboard文件路径">
					{getFieldDecorator("params.logPath", {
						initialValue: nameServerObj.logPath,
						rules: [
							{
								required: true,
								message: "请输入dashboard文件路径"
							}
						]
					})(<Input placeholder="请输入dashboard文件路径"></Input>)}
				</Form.Item>    
        <Form.Item {...formItemBasicLayout} label="更多配置">
					{getFieldDecorator("params.moreConfig", {
						initialValue: nameServerObj.moreConfig,
						rules: [
							{
								required: false,
								// message: "请输入日志路径"
							}
						]
					})(<TextArea rows={4} placeholder="更多配置"></TextArea>)}
				</Form.Item>                        */}


      </Form>

    </Modal>
  )

}


export default connect(
  // 控制modal的显示与隐藏
  (state: any) => (
    {
      tableModalVisibility: state.tableModalVisibility
    }
  ),
  dispatch => ({
    setTableModalVisibility: bindActionCreators(
      setTableModalVisibility,
      dispatch
    )
  })
)(Form.create({})(ConsoleModal))