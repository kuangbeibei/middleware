/*
 * @Author: kuangdan 
 * @Date: 2019-11-18 10:03:36 
 * @Last Modified: 2019-11-18 10:03:36 
 */ 


import { RedisRoutesMap } from "@router/config";
import { flattenRoutesAndGenerateBreadcrumbsData } from "@tools";

// 生成面包屑数据
export const RedisRouteProps = flattenRoutesAndGenerateBreadcrumbsData(RedisRoutesMap);
