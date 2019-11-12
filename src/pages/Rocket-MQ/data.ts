/*
 * @Author: kuangdan
 * @Date: 2019-11-11 18:24:14
 * @Last Modified: 2019-11-11 18:24:14
 */

import { RocketmqRoutesMap } from "@router/config";
import { generateBreadcrumbsData } from "@tools";

// 生成面包屑数据
// {
//     "/rocketmq": "RMQ集群",
//     "/rocketmq/rmqbroker": "Broker列表",
//     "/rocketmq/rmqconsole": "Console列表",
//     "/rocketmq/rmqnameserver": "NameServer列表"
// }
export const RocketmqRouteProps = generateBreadcrumbsData(RocketmqRoutesMap);
