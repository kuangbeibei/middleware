import * as React from "react";

import LogGroupModal from "@com/Log-modal/Terminal-log.group"

const RocketmqLoglMoal = (props) => <LogGroupModal logs={props.logInfo} {...props} />

export default RocketmqLoglMoal

// function LogModal(props) {
//   let { tableModalVisibility, setTableModalVisibility, logInfo } = props

//  // TODO 将style-components下面的LOG相关 和 Log.Group整合到一个文件夹
//   const LogLine = (props:any)=>{
//     let { count } = props
//     return (
//       <>
//         <LogLineWrapper>
//           <LogLineNumber>{count}</LogLineNumber>
//               <LogLineContent>
//                 { props.children ?  props.children : null}
//               </LogLineContent>
//         </LogLineWrapper>
//       </>
//     )
//   }
  
//   let logsSummary = logInfo.reduce((prev, item) => {
//     prev += item.output
//     return prev
//   }, "")

  
//   const formatLog = (logsSummary) => {
//     let _output;
// 		if (logsSummary) {
//       _output = logsSummary.split(/\n/g);
//       let count = 0;
// 			let resOutput = _output.reduce((prev, cur) => {
//         if (cur.trim()==='') { 
//           return(
//             <>
//             {prev}
//             </>
//           ) 
//         }
//         count++
// 				return (
// 					<>
//             {prev}
//             <LogLine count={count}>
//               <YhText
//                   className = "line-content"
//                   type={
//                     cur.startsWith("ok")
//                       ? "success"
//                       : cur.startsWith("changed")
//                       ? "warning"
//                       : cur.startsWith("warning")
//                       ? "warning"
//                       : cur.startsWith("fatal")
//                       ? "fatal"
//                       : ""
//                       }
//                     >
//                     {cur}
//                 </YhText>
//              </LogLine> 


// 					</>
// 				);
//       }, "");
      
// 			return <>{resOutput}</>;
// 		} else {
// 			return null;
// 		}
//   }


//   const handleOK = ()=>{

//   }

//   const handleCancel = ()=>{
//     setTableModalVisibility()
//   }

//   useEffect(()=>{
//     setTableModalVisibility()
//   }, [])

//   return (
//     <Modal
//       modalName = {`日志详情`}
//       visible={tableModalVisibility.visible}
//       width={'60%'}
//       handleCancel={handleCancel}
//       handleOk= {handleOK}
//     >
// 			<YhTerminal height={620} width={1200}>
//         <div>
//           {
//               logInfo.map((logGroupItem, index) =>(
//                 <LogGroup key={index} isUnFold={index==(logInfo.length-1)} title ={logGroupItem.createTime}>
//                   {formatLog(logGroupItem.output)}
//                 </LogGroup>
//               ))
//           }
          
//         </div> 
// 			</YhTerminal>
     
//     </Modal>
//   )
// }

// export default connect((state: any)=>(
//   {
//     tableModalVisibility: state.tableModalVisibility
//   }
// ),
// (dispatch)=>({
//   setTableModalVisibility: bindActionCreators(
//     setTableModalVisibility,
//     dispatch
//   )
// })
// )(LogModal)