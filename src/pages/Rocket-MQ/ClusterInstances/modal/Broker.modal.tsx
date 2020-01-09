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
import { addBrokerInstance, updateBrokerTaskInfo } from '../service'
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
    brokerInstances: [{
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
    }],
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
  let { brokerData, id, taskId } = props // 如果为undefined 则是编辑
  let [ clusterObj, setClusterObj ] = useState(Object.assign( {}, initialRocketMqObj)); // modal数据对象
  let [ addFlag, setAddFlag ] = useState<boolean>(true); // 默认为添加

  // let { match: { params: { id: clusterId } } } = props

  
  const { 
    clusterId,
    tenantList,
    getRmqList,
    tableModalVisibility,
    setTableModalVisibility,
    getInstancesList,
    form: { getFieldDecorator, getFieldsValue, getFieldValue, setFieldsValue, validateFields },
  } = props
  
  console.log('broker.modal-执行---->>>>>>>');

  const handleCancel = () => {
    setTableModalVisibility()
  }

  const check = (callback) => {
    validateFields(err => {
      if (!err) {
        let { params } = getFieldsValue()
        if (!params) {
          return message.warning("Broker 实例至少需要添加一个")
        }
        // let { brokerInstances } = params
        // let list: any = [brokerInstances]
        // if (list.some(item => !item || Object.values(item).length <=0)) {
        //   return message.warning("Broker 实例至少需要添加一个")
        // }
        callback()
      } else {
        message.warning('信息填写不完全')
      }
    })
  }

  const fomatData = ()=>{
    const { form: { getFieldsValue, validateFields } } = props;
    let values = getFieldsValue()
    console.log(values, 'dsdsdd')
    console.log('点击了确定按钮，获取到的表单的值为', values.params)
    let { params } = values

    let brokersData:any = []
    params && params.brokerInstances && Object.values(params.brokerInstances).forEach((item: any)=> {
      brokersData.push(...item.data)
    })
    let datas: any = [ brokersData ]
    datas.forEach(list => list.forEach(item => item.port = Number(item.port)))
    
    const postParam = {
      type: 'rmqBroker',
      params: {
        clusterId: Number(clusterId),
        brokerInstances: brokersData,

      }
    }
    return postParam
  }

  const handleOK = () => {
    let postData = fomatData()

    check( async ()=>{
      if (addFlag) {

        console.log(postData, 'post')
        // return 
        addBrokerInstance(postData).then((data) => {
          if(data.taskId) {
            message.success("添加成功")
            getInstancesList() // 从新获取列表
            setTableModalVisibility()
          } 
        }).catch((err)=>message.warning(err.toString()))
      } else {
        updateBrokerTaskInfo(taskId, postData.params).then((data) => {
          if(data.taskId) {
            message.success("编辑成功")
            getInstancesList()
            setTableModalVisibility()
          }
        }).catch(err=>message.warning(err.toString()))
      }
    })
    
  }

  useEffect(()=>{
    console.log('load success')
    if (brokerData) {
      setAddFlag(false)
      setClusterObj(formatEditData(brokerData))
    }
    setTableModalVisibility();
  }, [])


  const formatEditData = (editBrokerData)=> {
    // 格式化，添加key
    let { brokerInstances  } = editBrokerData
    if (brokerInstances) {
      editBrokerData.brokerInstances = brokerInstances.reduce((arr, item, index) => {
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
    return editBrokerData
  }



  const formItemInstanceLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 }
  };



  

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


                <Tooltip title="删除" >
                  <DeleteIcon style={{top: 45, display: index ==0 ? 'none': 'auto'}} onClick={()=>{deleteBroker(consoleGroup.key)}} >-</DeleteIcon>
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
      modalName = {`添加Broker实例`}
      visible={tableModalVisibility.visible}
      width={'60%'}
      handleCancel={handleCancel}
      handleOk= {handleOK}
      okText="确定"
      cancelText="取消"
    >

      <Form>

        {/* <div className="cluster-form-basic">
                
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

        } */}
        
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
