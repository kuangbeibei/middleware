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
import { YHSmallFormItem, YHFlexSpaceBetwenDiv, YHFlexCenterDiv } from "@styled/Form";
import { isEven, deepCloneObject } from "@utils/tools";

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
import { Item } from "rc-menu";

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
    name: '',
    summary: '',
    tenant: 't1',
    consoleList: [],
    brokerList: [],
    nameServerList: [],
    list:[]
  }

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


  const formItemBasicLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 }
  };



  const getConsoleListFormItems = () => {
 
    const formItems = clusterObj.consoleList.map((consoleGroup, index) => {
      
    return (
        <div key={'console_item_' + index} style={{outline: '3px dotted wheat',  outlineOffset: 6, position: 'relative', paddingTop: 10, marginTop: index!=0 ? 36: 15}}>

          <Tooltip title="删除">
            <Icon onClick={()=>{deleteConsole(consoleGroup.key)}} style={{
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
                <YHSmallFormItem
                  {...formItemBasicLayout}
                  label={ '版本' + ( idx ? '(备)': '(主)') }
                >
                  {getFieldDecorator(`params.consoleList[${consoleGroup.key}].data[${idx}].version`, {
                    initialValue: item.ip,
                    rules: [
                      {
                        required: true,
                        message: "版本必填"
                      }
                    ]
                    })(<Input placeholder="version"></Input>)}
                </YHSmallFormItem>

                <YHSmallFormItem
                {...formItemBasicLayout}
                label="ip"
                >
                  {getFieldDecorator(`params.consoleList[${consoleGroup.key}].data[${idx}].ip`, {
                    initialValue: item.ip,
                    rules: [
                      {
                        required: true,
                        message: "ip必填"
                      }
                    ]
                    })(<Input placeholder="ip"></Input>)}
                </YHSmallFormItem>

                <YHSmallFormItem
                {...formItemBasicLayout}
                label="端口"
                >
                  {getFieldDecorator(`params.consoleList[${consoleGroup.key}].data[${idx}].port`, {
                    initialValue: item.ip,
                    rules: [
                      {
                        required: true,
                        message: "port必填"
                      }
                    ]
                    })(<Input placeholder="port"></Input>)}
                </YHSmallFormItem>

                <YHSmallFormItem
                {...formItemBasicLayout}
                label="用户名"
                >
                  {getFieldDecorator(`params.consoleList[${consoleGroup.key}].data[${idx}].username`, {
                    initialValue: item.ip,
                    rules: [
                      {
                        required: true,
                        message: "用户民必填"
                      }
                    ]
                    })(<Input placeholder="usernname"></Input>)}
                </YHSmallFormItem>

                <YHSmallFormItem
                {...formItemBasicLayout}
                label="密码"
                >
                  {getFieldDecorator(`params.consoleList[${consoleGroup.key}].data[${idx}].username`, {
                    initialValue: item.ip,
                    rules: [
                      {
                        required: true,
                        message: "密码必填"
                      }
                    ]
                    })(<Input placeholder="password"></Input>)}
                </YHSmallFormItem>

              </YHFlexSpaceBetwenDiv>
              )
          }

        </div>


      );
    })
    formItems.push(
      <YHFlexSpaceBetwenDiv key={'add_btn_console'}>
        <Button type="primary" onClick={addConsole} style={{marginTop: 30}}> 
          添加 
          <Icon type="plus-circle" /> 
        </Button>
      </YHFlexSpaceBetwenDiv>
    )
    return formItems;
  }
  const addConsole = () => {
    let consoleList = clusterObj.consoleList
    consoleList.push({
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
        consoleList: consoleList
      }
      )
    )
  }

  const deleteConsole = (key)=>{
    let cloneObj = deepCloneObject(clusterObj)
    cloneObj.consoleList = cloneObj.consoleList.filter(item => item.key != key)
    setClusterObj(
      Object.assign({},
        cloneObj
      )
    )

  }

  const getBrokerFormItems = ()=> {

    const formItems = clusterObj.brokerList.map((broker, index) => (
      <YHFlexSpaceBetwenDiv key={'broker_item_' + index}>
              <YHSmallFormItem
                  {...formItemBasicLayout}
                  label="版本"
                >
                  {getFieldDecorator(`params.brokerList[${broker.key}].version`, {
                    initialValue: broker.version,
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
                </YHSmallFormItem>

                <YHSmallFormItem
                  {...formItemBasicLayout}
                  label="ip"
                >
                  {getFieldDecorator(`params.brokerList[${broker.key}].ip`, {
                    initialValue: broker.ip,
                    rules: [
                      {
                        required: true,
                        message: "ip必填"
                      }
                    ]
                    })(<Input placeholder="请输入ip"></Input>)}
                </YHSmallFormItem>

                <YHSmallFormItem
                  {...formItemBasicLayout}
                  label="端口"
                >
                  {getFieldDecorator(`params.brokerList[${broker.key}].port`, {
                    initialValue: broker.port,
                    rules: [
                      {
                        required: true,
                        message: "端口必填"
                      }
                    ]
                    })(<Input placeholder="请输入端口"></Input>)}
                </YHSmallFormItem>   

                <YHSmallFormItem
                  {...formItemBasicLayout}
                  label="用户名"
                >
                  {getFieldDecorator(`params.brokerList[${broker.key}].username`, {
                    initialValue: broker.usrename,
                    rules: [
                      {
                        required: true,
                        message: "用户名必填"
                      }
                    ]
                    })(<Input placeholder="请输入用户名"></Input>)}
                </YHSmallFormItem> 

                <YHSmallFormItem
                  {...formItemBasicLayout}
                  label="密码"
                >
                  {getFieldDecorator(`params.brokerList[${broker.key}].password`, {
                    initialValue: broker.password,
                    rules: [
                      {
                        required: true,
                        message: "密码必填"
                      }
                    ]
                    })(<Input placeholder="请输入密码"></Input>)}
                </YHSmallFormItem>   
                
                <Tooltip title="删除">
                <Icon onClick={deleteBroker} style={{fontSize: 25, marginBottom: 24, cursor: 'pointer'}} type="minus-circle" />
                </Tooltip>
                       

      </YHFlexSpaceBetwenDiv>
    ))
    formItems.push(
      <YHFlexSpaceBetwenDiv key={'add_btn_broker'}>
        <Button type="primary" onClick={addBroker} style={{marginTop: 10}}>
           添加 
           <Icon type="plus-circle" /> 
        </Button>
      </YHFlexSpaceBetwenDiv>
    )
    return formItems;

  }

  const addBroker = ()=>{
    let brokerList = clusterObj.brokerList
    brokerList.push({
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
      brokerList
      )
    )
  }
  const deleteBroker = (key)=>{
    let cloneObj = deepCloneObject(clusterObj)
    cloneObj.brokerList = cloneObj.brokerList.filter(item => item.key != key)
    setClusterObj(
      Object.assign({},
        cloneObj
      )
    )
  }

  const getNameServerForms = () => {

    const formItems = clusterObj.nameServerList.map((nameServer, index) =>(
      <YHFlexSpaceBetwenDiv key={nameServer.key}>
      <YHSmallFormItem
          key={index+'_version'}
          {...formItemBasicLayout}
          label="版本"
        >
          {getFieldDecorator(`params.nameServerList[${nameServer.key}].version`, {
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
        </YHSmallFormItem>

        <YHSmallFormItem
          key={index+'_ip'}
          {...formItemBasicLayout}
          label="ip"
        >
          {getFieldDecorator(`params.nameServerList[${nameServer.key}].ip`, {
            initialValue: nameServer.ip,
            rules: [
              {
                required: true,
                message: "ip必填"
              }
            ]
            })(<Input placeholder="请输入ip"></Input>)}
        </YHSmallFormItem>

        <YHSmallFormItem
          key={index+'_port'}
          {...formItemBasicLayout}
          label="端口"
        >
          {getFieldDecorator(`params.nameServerList[${nameServer.key}].port`, {
            initialValue: nameServer.port,
            rules: [
              {
                required: true,
                message: "端口必填"
              }
            ]
            })(<Input placeholder="请输入端口"></Input>)}
        </YHSmallFormItem>   

        <YHSmallFormItem
          key={index+'_username'}
          {...formItemBasicLayout}
          label="用户名"
        >
          {getFieldDecorator(`params.nameServerList[${nameServer.key}].username`, {
            initialValue: nameServer.username,
            rules: [
              {
                required: true,
                message: "用户名必填"
              }
            ]
            })(<Input placeholder="请输入用户名"></Input>)}
        </YHSmallFormItem> 

        <YHSmallFormItem
           key={index+'_password'}
          {...formItemBasicLayout}
          label="密码"
        >
          {getFieldDecorator(`params.nameServerList[${nameServer.key}].password`, {
            initialValue: nameServer.password,
            rules: [
              {
                required: true,
                message: "密码必填"
              }
            ]
            })(<Input placeholder="请输入密码"></Input>)}
        </YHSmallFormItem>   
        
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
    let { nameServerList } = cloneObj
    cloneObj.nameServerList = nameServerList.filter(item => item.key !== key)
    setClusterObj(
      Object.assign({},
       cloneObj
      )
    )

    
  }
  const addNameServer = () => {
    let cloneNmObjv =  deepCloneObject(clusterObj)
    let nameServerList = cloneNmObjv.nameServerList
    nameServerList.push({
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

        <Divider >broker</Divider>


        {
          getBrokerFormItems()
        }
        
  



        <Divider >name server</Divider>

        {
          getNameServerForms()

        }
        
        <Divider >console</Divider>

        {
          getConsoleListFormItems()
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
