import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";
import Modal from "@com/Modal";
import { YhText } from "@styled/Text";
import { YhTerminal } from "@styled/Terminal";
import {LogLineWrapper, LogLineNumber, LogLineContent } from '@styled/Log'
import LogItem from './LogModal/Log.Item';

import { processLog } from "@funcs/Log-process";
import './log.modal.less'
function LogModal(props) {
  let { tableModalVisibility, setTableModalVisibility, logInfo } = props

  // logInfo是一个数组
  

  const logLine = React.memo((props: any)=>{
    let { count } = props
    return (
      <>
        <LogLineWrapper>
          <LogLineNumber>{count}</LogLineNumber>
              <LogLineContent>
                {props.chilren}
              </LogLineContent>
        </LogLineWrapper>
      </>
    )
  }, props)
  
  let logsSummary = logInfo.reduce((prev, item) => {
    prev += item.output
    return prev
  }, "")

  
  const formatLog = () => {
    let _output;
		if (logsSummary) {
      _output = logsSummary.split(/\n/g);
      let count = 0;
			let resOutput = _output.reduce((prev, cur) => {
        console.log(cur, 'cur----->>>>>>')
        if (cur.trim()==='') { 
          console.log(cur.trim(), 'abcdef')
          return(
            <>
            {prev}
            </>
          ) 
        }
        count++
				return (
					<>
            {prev}

            {/* <div className="log-line"> */}
            <LogLineWrapper>
              {/* <span className="line-number"> {count} </span> */}
              <LogLineNumber>{count}</LogLineNumber>
              <LogLineContent>
                <YhText
                  className = "line-content"
                  type={
                    cur.startsWith("ok")
                      ? "success"
                      : cur.startsWith("changed")
                      ? "warning"
                      : cur.startsWith("warning")
                      ? "warning"
                      : cur.startsWith("fatal")
                      ? "fatal"
                      : ""
                    }
                  >
                  {cur}
                </YhText>
              </LogLineContent>

            {/* </div> */}
            </LogLineWrapper>
					</>
				);
      }, "");
      
			return <>{resOutput}</>;
		} else {
			return null;
		}
  }


  const handleOK = ()=>{

  }

  const handleCancel = ()=>{
    setTableModalVisibility()
  }

  useEffect(()=>{
    setTableModalVisibility()
  }, [])

  return (
    <Modal
      modalName = {`日志详情`}
      visible={tableModalVisibility.visible}
      width={'60%'}
      handleCancel={handleCancel}
      handleOk= {handleOK}
    >
			<YhTerminal width={1200}>
        <div className="log-container modal-log">
          {/* <pre> */}
          <LogItem>
            {formatLog()}
            {/* {processLog(logsSummary)} */}
          </LogItem>
          
          
          {/* </pre> */}
        </div> 
			</YhTerminal>
     
    </Modal>
  )
}

export default connect((state: any)=>(
  {
    tableModalVisibility: state.tableModalVisibility
  }
),
(dispatch)=>({
  setTableModalVisibility: bindActionCreators(
    setTableModalVisibility,
    dispatch
  )
})
)(LogModal)