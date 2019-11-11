/*
 * @Author: kuangdan 
 * @Date: 2019-11-10 13:06:58 
 * @Last Modified: 2019-11-10 13:06:58 
 */

// Rocketmq 面包屑

import {
    RocketmqRoutesMap
} from "@router/routes";

const overallRoutes = RocketmqRoutesMap.slice(0);

let rocketmqRoutes = (overallRoutes.filter(item => item.key === 'rocketmq'))[0];

let children = rocketmqRoutes.children ? rocketmqRoutes.children : rocketmqRoutes;

let breadcrumbNameMap = {};
  
children.forEach(item => {
    breadcrumbNameMap[item.path] = item.title
})

export default breadcrumbNameMap