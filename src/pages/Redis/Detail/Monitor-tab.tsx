/*
 * @Author: kuangdan
 * @Date: 2019-11-27 16:23:45
 * @Last Modified: 2019-11-27 16:23:45
 */

import * as React from "react";
import {clustersMonitorArrayData} from "./data"
import CommonMonitor from "../Instance-Monitor/common.monitor"


export default function (props) {
	return <CommonMonitor {...props} data={clustersMonitorArrayData} type={'cluster'} />
	// CommonMonitor(props, clustersMonitorArrayData, 'cluster')
}
