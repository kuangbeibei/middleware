/*
 * @Author: kuangdan
 * @Date: 2019-11-11 18:24:14
 * @Last Modified: 2019-11-11 18:24:14
 */

import { RocketmqRoutesMap } from "@router/config";
import { flattenRoutesAndGenerateBreadcrumbsData } from "@tools";

// 生成面包屑数据
// {
//     "/rocketmq": "RMQ集群",
//     "/rocketmq/rmqbroker/:id": "Broker列表",
//     "/rocketmq/rmqconsole/:id": "Console列表",
//     "/rocketmq/rmqnameserver/:id": "NameServer列表"
// }
export const RocketmqRouteProps = flattenRoutesAndGenerateBreadcrumbsData(RocketmqRoutesMap);
