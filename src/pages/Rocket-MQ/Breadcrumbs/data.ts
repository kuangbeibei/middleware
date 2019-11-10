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

const RegExpOfParamPath = /\/:\w+/g;
    
children.forEach(item => {
    let {
        path
    } = item;
    if (RegExpOfParamPath.test(path)) {
        path = path.replace(RegExpOfParamPath, '');
    } 
    breadcrumbNameMap[path] = item.meta.title
})

export default breadcrumbNameMap