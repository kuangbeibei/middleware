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
import './topo.modal.less'

import {
  Form,
  Input,
  Select,
  Icon,
  Spin
} from 'antd';



function TopoModal(props) {
  
  let [loading, setLoading] = useState(true)

  
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
          source: 'k1', target: 'k2', paintStyle: { strokeWidth: 2, stroke: 'black' }, anchor: 'Continuous'
        })
        instance.connect({
          source: 'k2', target: 'k3', paintStyle: { strokeWidth: 2, stroke: 'black' }, anchor: 'Continuous'
        })
        instance.connect({
          source: 'k3', target: 'k4', paintStyle: { strokeWidth: 2, stroke: 'black' }, anchor: 'Continuous'
        })
        instance.connect({
          source: 'k4', target: 'k1', paintStyle: { strokeWidth: 2, stroke: 'black' }, anchor: 'Continuous'
        })
        instance.connect({
          connector: 'Straight',
          source: 'kcenter', target: 'k4', paintStyle: { strokeWidth: 2, stroke: 'black' }, anchor: 'Continuous'
        }) 
        instance.connect({
          connector: ['Straight'],
          source: 'kcenter', target: 'k2', paintStyle: { strokeWidth: 2, stroke: 'black' }, anchor: 'Continuous'
        })                      
        // 禁止拖拽
        instance.importDefaults({
          ConnectionsDetachable: false
        })
 
        setLoading(false)

    }, 500)

  }, [])




  const formItemBasicLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 }
  };

  
  const solutionIcons = Array.from({length: 3}).map((item,index) => {
    return (<Icon key={index} type="solution" />)
  })

  return(
    <Modal
      modalName = {`拓扑图`}
      visible={tableModalVisibility.visible}
      width={'60%'}
      handleCancel={handleCancel}
      handleOk= {handleOK}
    >
      <Spin spinning={loading}>
        <div className="topo-container">

          <div  id="k1" className="card consumer">
            <YHFlexDiv className="icon-wrapper">
              { solutionIcons }
            </YHFlexDiv>
            <div className="text-wrapper">
              消费者
            </div>
          </div>

          <div id="k3" className="card producer">
            <YHFlexDiv className="icon-wrapper">
              { solutionIcons }
            </YHFlexDiv>
            <div className="text-wrapper">
              生产者
            </div>
          </div>   


          <div id="k2" className="card name-server">
            <YHFlexDiv className="icon-wrapper">
              <Icon type="database" />
            </YHFlexDiv>
            <div className="text-wrapper">
              NameServer
            </div>
            {/* <div className="tip">
              每隔10秒扫描还存活的broker连接，2分钟没有发送心跳的broker连接会被关闭。
            </div> */}
          </div> 

          <div id="k4" className="card broker">
            <YHFlexDiv className="icon-wrapper">
              <Icon type="database" />
            </YHFlexDiv>
            <div className="text-wrapper">
              broker
            </div>
            {/* <div className="tip">
              每隔10秒扫描还存活的连接，2分钟没有发送心跳的连接会被关闭。
            </div> */}
          </div>  

          {/* <div id="kcenter" className="card center">
              <div> 长连接 </div>
              <div> 心跳： broker每隔30s向NameServer发送心跳（包含自身的topic信息）</div>
          </div> */}

        </div>
      </Spin>
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
