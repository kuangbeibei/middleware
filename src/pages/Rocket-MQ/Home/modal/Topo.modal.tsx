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
import { YHSmallFormItem, YHFlexSpaceAroundDiv } from "@styled/Form";
import './topo.modal.less'

import {
  Form,
  Icon,
  Spin
} from 'antd';



function TopoModal(props) {
  
  let [loading, setLoading] = useState(true)

  
  const { tableModalVisibility, setTableModalVisibility, data } = props
  

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
        let instance:any = jsPlumb.getInstance({
          Connector: ['Flowchart', { curviness: 1 }],
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
        let array = [
          ['k1', 'k2'],
          ['k3', 'k2'],
          ['k3', 'k4'],
          ['k1', 'k4']
        ]
        array.forEach(item => {
          instance.connect({
            overlays: [
              ['Arrow', {
                location: 1,
                id: 'arrow',
                length: 14,
                width: 10,
                foldback: 0.8
              },
            ],   
            ['Label', {
              label: "",
              location: 0.5,
              // id: 'arrow',
              // length: 14,
              // width: 10,
              // foldback: 0.8
            },
          ],  
          
          
          ['Arrow', {
            location: -0,
            id: 'arrow222',
            length: 14,
            width: 10,
            direction: -1,
            foldback: 0.8
          },
        ]
                    
            ],
            source: item[0], target: item[1], paintStyle: { strokeWidth: 2, stroke: 'black' }, anchor: 'Continuous'
          })
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

  
  const solutionIcons = Array.from({length: 1}).map((item,index) => {
    return (<Icon key={index} type="solution" />)
  })

  return(
    <Modal
      modalName = {`拓扑图`}
      visible={tableModalVisibility.visible}
      width={'50%'}
      handleCancel={handleCancel}
      handleOk= {handleOK}
    >
      <Spin spinning={loading}>
        <div className="topo-container">

          <div  id="k1" className="card consumer">
            <YHFlexSpaceAroundDiv className="icon-wrapper">
              { solutionIcons }
            </YHFlexSpaceAroundDiv>
            <div className="text-wrapper">
              消费者
            </div>
          </div>

          <div id="k3" className="card producer">
            <YHFlexSpaceAroundDiv className="icon-wrapper">
              { solutionIcons }
            </YHFlexSpaceAroundDiv>
            <div className="text-wrapper">
              生产者
            </div>
          </div>   


          <div id="k2" className="card name-server">
            <YHFlexSpaceAroundDiv className="icon-wrapper">
              <Icon type="database" />
            </YHFlexSpaceAroundDiv>
            <div className="text-wrapper">
              NameServer
            </div>
          </div> 

          <div id="k4" className="card broker">
            <YHFlexSpaceAroundDiv className="icon-wrapper">
              <Icon type="database" />
            </YHFlexSpaceAroundDiv>
            <div className="text-wrapper">
              broker
            </div>
          </div>  

  

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
