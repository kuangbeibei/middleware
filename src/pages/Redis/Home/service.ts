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
            return res.data.redisClusters
        } catch (e) {
            return res
        }
    }).catch(e => e.message)
}

// 创建
export async function createCluster(data, config) {
    return post(`/mid/v1/deployTask`, data, config).then(res => {
        if (res.code === 200) {
            return true
        } else {
            return res
        }
    }).catch(e => e.message)
}

//  修改
export async function updateCluster(taskId, data, config) {
    return post(`/mid/v1/updateParams/redis/${taskId}`, data, config).then(res => {
        if (res.code === 200) {
            return true
        } else {
            return res
        }
    }).catch(e => e.message)
}

// 部署
export async function deployClusterApi(taskId) {
    return get(`/mid/v1/runTask/redis/${taskId}`).then(res => {
        if (res.code === 200) {
            return true
        } else {
            return res
        }
    }).catch(e => e.message)
}

// 获取某个taskId的配置详情
export async function getConfigDetail(taskId) {
    return get(`/mid/v1/configInfo/redis/${taskId}`).then(res => {
        try {
            return res.data
        } catch (e) {
            return res
        }
    }).catch(e => e.message)
}

// 获取某个taskId的日志打印数据
export async function deployTaskOutput(taskId) {
    return get(`/mid/v1/deployTaskOutput/${taskId}`).then(res => {
        try {
            if (res.data) {
                return {
                    loginfo: res.data
                }
            } else {
                return res
            }
        } catch (e) {
            return res
        }
    }).catch(e => e.message)
}

// 集群拓扑
export async function deployEntryDetail(taskId) {
    return get(`/mid/v1/deployEntryDetail/redis/${taskId}`).then(res => {
        try {
            return res.data.nodes && {
                nodes: res.data.nodes
            }
        } catch (e) {
            return res
        }
    }).catch(e => e.message)
}

// 删除集群
export async function delCluster(id) {
    return del(`/mid/v1/delete/redis/${id}`).then(res => {
        if (res.code === 200) {
            return  true
        } else {
            return false
        }
    }).catch(e => e.message)
}


// 释放集群
export async function releaseCluster(taskId) {
    return del(`/mid/v1/releaseTaskResources/redis/${taskId}`).then(res => {
         if (res.code === 200) {
            return true
        } else {
            return false
        }
    }).catch(e => e.message)
}

// 获取某特taskId的详情
export async function getClusterDetail(taskId) {
    return get(`/mid/v1/params/redis/${taskId}`).then(res => {
        try {
            return res.data && {
                detail: {
                    params: res.data
                }
            }
        } catch (e) {
            return res
        }
    }).catch(e => e.message)
}

// 轮询状态
export async function checkStatus(rely) {
    return get(`/mid/v1/taskStatus/${rely}`).then(res => res).catch(e => e.message)
}

// 获取租户ID-list
export async function getTenantInfo() {
    return get(`http://manager.dev.yonghui.cn/api-uum//tenant/os/list`).then(res => {
        console.log('res', res);
    })
}

// 查找租户ID
export async function searchTenantInfo(rely) {
    return get(`/admin/iaas/compute/servers/detail?all_tenants=1&name=${rely}`).then(res => {
        try {
            return res.data.servers
        } catch (e) {
            return res
        }
    }).catch(e => e.message)
}



