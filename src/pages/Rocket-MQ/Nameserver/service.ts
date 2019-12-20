/*
 * @Author: kuangdan 
 * @Date: 2019-11-08 16:13:12 
 * @Last Modified: 2019-11-08 16:13:12 
 */ 

import { get, post, put, del } from '@api'

// 列表
export async function getDeployListOfRmqNameServer(id) {
    return get(`/mid/v1/deployList/rmqNameServer/1/100/${id}`).then(res => res.data && res.data.data && res.data.data.rmqNameServers).catch(e => e.message)
}

// 创建
export async function deployTask(data) {
    return post(`/mid/v1/deployTask`, data).then(() => {}).catch(e => e.message)
}

// 详情
export async function getRmqNameServer(taskId) {
    return get(`/mid/v1/params/rmqNameServer/${taskId}`).then(res => {}).catch(e => e.message)
}

// 日志
export async function deployTaskOutput(taskId) {
    return get(`/mid/v1/deployTaskOutput/${taskId}`).then(res => {}).catch(e => e.message)
}

// 配置
export async function getConfigInfo(taskId) {
    return get(`/mid/v1/configInfo/rmqNameServer/${taskId}`).then(res => res.data && res.data.data).catch(e => e.message)
}

// 部署
export async function runTask(taskId) {
    return get(`/mid/v1/runTask/rmqNameServer/${taskId}`).then(res => {}).catch(e => e.message)
}

// 卸载/删除
export async function releaseTaskResources(taskId) {
    return del(`/mid/v1/releaseTaskResources/rmqNameServer/${taskId}`).then(res => {}).catch(e => e.message)
}