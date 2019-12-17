/*
 * @Author: kevinkang
 * @Date: 2019-12-16 17:30:53
 * @LastEditTime: 2019-12-17 14:15:21
 * @LastEditors: Please set LastEditors
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";
import Modal from "@com/Modal";
// import PropTypes from 'prop-types'

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

// RocketMqModal.propTypes = {
//   name: PropTypes.string.isRequired
// }
// RocketMqModal.defaultProps = {
  
// }

function RocketMqModal(props) {
  

  const initialRocketMqObj:any = {
    name: '',
    summary: '',
    tenant: 't1'
  }
  
  let [clusterObj, setClusterObj] = useState(initialRocketMqObj);
  let [tenantList, setTenantList] = useState(Array());
  const { 
    tableModalVisibility,
    setTableModalVisibility,
    form: { getFieldDecorator },
  } = props
  
  const handleCancel = ()=>{
    setTableModalVisibility()
  }

  const handleOK = ()=>{
    const { form: { getFieldsValue, validateFields } } = props;
    let values = getFieldsValue()
    console.log('点击了确定按钮，获取到的表单的值为', values.params)
    
  }

  useEffect(()=>{
    console.log('加载cluster成功了--->>>>>')
    setTableModalVisibility();
    // TODO获取租户列表
    setTenantList([
      {
        name: 'tenant1',
        id: 't1'
      }, {
        name: 'tenant2',
        id: 't2'
      }
    ])
  }, [])


const formItemBasicLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 12 }
};

  return(
    <Modal
      modalName = {`创建rocketMQ集群`}
      visible={tableModalVisibility.visible}
      width={'60%'}
      handleCancel={handleCancel}
      handleOk= {handleOK}
    >

      <Form>
      <Form.Item {...formItemBasicLayout} label="集群名称">
					{getFieldDecorator("params.name", {
						initialValue: initialRocketMqObj.name,
						rules: [
							{
								required: true,
								message: "请输入集群名称"
							}
						]
					})(<Input placeholder="请输入集群名称"></Input>)}
				</Form.Item>
        <Form.Item {...formItemBasicLayout} label="概要">
					{getFieldDecorator("params.summary", {
						initialValue: initialRocketMqObj.summary,
						rules: [
							{
								required: true,
								message: "请输入概要"
							}
						]
					})(<Input placeholder="请输入概要"></Input>)}
				</Form.Item>

				<Form.Item {...formItemBasicLayout} label="请选择租户">
					{getFieldDecorator("params.tenant", {
						initialValue: initialRocketMqObj.tenant,
						rules: [
							{
								required: true,
								message: "请选择租户"
							}
						]
					})(
						<Select>
              {
                tenantList.map(item =>{
                  return (<Select.Option key={item.name}  value={item.id}>{item.name}</Select.Option>)
                })
              }
						</Select>
					)}
				</Form.Item>
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
)(Form.create({})(RocketMqModal))
