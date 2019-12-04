/*
 * @Author: kuangdan
 * @Date: 2019-12-03 14:16:50
 * @Last Modified: 2019-12-03 14:16:50
 */
import { nodeMonitorArrayData } from "./data";
import CommonMonitor from "./common.monitor"

export default function (props) {
    return CommonMonitor(props, nodeMonitorArrayData, 'node')
}