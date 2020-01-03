/*
 * @Author: kevinkang
 * @Date: 2019-12-16 17:30:53
 * @LastEditTime : 2019-12-18 17:08:05
 * @LastEditors  : Please set LastEditors
 */

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";
import Modal from "@com/Modal";
// import PropTypes from 'prop-types'
import { jsPlumb } from 'jsplumb'
import { YHSmallFormItem, YHFlexSpaceAroundDiv } from "@styled/Form";
import './topo.modal.less'
import styled from 'styled-components';
import { YhOp } from "@styled/Button";

import {
  Form,
  Icon,
  Spin
} from 'antd';


const InstanceCard = styled(`div`)`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #4d80e4;
  text-align:center;
  height:82px;
  padding: 5px;
  padding-top: 8px;
  justify-content: space-around;
`;

function TopoModal(props) {
  let [loading, setLoading] = useState(true)


  const { tableModalVisibility, setTableModalVisibility, data } = props
  

  const handleCancel = ()=>{
    setTableModalVisibility()
  }

  const handleOK = ()=>{
    setTableModalVisibility()
  }

  useEffect(()=>{
    setTableModalVisibility();
    setTimeout(()=> {
        let instance:any = jsPlumb.getInstance({
          Connector: ['Flowchart', { curviness: 1 }],
          // Endpoint: ['Dot', { radius: 0.1 }], // 端点为一个圆点
          Endpoint: 'Blank', // 端点为空
          // HoverPaintStyle: { strokeStyle: '#ec9f2e' },
          ConnectionOverlays: [
            // 注释掉，即可去掉箭头
            ['Arrow', {
                location: 1,
                id: 'arrow',
                length: 12,
                width: 10,
                foldback: 0.8
              },
            ],          
            ['Arrow', {
                location: 0,
                id: 'arrow2',
                length: 12,
                width: 10,
                direction: -1,
                foldback: 0.8
              },
            ]

          ],
          Container: 'canvas',
          PaintStyle: { strokeWidth: 1, stroke: '#676161',  } 
        })
        let array = [
          {
            source: 'k1',
            target: 'k2',
            label: 'Broker Discovery',
            labelCss: 'overlay-label',
            anchor: ['Top', 'Right'],
          },
          {
            source: 'k3',
            target: 'k2',
            label: 'Broker Discovery',
            labelCss: 'overlay-label',
            anchor:  ['Left', 'Top'],
          },
          {
            source: 'k3',
            target: 'k4',
            label: 'Send Message',
            labelCss: 'overlay-label',
            anchor:  ['Bottom', 'Left'],
          },
          {
            source: 'k1',
            target: 'k4',
            label: 'Receive Message',
            labelCss: 'overlay-label',
            anchor:  ['Bottom', 'Right'],
          },
          {
            source: 'k2',
            target: 'k4',
            label: 'Routing Info',
            labelCss: 'overlay-label route-label',
            anchor: ['Bottom','Top'],
          }          
        ]
        array.forEach(item => {
          instance.connect({
            overlays: [ 
              ['Label', {
                  label: item.label,
                  cssClass: item.labelCss,
                  location: 0.5,
                },
              ],  
     
            ],
            source: item.source,
            target: item.target,
            anchor: item.anchor
          })
        })        
        // 禁止拖拽
        instance.importDefaults({
          ConnectionsDetachable: false
        })
        setLoading(false)
    }, 500)

  }, [])

  
  const NSNodes = useMemo( () => data.nameServers && data.nameServers.map(item => {
    return (
      <InstanceCard key={item.id}>
        <Icon type="database" />
        #{item.id}
      </InstanceCard>
    )

  }) , [data])

  const BrokerNodes =useMemo (()=> data.brokers && data.brokers.map(item => {
    return (
      <InstanceCard key={item.id}>
        <Icon type="database" />
        #{item.id}
      </InstanceCard>
    )

  }), [data])


  const TopoDataDiv = React.memo((props) => {
    return (
      <YHFlexSpaceAroundDiv className="icon-wrapper">
          {props.children}
      </YHFlexSpaceAroundDiv>
    )
  })


  const TextWrapper = React.memo((props) => {
    return (
      <div className="text-wrapper">
        {props.children}
      </div>
    )
  })

  const TopoCard = React.memo(({children, ...props}:any) => {
    return (
      <div {...props} className={`card ${ props.className }` } >
        {children}
      </div>  
    )
  })


  const goToRmqDetailPage = () => {
		props.history.push(`/middleware/rocketmq/detail/${data.rmqCluster.id}`);
  }

  const MoreDetail = React.memo((props) => {
    return (
      <YhOp 
        onClick={goToRmqDetailPage}
        color="blue" 
        style = {{
          position: 'absolute',
          bottom: 8,
          right: 2,
          fontSize: 12,
          color: '#4d80e4'
        }}>
        更多..
      </YhOp>
    )
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

          {/* <div id="k1" className="card consumer">
            <TopoDataDiv>
              <Icon type="solution" />
            </TopoDataDiv>
            <TextWrapper>
              Consumer
            </TextWrapper>
          </div> */}

          <TopoCard id="k1" className="consumer">
            <TopoDataDiv>
              <Icon type="solution" />
            </TopoDataDiv>
            <TextWrapper>
              Consumer
            </TextWrapper>
          </TopoCard>

          <TopoCard id="k3" className="producer">
            <TopoDataDiv>
              <Icon type="solution" />
            </TopoDataDiv>
            <TextWrapper>
              Producer
            </TextWrapper>
          </TopoCard>   


          <TopoCard id="k2" className="name-server">
            <TopoDataDiv>
              {NSNodes}
            </TopoDataDiv>
            <TextWrapper>
              NameServer({NSNodes.length})
            </TextWrapper>
            {NSNodes.length > 4 ? <MoreDetail/> : null }
          </TopoCard> 

          <TopoCard id="k4" className="broker">
            <TopoDataDiv>
              { BrokerNodes }
            </TopoDataDiv>
            <TextWrapper>
              broker({BrokerNodes.length})
            </TextWrapper>
            {BrokerNodes.length > 4 ? <MoreDetail/> : null }
          </TopoCard>  

  

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
