/*
 * @Author: kuangdan 
 * @Date: 2019-12-03 14:16:50 
 * @Last Modified: 2019-12-03 14:16:50 
 */ 
import * as React from "react";
import { machineMonitorArrayData } from "./data";

import CommonMonitor from "./common.monitor"

export default function (props) {
    return <CommonMonitor {...props} data={machineMonitorArrayData} type={'machine'} />
    // return CommonMonitor(props, machineMonitorArrayData, 'machine')
}