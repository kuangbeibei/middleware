import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";
import Modal from "@com/Modal";
import { YhText } from "@styled/Text";
import { YhTerminal } from "@styled/Terminal";

function LogModal(props) {
  let { tableModalVisibility, setTableModalVisibility, logInfo } = props

  // logInfo是一个数组
  
  
  let logsSummary = logInfo.reduce((prev, item) => {
    prev += item.output
    return prev
  }, "")

  
  const formatLog = () => {
    let _output;
		if (logsSummary) {
			_output = logsSummary.split(/\n/g);
			let resOutput = _output.reduce((prev, cur) => {
				return (
					<>
						{prev}
						<YhText
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
						<br />
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
				<div>
					<pre>{formatLog()}</pre>
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