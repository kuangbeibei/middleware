/*
 * @Author: kevinkang
 * @Date: 2019-12-16 17:30:53
 * @LastEditTime: 2019-12-16 18:26:33
 * @LastEditors: Please set LastEditors
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";
import Modal from "@com/Modal";


function RocketMqModal(props) {
  
  const { 
    tableModalVisibility,
    setTableModalVisibility
  } = props
  
  const handleCancel = ()=>{
    setTableModalVisibility()
  }

  const handleOK = ()=>{
    console.log('点击了确定按钮---->>>>>>');
  }
  return(
    <Modal
      modalNamee = {`创建rocketMQ集群`}
      visible={tableModalVisibility.visible}
      width={'60%'}
      handleCancel={handleCancel}
    >
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
)