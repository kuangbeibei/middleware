/*
 * @Author: kuangdan 
 * @Date: 2019-12-30 18:16:01 
 * @Last Modified: 2019-12-30 18:16:01 
 */ 

import * as React from "react";
import LogsModal from "@com/Terminal-log.modal"

const MysqlMoal = (props) => <LogsModal logs={props.loginfo} {...props} />

export default MysqlMoal