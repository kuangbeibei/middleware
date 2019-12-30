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
import { getTenants, addRocketMqCluster, updateRmqCluster } from '../service'
import { IrmqDataPrototype } from '../data'

import {
  Form,
  Input,
  Select,
  Divider,
  Button,
  Icon,
  Tooltip,
  InputNumber,
  message
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
  const initialRocketMqObj: IrmqDataPrototype = {
    businessName: '',
    summary: '',
    tenantId: '',
    version: '4.3.0',
    brokerInstances: [],
    consoleInstances: [],
    nameServerInstances: [],
  }


const QuarterFormItem = styled(Form.Item)`
  width: 24%;
`

function RocketMqModal(props) {
  let { clusterData, id } = props // 如果为undefined 则是编辑
  let [ clusterObj, setClusterObj ] = useState(Object.assign( {}, initialRocketMqObj)); // modal数据对象
  // let [ tenantList, setTenantList ] = useState<Array<any>>(Array()); // 租户列表 - 待传入
  let [ addFlag, setAddFlag ] = useState<boolean>(true); // 默认为添加



  const { 
    tenantList,
    getRmqList,
    tableModalVisibility,
    setTableModalVisibility,
    form: { getFieldDecorator, getFieldsValue, getFieldValue, setFieldsValue, validateFields },
  } = props
  
  const handleCancel = () => {
    setTableModalVisibility()
  }

  const check = (callback) => {
    validateFields(err => {
      if (!err) {
        let { params } = getFieldsValue()
        let { brokerInstances, consoleInstances, nameServerInstances } = params
        let list: any = [brokerInstances, consoleInstances, nameServerInstances]
        if (list.some(item => !item || Object.values(item).length <=0)) {
          return message.warning("集群的 Console/ Name Server/ Broker 实例至少都需要添加一个")
        }
        callback()
      } else {
        message.warning('信息填写不完全')
      }
    })
  }

  const fomatData = ()=>{
    const { form: { getFieldsValue, validateFields } } = props;
    let values = getFieldsValue()
    console.log('点击了确定按钮，获取到的表单的值为', values.params)
    let { params } = values

    let brokersData:any = []
    params.brokerInstances && Object.values(params.brokerInstances).forEach((item: any)=> {
      brokersData.push(...item.data)
    })
    let consolesData:any = params.consoleInstances ? Object.values(params.consoleInstances) : []
    let nameServersData:any = params.nameServerInstances ? Object.values(params.nameServerInstances) : []
    let datas: any = [brokersData, consolesData, nameServersData]
    datas.forEach(list => list.forEach(item => item.port = Number(item.port)))
    
    const postParam = {
      type: 'rmqCluster',
      params: {
        businessName: params.businessName,
        summary: params.summary,
        tenantId: params.tenantId,
        version: params.version,
        nameServerInstances: nameServersData,
        brokerInstances: brokersData,
        consoleInstances: consolesData,
        nameServerMoreConf: '',
        brokerMoreConf: ''
      }
    }
    return postParam
  }

  const handleOK = () => {
    let postData: {
      type: string,
      params: IrmqDataPrototype
    } = fomatData()

    check( async ()=>{
      if (addFlag) {
        addRocketMqCluster(postData).then((data) => {
          if(data.taskId) {
            message.success("添加成功")
            getRmqList()
            setTableModalVisibility()
          }
        })
      } else {
        updateRmqCluster(id, postData.params).then((data) => {
          if(data.taskId) {
            message.success("编辑成功")
            getRmqList()
            setTableModalVisibility()
          }
        })
      }

    })
    
  }

  useEffect(()=>{
    if (clusterData) {
      setAddFlag(false)
      setClusterObj(formatEditData(clusterData))
    }
    setTableModalVisibility();
  }, [])


  const formatEditData = (editClusterData)=> {
    // 格式化，添加key
    let { nameServerInstances, brokerInstances, consoleInstances  } = editClusterData
    nameServerInstances && nameServerInstances.forEach(item => item.key = Date.now()+'_ns')
    consoleInstances && consoleInstances.forEach(item => item.key = Date.now()+'_console')
    if (brokerInstances) {
      editClusterData.brokerInstances = brokerInstances.reduce((arr, item, index) => {
        if (index % 2 ==0) {
          arr.push({
            key: Date.now() + '_broker',
            data: [item]
          })
        } else {
          arr[arr.length - 1].data.push(item)
        }
        return arr
      }, [])
    }
    return editClusterData
  }


  const formItemInstanceLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 17 }
  };


  const formItemBasicLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 }
  };



  const getBrokerFormItems = () => {
 
    const formItems = clusterObj.brokerInstances && clusterObj.brokerInstances.map((consoleGroup, index) => {
      
    // TODO 样式调整
    return (
        <div  key={'console_item_' + index} style={
          { 
          // width: '96%' ,
          // border: '1px solid black',
          width: 'calc(100% - 30px)',
          // outline: '1px dotted wheat',
          outlineOffset: 2,
          position: 'relative',
          paddingTop: 10,
          marginTop: index!=0 ? 25: 15}
        
        }>

          <Tooltip title="删除">
            <Icon onClick={()=>{deleteBroker(consoleGroup.key)}} style={{
              fontSize: 25,
              marginBottom: 24,
              cursor: 'pointer',
              position: 'absolute',
              // right: -18,
              // top: -18,
              right: -34,
              top: 50,
              background: 'white'
              }} type="minus-circle" />
          </Tooltip>
          {
            consoleGroup.data.map((item, idx) => 
              <YHFlexSpaceBetwenDiv key={'console_m_v'+idx}>
  

                <QuarterFormItem
                {...formItemInstanceLayout}
                label={idx == 0 ? "ip(主)": "ip(备)"}
                labelAlign="left"
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
                    initialValue: item.port,
                    rules: [
                      {
                        required: true,
                        message: "port必填"
                      }
                    ]
                    })(
                    <Input type="number" placeholder="port"></Input>)}
                </QuarterFormItem>

                <QuarterFormItem
                {...formItemInstanceLayout}
                label="用户名"
                >
                  {getFieldDecorator(`params.brokerInstances[${consoleGroup.key}].data[${idx}].user`, {
                    initialValue: item.user,
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
                  {getFieldDecorator(`params.brokerInstances[${consoleGroup.key}].data[${idx}].pass`, {
                    initialValue: item.pass,
                    rules: [
                      {
                        required: true,
                        message: "密码必填"
                      }
                    ]
                    })(<Input.Password placeholder="请输入密码" />)}
                </QuarterFormItem>

              </YHFlexSpaceBetwenDiv>
              )
          }

        </div>
      );
    })
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
  const addBroker = () => {
    let brokerInstances = clusterObj.brokerInstances
    brokerInstances.push({
      key: Date.now()+ '_broker',
      data: [
        {
          type: 'Master',
          ip: '',
          port: '',
          user: '',
          pass: ''
        },
        {
          type: 'Vice',
          ip: '',
          port: '',
          user: '',
          pass: ''
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

    const formItems = clusterObj.consoleInstances && clusterObj.consoleInstances.map((broker, index) => (
      <YHFlexSpaceBetwenDiv key={'broker_item_' + index} style={{
        position: 'relative',
        width: 'calc(100% - 30px)',
      }}>
         
                <QuarterFormItem
                  {...formItemInstanceLayout}
                  label="ip"
                  labelAlign="left"
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
                    })(<Input type="number" placeholder="请输入端口"></Input>)}
                </QuarterFormItem>   

                <QuarterFormItem
                  {...formItemInstanceLayout}

                  label="用户名"
                >
                  {getFieldDecorator(`params.consoleInstances[${broker.key}].user`, {
                    initialValue: broker.user,
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
                  {getFieldDecorator(`params.consoleInstances[${broker.key}].pass`, {
                    initialValue: broker.pass,
                    rules: [
                      {
                        required: true,
                        message: "密码必填"
                      }
                    ]
                    })(<Input.Password placeholder="请输入密码" />)}
                </QuarterFormItem>   
                
                <Tooltip title="删除">
                <Icon onClick={()=>{deleteConsole(broker.key)}} style={{
                cursor: 'pointer',
                fontSize: 25, 
                marginBottom: 24,
                position: 'absolute',
                  right: -34,
                  top: 6,

                }} type="minus-circle" />
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
      ip: '',
      port: '',
      user: '',
      pass: '',
      key: Date.now()+'_console'
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

    const formItems = clusterObj.nameServerInstances && clusterObj.nameServerInstances.map((nameServer, index) =>(
      <YHFlexSpaceBetwenDiv key={nameServer.key} style={{
        position: 'relative',
        width: 'calc(100% - 30px)',
        // border: '1px solid black'
      }}>

        <QuarterFormItem
          key={index+'_ip'}
          {...formItemInstanceLayout}
          label="ip"
          labelAlign="left"
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
            })(<Input type="number" placeholder="请输入端口"></Input>)}
        </QuarterFormItem>   

        <QuarterFormItem
          key={index+'_user'}
          {...formItemInstanceLayout}
          label="用户名"
        >
          {getFieldDecorator(`params.nameServerInstances[${nameServer.key}].user`, {
            initialValue: nameServer.user,
            rules: [
              {
                required: true,
                message: "用户名必填"
              }
            ]
            })(<Input placeholder="请输入用户名"></Input>)}
        </QuarterFormItem> 

        <QuarterFormItem
           key={index+'_pass'}
          {...formItemInstanceLayout}
          label="密码"
        >
          {getFieldDecorator(`params.nameServerInstances[${nameServer.key}].pass`, {
            initialValue: nameServer.pass,
            rules: [
              {
                required: true,
                message: "密码必填"
              }
            ]
            })(<Input.Password placeholder="请输入密码" />)}
        </QuarterFormItem>   
        
        <Tooltip title="删除" style= {{
          
        }}>
            <Icon onClick = { ()=>{deleteNameServer(nameServer.key)}} style={{
              fontSize: 25, 
              marginBottom: 24,
              position: 'absolute',
                right: -34,
                top: 6,
              cursor: 'pointer'}} type="minus-circle" />
        </Tooltip>

               

      </YHFlexSpaceBetwenDiv>
    ))

    formItems.push(
      <YHFlexSpaceBetwenDiv key={'add_btn_ns'}>
        <Button type="primary" onClick={addNameServer} style={{marginTop: 10}}> 
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
      ip: '',
      port: '',
      user: '',
      pass: '',
      key: Date.now()+'_ns'
    })

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
      okText="确定"
      cancelText="取消"
    >

      <Form>
        <Divider> 基础信息 </Divider>
        <Form.Item {...formItemBasicLayout} label="集群名称">
					{getFieldDecorator("params.businessName", {
						initialValue: clusterObj.businessName,
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
						initialValue: clusterObj.summary,
						rules: [
							{
								required: true,
								message: "请输入概要"
							}
						]
					})(<Input placeholder="请输入概要"></Input>)}
				</Form.Item>
				<Form.Item {...formItemBasicLayout} label="请选择租户">
        {getFieldDecorator("params.tenantId", {
							initialValue: clusterObj.tenantId ,
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
								// onChange={handleTenantChange}
								optionFilterProp="children"
								filterOption={(input, option) =>
									typeof option.props.children === "string"
										? option.props.children.indexOf(input) > -1
										: false
								}
							>
								{tenantList.length > 0 &&
									tenantList.map(tenant => (
										<Select.Option key={tenant.userId}>
											{tenant.name}
										</Select.Option>
									))}
							</Select>
						)}
				</Form.Item>

        <Form.Item
          {...formItemBasicLayout}
            label={ '版本:'}
          >
            {getFieldDecorator(`params.version`, {
              initialValue: clusterObj.version,
              rules: [
                {
                  required: true,
                  message: "版本必填"
                }
              ]
            })(<Select placeholder="请选择版本">
              <Select.Option key="4.3.0">4.3.0</Select.Option>
            </Select>)}
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
