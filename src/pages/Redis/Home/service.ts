/*
 * @Author: kuangdan 
 * @Date: 2019-11-18 10:57:50 
 * @Last Modified: 2019-11-18 10:57:50 
 */ 

import { get, post, put, del } from '@api'
 
// 获取redis集群列表
export async function getRedisClusters() {
    return get(`/mid/v1/deployList/redis/1/100`).then(res => {
        try {
            return res.data.data.redisClusters
        } catch (e) {
            return res
        }
    }).catch(e => e.message)
}

// 获取某个taskId的配置详情
export async function getConfigDetail(taskId) {
    return get(`/mid/v1/configInfo/redis/${taskId}`).then(res => {
        try {
            return res.data.data
        } catch (e) {
            return res
        }
    }).catch(e => e.message)
}

// 获取某个taskId的日志打印数据
export async function deployTaskOutput(taskId) {
    return get(`/mid/v1/deployTaskOutput/${taskId}`).then(res => {
        try {
            return res.data.data
        } catch (e) {
            return res
        }
    }).catch(e => e.message)
}