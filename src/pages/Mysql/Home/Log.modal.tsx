/*
 * @Author: kuangdan 
 * @Date: 2019-12-30 18:16:01 
 * @Last Modified: 2019-12-30 18:16:01 
 */ 

import * as React from "react";
import LogsModal from "@com/Log-modal/Terminal-log.modal"
import LogGroupModal from "@com/Log-modal/Terminal-log.group"

const MysqlMoal = (props) => <LogGroupModal logs={props.loginfo} {...props} />

export default MysqlMoal