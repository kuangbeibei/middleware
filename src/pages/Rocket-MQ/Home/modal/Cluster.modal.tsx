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

// RocketMqModal.propTypes = {
//   name: PropTypes.string.isRequired
// }
// RocketMqModal.defaultProps = {
  
// }

// interface ConsoleObj  {

// }

// interface ConsoleItem {

// }
let count = 0;

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
    // console.log('dddd------>>>')
    // getFieldDecorator('params.consoleList', {initialValue: clusterObj.consoleList })
    // console.log('2222')
    // const consoleLists = getFieldValue('params.consoleList')
    // console.log('3333', consoleLists)
    const formItems = clusterObj.consoleList.map((consoleGroup, index) => {
    // const formItems = consoleLists.map((item, index) => {
      
    // console 必须一主一备，这里iteme也是一个数组
    return (
        // <div style={{border: '1px solid red'}}>
        <div style={{border: '3px dotted wheat', paddingTop: 24, marginTop: 15}}>
          {
            consoleGroup.map((item, idx) => 
              <YHFlexSpaceBetwenDiv>
                {/* <Form.Item
                  style= {{width: 15}}
                  // {...formItemBasicLayout}
                  label={idx ? '备': '主'}
                >

                </Form.Item> */}
                <YHSmallFormItem
                  {...formItemBasicLayout}
                  label={ '版本' + ( idx ? '(备)': '(主)') }
                >
                  {getFieldDecorator(`params.consoleList[${index}][${idx}].version`, {
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
                  {getFieldDecorator(`params.consoleList[${index}][${idx}].ip`, {
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
                  {getFieldDecorator(`params.consoleList[${index}][${idx}].port`, {
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
                  {getFieldDecorator(`params.consoleList[${index}][${idx}].username`, {
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
                  {getFieldDecorator(`params.consoleList[${index}][${idx}].username`, {
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
      <YHFlexSpaceBetwenDiv>
        <Button type="primary" onClick={addConsole} style={{marginTop: 10}}> 
          添加 
          <Icon type="plus-circle" /> 
        </Button>
      </YHFlexSpaceBetwenDiv>
    )
    return formItems;
  }
  const addConsole = () => {
    let consoleList = clusterObj.consoleList
    consoleList.push([
      {
        ip: '',
        type: 'Master',
      },
      {
        ip: '',
        type: 'vice'
      }
    ])
    setClusterObj(
      Object.assign({},
      clusterObj,
      {
        consoleList: consoleList
      }
      )
    )
  }

  const getBrokerFormItems = ()=> {

    const formItems = clusterObj.brokerList.map((broker, index) => (
      <YHFlexSpaceBetwenDiv>
              <YHSmallFormItem
                  {...formItemBasicLayout}
                  label="版本"
                >
                  {getFieldDecorator(`params.brokerList[${index}].version`, {
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
                  {getFieldDecorator(`params.brokerList[${index}].ip`, {
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
                  {getFieldDecorator(`params.brokerList[${index}].port`, {
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
                  {getFieldDecorator(`params.brokerList[${index}].username`, {
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
                  {getFieldDecorator(`params.brokerList[${index}].password`, {
                    initialValue: broker.password,
                    rules: [
                      {
                        required: true,
                        message: "密码必填"
                      }
                    ]
                    })(<Input placeholder="请输入密码"></Input>)}
                </YHSmallFormItem>   
                
                {/* <YHSmallFormItem> */}
                  {/* <Button type="primary"> */}
                    <Tooltip title="删除">
                    {/* color: '#f5222d' */}
                    <Icon style={{fontSize: 25, marginBottom: 24, cursor: 'pointer'}} type="minus-circle" />
                    </Tooltip>
                  {/* </Button>   */}
                {/* </YHSmallFormItem> */}
                       

      </YHFlexSpaceBetwenDiv>
    ))
    formItems.push(
      <YHFlexSpaceBetwenDiv>
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
      password: ''
    })
    setClusterObj(
      Object.assign({},
      clusterObj,
      brokerList
      )
    )
  }

  const getNameServerForms = () => {


    // getFieldDecorator('nameServerList', { initialValue: [] })

    // const formItems = getFieldValue('nameServerList').map((nameServer, index) =>(
    console.log('get ---->>>>', clusterObj.nameServerList)
    console.log(getFieldValue('params'), 'abcdefg')

    const formItems = clusterObj.nameServerList.map((nameServer, index) =>(
      <YHFlexSpaceBetwenDiv key={nameServer.key}>
      <YHSmallFormItem
          key={index+'_version'}
          {...formItemBasicLayout}
          label="版本"
        >
          {getFieldDecorator(`params.nameServerList[${index}].version`, {
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
          {getFieldDecorator(`params.nameServerList[${index}].ip`, {
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
          {getFieldDecorator(`params.nameServerList[${index}].port`, {
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
          {getFieldDecorator(`params.nameServerList[${index}].username`, {
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
          {getFieldDecorator(`params.nameServerList[${index}].password`, {
            initialValue: nameServer.password,
            rules: [
              {
                required: true,
                message: "密码必填"
              }
            ]
            })(<Input placeholder="请输入密码"></Input>)}
        </YHSmallFormItem>   
        
        {/* <YHSmallFormItem> */}
          {/* <Button type="primary"> */}
            <Tooltip title="删除">
            {/* color: '#f5222d' */}
            <Icon onClick = { ()=>{deleteNameServer(index)}} style={{fontSize: 25, marginBottom: 24, cursor: 'pointer'}} type="minus-circle" />
            </Tooltip>
          {/* </Button>   */}
        {/* </YHSmallFormItem> */}
               

      </YHFlexSpaceBetwenDiv>
    ))

    formItems.push(
      <YHFlexSpaceBetwenDiv>
        <Button  type="primary" onClick={addNameServer} style={{marginTop: 10}}> 
         添加 
         <Icon type="plus-circle" /> 
        </Button>
      </YHFlexSpaceBetwenDiv>
    )
    return formItems;

  }
  const deleteNameServer = (index) => {
    let clonneObj = deepCloneObject(clusterObj)
    let { nameServerList } = clonneObj
    console.log(index, '删除的index')
    nameServerList.splice(index, 1)
    console.log(JSON.stringify(nameServerList), 'kevinnn')
    console.log(Object.assign({}, clonneObj, {  }));
    setClusterObj(
      Object.assign({},
      clusterObj,
      {
        nameServerList: nameServerList
      }
      )
    )
    // let nameServerList_ = getFieldValue('params.nameServerList')
    // console.log(nameServerList_)
    // nameServerList_.splice(index, 1)
    // setFieldsValue({
    //   'nameServerList': nameServerList_
    // })
    
  }
  const addNameServer = () => {
    let nameServerList = clusterObj.nameServerList
    nameServerList.push({
      version: '4.3.9',
      ip: '',
      port: '',
      username: 'eee',
      password: '',
      key: Date.now()
    })
    setClusterObj(
      Object.assign({},
      clusterObj,
      {
        nameServerList: nameServerList
      }
      )
    )
    // let nameServerList = getFieldValue('nameServerList')
    // console.log(nameServerList, 'kevinn----')
    // nameServerList.push({
    //   version: '4.3.9',
    //   ip: '',
    //   port: '',
    //   username: '',
    //   password: ''
    // })
    // setFieldsValue({
    //   'nameServerList': nameServerList
    // })
  }


  const getNameServerForms22 = () => {

    // getFieldDecorator('keys', { iniialValue: [] })

    // getFieldDecorator('nameServerList', { initialValue: [] })

    const formItems = clusterObj.list.map((item, index) =>(
      <div>
        <Form.Item {...formItemBasicLayout} label="集群名称" style={{width: '50%', display: 'inline-block'}}>
					{getFieldDecorator(`params.list[${index}].name`, {
						initialValue: item.name,
						rules: [
							{
								required: true,
								message: "请输入集群名称"
							}
						]
					})(<Input placeholder="请输入集群名称"></Input>)}

        </Form.Item>
               
        <Tooltip title="删除">
            {/* color: '#f5222d' */}
            <Icon onClick = { ()=>{deletet(index)}} style={{fontSize: 25, marginBottom: 24, cursor: 'pointer'}} type="minus-circle" />
            </Tooltip>
      </div>
    ))

    formItems.push(
      <YHFlexSpaceBetwenDiv>
        <Button  type="primary" onClick={addd} style={{marginTop: 10}}> 
         添加 
         <Icon type="plus-circle" /> 
        </Button>
      </YHFlexSpaceBetwenDiv>
    )
    return formItems;

  }
  const deletet = (index) => {
    let _testList = deepCloneObject(clusterObj.list);
    _testList.splice(index, 1);
    // settestList(testList => _testList);
    let newClusterObj = deepCloneObject(clusterObj);
    newClusterObj.list = _testList;
    setClusterObj(newClusterObj)
  }
  
  const addd = ()=>{
    let _testList = deepCloneObject(clusterObj.list);
    _testList.push({ name: count++ });
    let newClusterObj = deepCloneObject(clusterObj);
     newClusterObj.list = _testList;
    // settestList( testList => _testList)
     setClusterObj(newClusterObj)
  }

  const adjustPostParams = (key, val) => {
		const {
			form: { getFieldsValue }
		} = props;
		let newPostParams = Object.assign({}, getFieldsValue());
		newPostParams[key] = val;
		setClusterObj(newPostParams);
	};


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

        <Divider> Test </Divider>

        {
          getNameServerForms22()

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
