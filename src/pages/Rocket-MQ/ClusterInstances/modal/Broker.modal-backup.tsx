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
import { getTenants, addRocketMqCluster, updateRmqCluster } from '../../Home/service'
import { IrmqDataPrototype } from '../../Home/data'
import '../../Home/modal/cluster.modal.less';
import InstanceWrapper from '../../Home/modal/InstanceWrapper'
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

const DeleteIcon = styled(`span`)`
  width: 20px;
  height: 20px;
  background-color: #006EFF;
  color: white;
  line-height: 20px;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  position: absolute;
  right: -29px;
  top: 9px;
`


const RmqFormItemWrapper = (props) => {
  return (
    <YHFlexSpaceBetwenDiv style={ {position: 'relative', width: 'calc(100% - 38px)' }}>
      {props.children}
    </YHFlexSpaceBetwenDiv>
  )
}

const BrokerFormWrapper = styled(`div`)`
    width: calc(100% - 38px);
    position: relative;
    padding-top: 10px;
    margin-top: 10px;
  `

function RocketMqModal(props) {
  let { clusterData, id } = props // 如果为undefined 则是编辑
  let [ clusterObj, setClusterObj ] = useState(Object.assign( {}, initialRocketMqObj)); // modal数据对象
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
    labelCol: { span: 0 },
    wrapperCol: { span: 24 }
  };






  const getConsoleFormItems = ()=> {

    const formItems = clusterObj.consoleInstances && clusterObj.consoleInstances.map((broker, index) => (
      <RmqFormItemWrapper key={'broker_item_' + index}>
         
        <QuarterFormItem
          {...formItemInstanceLayout}
          label=""
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
          <DeleteIcon onClick={()=>{deleteConsole(broker.key)}} >-</DeleteIcon>
        </Tooltip>
                       
      </RmqFormItemWrapper>
    ))



    formItems.push(
      <YHFlexSpaceBetwenDiv key={'add_btn_broker'}>
        <span onClick= {addConsole} style={{color: '#2277DA', cursor: 'pointer'}}>+ 添加Console </span>
      </YHFlexSpaceBetwenDiv>
    )

 
    let content = (
      <InstanceWrapper title="Console"> {formItems} </InstanceWrapper>
    )
   

    return content

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
      <RmqFormItemWrapper key={nameServer.key}>

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
        
        <Tooltip title="删除">
                <DeleteIcon onClick = { ()=>{deleteNameServer(nameServer.key)}}>-</DeleteIcon>

        </Tooltip>

               

      </RmqFormItemWrapper>
    ))



    formItems.push(
      <YHFlexSpaceBetwenDiv key={'add_btn_broker'}>
        <span onClick= {addNameServer} style={{color: '#2277DA', cursor: 'pointer'}}>+ 添加Name Server</span>
      </YHFlexSpaceBetwenDiv>
    )


    let content = (
      <InstanceWrapper title="Name Server"> {formItems} </InstanceWrapper>
    )

    return content


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


  

  const getBrokerFormItems = () => {
 
    const formItems = clusterObj.brokerInstances && clusterObj.brokerInstances.map((consoleGroup, index) => {
      
   
    return (
        <BrokerFormWrapper key={consoleGroup.key}>
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
                    })(<Input addonBefore={idx == 0 ? "主": "备"  } placeholder="ip"></Input>)}
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


                <Tooltip title="删除">
                  <DeleteIcon style={{top: 45}} onClick={()=>{deleteBroker(consoleGroup.key)}} >-</DeleteIcon>
                </Tooltip>


              </YHFlexSpaceBetwenDiv>
              )


              
          }

          </BrokerFormWrapper>
      );
    })

    formItems.push(
      <YHFlexSpaceBetwenDiv key={'add_btn_broker'}>
        <span onClick= {addBroker} style={{color: '#2277DA', cursor: 'pointer'}}>+ 添加Broker </span>
      </YHFlexSpaceBetwenDiv>
    )



    let content = (
      <InstanceWrapper title="Broker"> {formItems} </InstanceWrapper>
    )
    return content

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



  const formItemBasicLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 }
  };

  return(
    <Modal
      modalName = {`创建rocketMQ集群`}
      visible={tableModalVisibility.visible}
      width={'60%'}
      handleCancel={handleCancel}
      handleOk= {handleOK}
      okText="确定"
      cancelText="取消"
    >

      <Form>

        <div className="cluster-form-basic">
                
          <Form.Item {...formItemBasicLayout} labelAlign="left" label="集群名称">
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
          <Form.Item {...formItemBasicLayout} labelAlign="left" label="集群描述">
            {getFieldDecorator("params.summary", {
              initialValue: clusterObj.summary,
              rules: [
                {
                  required: true,
                  message: "请输入描述信息"
                }
              ]
            })(<Input placeholder="请输入概要"></Input>)}
          </Form.Item>
          <Form.Item {...formItemBasicLayout} labelAlign="left" label="租户名称">
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
            labelAlign="left"
            label={ '集群版本:'}
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


        </div>
        <Divider />


        {
          getConsoleFormItems()
        }
        
  

        <Divider />

        {
          getNameServerForms()

        }
        
        <Divider />

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
