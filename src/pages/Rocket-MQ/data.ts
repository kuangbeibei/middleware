/*
 * @Author: kuangdan 
 * @Date: 2019-11-11 18:24:14 
 * @Last Modified: 2019-11-11 18:24:14 
 */ 

// Rocketmq的面包屑路由

 import {
    RocketmqRoutesMap
} from "@router/routes";

const overallRoutes = RocketmqRoutesMap.slice(0);

let rocketmqRoutes = (overallRoutes.filter(item => item.key === 'rocketmq'))[0];

let childrenRoutes = rocketmqRoutes.children ? rocketmqRoutes.children : rocketmqRoutes;

export default childrenRoutes
