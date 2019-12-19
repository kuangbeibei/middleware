/*
 * @Author: kevinkang
 * @Date: 2019-12-16 17:30:53
 * @LastEditTime : 2019-12-18 17:08:05
 * @LastEditors  : Please set LastEditors
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";
import Modal from "@com/Modal";
// import PropTypes from 'prop-types'
import { jsPlumb } from 'jsplumb'
import { YHSmallFormItem, YHFlexDiv } from "@styled/Form";


import {
  Form,
  Input,
  Select,
  Icon
} from 'antd';



function TopoModal(props) {
  

  // const initialRocketMqObj:any = {
  //   name: '',
  //   summary: '',
  //   tenant: 't1'
  // }
  
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
    console.log('加载拓扑成功了--->>>>>')
    setTableModalVisibility();

    setTimeout(()=> {
      console.log(jsPlumb)

      // jsPlumb.ready(() => {
        let instance:any = jsPlumb.getInstance({
        // type ConnectorId = "Bezier" | "StateMachine" | "Flowchart" | "Straight" | UserDefinedConnectorId;
          // Connector: ['Straight', { curviness: 1 }],
          // Endpoint: ['Dot', { radius: 0.1 }], // 端点为一个圆点
          Endpoint: 'Blank', // 端点为空
          // HoverPaintStyle: { strokeStyle: '#ec9f2e' },
          ConnectionOverlays: [
            // 注释掉，即可去掉箭头
            // ['Arrow', {
            //   location: 1,
            //   id: 'arrow',
            //   length: 14,
            //   width: 10,
            //   foldback: 0.8
            // }]
          ],
          Container: 'canvas'
        })
        const serviceCards = instance.getSelector('.service-card')
        instance.connect({
          source: 'k1', target: 'k2', paintStyle: { strokeWidth: 1, stroke: 'black' }, anchor: 'Continuous'
          // source: 'k1', target: 'k2', paintStyle: { strokeWidth: 1, stroke: 'red' }, anchor: 'Continuous'
        })
        instance.connect({
          source: 'k2', target: 'k3', paintStyle: { strokeWidth: 1, stroke: 'black' }, anchor: 'Continuous'
          // source: 'k1', target: 'k2', paintStyle: { strokeWidth: 1, stroke: 'red' }, anchor: 'Continuous'
        })
        instance.connect({
          source: 'k3', target: 'k4', paintStyle: { strokeWidth: 1, stroke: 'black' }, anchor: 'Continuous'
          // source: 'k1', target: 'k2', paintStyle: { strokeWidth: 1, stroke: 'red' }, anchor: 'Continuous'
        })
        instance.connect({
          source: 'k4', target: 'k1', paintStyle: { strokeWidth: 1, stroke: 'black' }, anchor: 'Continuous'
          // source: 'k1', target: 'k2', paintStyle: { strokeWidth: 1, stroke: 'red' }, anchor: 'Continuous'
        })     
        // instance.connect({
        //   Connector: 'Straight',
        //   source: 'k2', target: 'k4', paintStyle: { strokeWidth: 1, stroke: 'black' }, anchor: 'Continuous'
        //   // source: 'k1', target: 'k2', paintStyle: { strokeWidth: 1, stroke: 'red' }, anchor: 'Continuous'
        // })                       
        // 禁止拖拽
        instance.importDefaults({
          ConnectionsDetachable: false
        })
 


    }, 500)

  }, [])




  const formItemBasicLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 }
  };

  return(
    <Modal
      modalName = {`拓扑图`}
      visible={tableModalVisibility.visible}
      width={'60%'}
      handleCancel={handleCancel}
      handleOk= {handleOK}
    >
      <div style={{
        // border: '1px solid black',
        position: 'relative',
        height: '700px',
      }}>
         <div
          className="card"
          id={"k1"}
          style={{
            position: 'absolute',
            right: 10,
            top: 'calc(50% - 80px)',
            // top: '50%',
            // transform: 'translateY(50%)',
            width: '280px',
            height: '160px',
            border: '1px solid black'
          }}
         >

          <YHFlexDiv style={{padding: '20px'}}>
            <Icon style={{fontSize: 80, color: '#9e9e9e'}} type="solution" />
            <Icon style={{fontSize: 80, color: '#9e9e9e'}} type="solution" />
            <Icon style={{fontSize: 80, color: '#9e9e9e'}} type="solution" />
          </YHFlexDiv>
          <div style={{
            textAlign: 'center',
            fontSize: 12
          }}>
            消费者
          </div>
         </div>

         <div
          id={"k3"}
          className="card"
          style={{
            position: 'absolute',
            left: 10,
            top: 'calc(50% - 80px)',
            // top: '50%',
            width: '280px',
            height: '160px',
            border: '1px solid black'
          }}
         >
          <YHFlexDiv style={{padding: '20px'}}>
            <Icon style={{fontSize: 80, color: '#9e9e9e'}} type="solution" />
            <Icon style={{fontSize: 80, color: '#9e9e9e'}} type="solution" />
            <Icon style={{fontSize: 80, color: '#9e9e9e'}} type="solution" />
           </YHFlexDiv>
          <div style={{
            textAlign: 'center',
            fontSize: 12
          }}>
            生产者
          </div>
         </div>   


         <div
          id={"k2"}
          className="card"
          style={{
            position: 'absolute',
            top: 10,
            right: 'calc(50% - 200px)',
            width: '400px',
            height: '200px',
            border: '1px solid black'
          }}
         >
            <YHFlexDiv style={{padding: '20px', justifyContent: 'center', paddingTop: '30px'}}>
              <Icon style={{fontSize: 80, color: '#9e9e9e'}} type="database" />
            </YHFlexDiv>
            <div style={{
              textAlign: 'center',
              fontSize: 12
            }}>
              name server
            </div>
         </div> 

         <div
          id={"k4"}
          className="card"
          style={{
            position: 'absolute',
            bottom: 10,
            right: 'calc(50% - 200px)',
            width: '400px',
            height: '200px',
            border: '1px solid black'
          }}
         >
            <YHFlexDiv style={{padding: '20px', justifyContent: 'center', paddingTop: '30px'}}>
              <Icon style={{fontSize: 80, color: '#9e9e9e'}} type="database" />
            </YHFlexDiv>
            <div style={{
              textAlign: 'center',
              fontSize: 12
            }}>
              broker
            </div>
         </div>  


      </div>

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
)(Form.create({})(TopoModal))
