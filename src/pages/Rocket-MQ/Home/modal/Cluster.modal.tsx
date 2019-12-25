/*
 * @Author: kevinkang
 * @Date: 2019-12-16 17:30:53
 * @LastEditTime: 2019-12-17 17:23:41
 * @LastEditors: Please set LastEditors
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";
import Modal from "@com/Modal";
import { YHFlexSpaceBetwenDiv, YHFlexCenterDiv } from "@styled/Form";
import { isEven, deepCloneObject } from "@utils/tools";
import styled from 'styled-components';
// import PropTypes from 'prop-types'

import {
  Form,
  Input,
  Select,
  Divider,
  Button,
  Icon,
  Tooltip
} from 'antd';

// RocketMqModal.propTypes = {
//   name: PropTypes.string.isRequired
// }
// RocketMqModal.defaultProps = {
  
// }

// interface ConsoleObj  {

// }

// interface ConsoleItem {

// }


  // TODO 样式抽取
  // todo 定义typescript 数据格式
  const initialRocketMqObj:any = {
    businessName: '',
    summary: '',
    tenant: 't1',
    version: '',
    brokerInstances: [],
    consoleInstances: [],
    nameServerInstances: [],
    list:[]
  }


const QuarterFormItem = styled(Form.Item)`
  width: 24%;
`

function RocketMqModal(props) {
  
  const [testList, settestList] = useState(Array())

  
  let [clusterObj, setClusterObj] = useState(Object.assign( {}, initialRocketMqObj));
  let [tenantList, setTenantList] = useState(Array());
  const { 
    tableModalVisibility,
    setTableModalVisibility,
    form: { getFieldDecorator, getFieldsValue, getFieldValue, setFieldsValue },
  } = props
  
  const handleCancel = ()=>{
    setTableModalVisibility()
  }

  const handleOK = ()=>{
    const { form: { getFieldsValue, validateFields } } = props;
    let values = getFieldsValue()
    console.log('点击了确定按钮，获取到的表单的值为', values.params, clusterObj)
    
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

    setFieldsValue({
      'params': JSON.parse(JSON.stringify(initialRocketMqObj))
    })

    
  }, [])


  const formItemInstanceLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 17 }
  };


  const formItemBasicLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 }
  };



  const getBrokerFormItems = () => {
 
    const formItems = clusterObj.brokerInstances.map((consoleGroup, index) => {
      
    return (
        <div key={'console_item_' + index} style={{outline: '3px dotted wheat',  outlineOffset: 6, position: 'relative', paddingTop: 10, marginTop: index!=0 ? 36: 15}}>

          <Tooltip title="删除">
            <Icon onClick={()=>{deleteBroker(consoleGroup.key)}} style={{
              fontSize: 25,
              marginBottom: 24,
              cursor: 'pointer',
              position: 'absolute',
              right: -18,
              top: -18,
              background: 'white'
              }} type="minus-circle" />
          </Tooltip>
          {
            consoleGroup.data.map((item, idx) => 
              <YHFlexSpaceBetwenDiv key={'console_m_v'+idx}>
  

                <QuarterFormItem
                {...formItemInstanceLayout}
                label="ip"
                >
                  {getFieldDecorator(`params.brokerInstances[${consoleGroup.key}].data[${idx}].ip`, {
                    initialValue: item.ip,
                    rules: [
                      {
                        required: true,
                        message: "ip必填"
                      }
                    ]
                    })(<Input placeholder="ip"></Input>)}
                </QuarterFormItem>

                <QuarterFormItem
                {...formItemInstanceLayout}
                label="端口"
                >
                  {getFieldDecorator(`params.brokerInstances[${consoleGroup.key}].data[${idx}].port`, {
                    initialValue: item.ip,
                    rules: [
                      {
                        required: true,
                        message: "port必填"
                      }
                    ]
                    })(<Input placeholder="port"></Input>)}
                </QuarterFormItem>

                <QuarterFormItem
                {...formItemInstanceLayout}
                label="用户名"
                >
                  {getFieldDecorator(`params.brokerInstances[${consoleGroup.key}].data[${idx}].username`, {
                    initialValue: item.ip,
                    rules: [
                      {
                        required: true,
                        message: "用户民必填"
                      }
                    ]
                    })(<Input placeholder="usernname"></Input>)}
                </QuarterFormItem>

                <QuarterFormItem
                {...formItemInstanceLayout}
                label="密码"
                >
                  {getFieldDecorator(`params.brokerInstances[${consoleGroup.key}].data[${idx}].username`, {
                    initialValue: item.ip,
                    rules: [
                      {
                        required: true,
                        message: "密码必填"
                      }
                    ]
                    })(<Input placeholder="password"></Input>)}
                </QuarterFormItem>

              </YHFlexSpaceBetwenDiv>
              )
          }

        </div>


      );
    })
    formItems.push(
      <YHFlexSpaceBetwenDiv key={'add_btn_console'}>
        <Button type="primary" onClick={addBroker} style={{marginTop: 30}}> 
          添加 
          <Icon type="plus-circle" /> 
        </Button>
      </YHFlexSpaceBetwenDiv>
    )
    return formItems;
  }
  const addBroker = () => {
    let brokerInstances = clusterObj.brokerInstances
    brokerInstances.push({
      key: Date.now()+ '_console',
      data: [
        {
          ip: '',
          type: 'Master'
        },
        {
          ip: '',
          type: 'Vice'
        }
      ]
    })
    setClusterObj(
      Object.assign({},
      clusterObj,
      {
        brokerInstances: brokerInstances
      }
      )
    )
  }

  const deleteBroker = (key)=>{
    let cloneObj = deepCloneObject(clusterObj)
    cloneObj.brokerInstances = cloneObj.brokerInstances.filter(item => item.key != key)
    setClusterObj(
      Object.assign({},
        cloneObj
      )
    )

  }

  const getConsoleFormItems = ()=> {

    const formItems = clusterObj.consoleInstances.map((broker, index) => (
      <YHFlexSpaceBetwenDiv key={'broker_item_' + index}>
         

                <QuarterFormItem
                  {...formItemInstanceLayout}
                  label="ip"
                >
                  {getFieldDecorator(`params.consoleInstances[${broker.key}].ip`, {
                    initialValue: broker.ip,
                    rules: [
                      {
                        required: true,
                        message: "ip必填"
                      }
                    ]
                    })(<Input placeholder="请输入ip"></Input>)}
                </QuarterFormItem>

                <QuarterFormItem
                  {...formItemInstanceLayout}

                  label="端口"
                >
                  {getFieldDecorator(`params.consoleInstances[${broker.key}].port`, {
                    initialValue: broker.port,
                    rules: [
                      {
                        required: true,
                        message: "端口必填"
                      }
                    ]
                    })(<Input placeholder="请输入端口"></Input>)}
                </QuarterFormItem>   

                <QuarterFormItem
                  {...formItemInstanceLayout}

                  label="用户名"
                >
                  {getFieldDecorator(`params.consoleInstances[${broker.key}].username`, {
                    initialValue: broker.usrename,
                    rules: [
                      {
                        required: true,
                        message: "用户名必填"
                      }
                    ]
                    })(<Input placeholder="请输入用户名"></Input>)}
                </QuarterFormItem> 

                <QuarterFormItem
                  {...formItemInstanceLayout}
                  label="密码"
                >
                  {getFieldDecorator(`params.consoleInstances[${broker.key}].password`, {
                    initialValue: broker.password,
                    rules: [
                      {
                        required: true,
                        message: "密码必填"
                      }
                    ]
                    })(<Input placeholder="请输入密码"></Input>)}
                </QuarterFormItem>   
                
                <Tooltip title="删除">
                <Icon onClick={()=>{deleteConsole(broker.key)}} style={{fontSize: 25, marginBottom: 24, cursor: 'pointer'}} type="minus-circle" />
                </Tooltip>
                       

      </YHFlexSpaceBetwenDiv>
    ))
    formItems.push(
      <YHFlexSpaceBetwenDiv key={'add_btn_broker'}>
        <Button type="primary" onClick={addConsole} style={{marginTop: 10}}>
           添加 
           <Icon type="plus-circle" /> 
        </Button>
      </YHFlexSpaceBetwenDiv>
    )
    return formItems;

  }

  const addConsole = ()=>{
    let consoleInstances = clusterObj.consoleInstances
    consoleInstances.push({
      version: '4.3.9',
      ip: '',
      port: '',
      username: '',
      password: '',
      key: Date.now()+'_broker'
    })
    setClusterObj(
      Object.assign({},
      clusterObj,
      consoleInstances
      )
    )
  }
  const deleteConsole = (key)=>{
    let cloneObj = deepCloneObject(clusterObj)
    cloneObj.consoleInstances = cloneObj.consoleInstances.filter(item => item.key != key)
    setClusterObj(
      Object.assign({},
        cloneObj
      )
    )
  }

  const getNameServerForms = () => {

    const formItems = clusterObj.nameServerInstances.map((nameServer, index) =>(
      <YHFlexSpaceBetwenDiv key={nameServer.key}>
      {/* <QuarterFormItem
          key={index+'_version'}
          {...formItemInstanceLayout}
          label="版本"
        >
          {getFieldDecorator(`params.nameServerInstances[${nameServer.key}].version`, {
            initialValue: nameServer.version,
            rules: [
              {
                required: true,
                message: "版本必填"
              }
            ]
            })(
              <Select>
                <Select.Option value="4.3.9" > 4.3.9 </Select.Option>
              </Select>
            )}
        </QuarterFormItem> */}

        <QuarterFormItem
          key={index+'_ip'}
          {...formItemInstanceLayout}
          label="ip"
        >
          {getFieldDecorator(`params.nameServerInstances[${nameServer.key}].ip`, {
            initialValue: nameServer.ip,
            rules: [
              {
                required: true,
                message: "ip必填"
              }
            ]
            })(<Input placeholder="请输入ip"></Input>)}
        </QuarterFormItem>

        <QuarterFormItem
          key={index+'_port'}
          {...formItemInstanceLayout}
          label="端口"
        >
          {getFieldDecorator(`params.nameServerInstances[${nameServer.key}].port`, {
            initialValue: nameServer.port,
            rules: [
              {
                required: true,
                message: "端口必填"
              }
            ]
            })(<Input placeholder="请输入端口"></Input>)}
        </QuarterFormItem>   

        <QuarterFormItem
          key={index+'_username'}
          {...formItemInstanceLayout}
          label="用户名"
        >
          {getFieldDecorator(`params.nameServerInstances[${nameServer.key}].username`, {
            initialValue: nameServer.username,
            rules: [
              {
                required: true,
                message: "用户名必填"
              }
            ]
            })(<Input placeholder="请输入用户名"></Input>)}
        </QuarterFormItem> 

        <QuarterFormItem
           key={index+'_password'}
          {...formItemInstanceLayout}
          label="密码"
        >
          {getFieldDecorator(`params.nameServerInstances[${nameServer.key}].password`, {
            initialValue: nameServer.password,
            rules: [
              {
                required: true,
                message: "密码必填"
              }
            ]
            })(<Input placeholder="请输入密码"></Input>)}
        </QuarterFormItem>   
        
        <Tooltip title="删除">
            <Icon onClick = { ()=>{deleteNameServer(nameServer.key)}} style={{fontSize: 25, marginBottom: 24, cursor: 'pointer'}} type="minus-circle" />
        </Tooltip>

               

      </YHFlexSpaceBetwenDiv>
    ))

    formItems.push(
      <YHFlexSpaceBetwenDiv key={'add_btn_ns'}>
        <Button  type="primary" onClick={addNameServer} style={{marginTop: 10}}> 
         添加 
         <Icon type="plus-circle" /> 
        </Button>
      </YHFlexSpaceBetwenDiv>
    )
    return formItems;

  }
  const deleteNameServer = (key) => {
    let cloneObj = deepCloneObject(clusterObj)
    let { nameServerInstances } = cloneObj
    cloneObj.nameServerInstances = nameServerInstances.filter(item => item.key !== key)
    setClusterObj(
      Object.assign({},
       cloneObj
      )
    )

    
  }
  const addNameServer = () => {
    let cloneNmObjv =  deepCloneObject(clusterObj)
    let nameServerInstances = cloneNmObjv.nameServerInstances
    nameServerInstances.push({
      version: '4.3.9',
      ip: '',
      port: '',
      username: 'eee',
      password: '',
      key: Date.now()+'_ns'
    })

    let newPostParams = Object.assign({}, getFieldsValue());
    console.log(newPostParams, 'kevinnooooo')
    setClusterObj(
      Object.assign({},
        cloneNmObjv
      )
    )
  }


  


  return(
    <Modal
      modalName = {`创建rocketMQ集群`}
      visible={tableModalVisibility.visible}
      width={'70%'}
      handleCancel={handleCancel}
      handleOk= {handleOK}
    >

      <Form>
        <Divider> 基础信息 </Divider>
        <Form.Item {...formItemBasicLayout} label="集群名称">
					{getFieldDecorator("params.businessName", {
						initialValue: initialRocketMqObj.businessName,
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

        <Form.Item
          {...formItemBasicLayout}
            label={ '版本:'}
          >
            {getFieldDecorator(`params.version`, {
              initialValue: initialRocketMqObj.version,
              rules: [
                {
                  required: true,
                  message: "版本必填"
                }
              ]
            })(<Input placeholder="version"></Input>)}
        </Form.Item>

        <Divider >console</Divider>


        {
          getConsoleFormItems()
        }
        
  

        <Divider >name server</Divider>

        {
          getNameServerForms()

        }
        
        <Divider >broker</Divider>

        {
          getBrokerFormItems()
        }


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
