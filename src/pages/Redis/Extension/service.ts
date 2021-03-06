/*
 * @Author: kuangdan 
 * @Date: 2019-11-25 14:32:07 
 * @Last Modified: 2019-11-25 14:32:07 
 */ 
import { getApi, postApi, delApi, putApi } from '@api'
import {
    ProductApiUrl
} from "@utils/data"

const {
    ProductRedisApiUrl
} = ProductApiUrl

// 获取扩容列表
export async function getRedisExtendList(id) {
    return getApi(ProductRedisApiUrl)(`/mid/v1/deployList/redisExtend/1/100/${id}`).then(res => {
         try {
            return res.data.redisClusters
        } catch (e) {
            return new Error(res) 
        }
    }).catch(e => Promise.reject(e))
}

// 创建扩容实例
export async function createExtension(data) {
    return postApi(ProductRedisApiUrl)(`/mid/v1/deployTask`, data).then(res => {
        try {
            return res.msg
        } catch (e) {
            return res
        }
    }).catch(e => Promise.reject(e))
}

// 更新扩容实例
export async function updateExtension(data, taskId) {
    return postApi(ProductRedisApiUrl)(`/mid/v1/updateParams/redisExtend/${taskId}`, data).then(res => {
        try {
            return res.msg
        } catch (e) {
            return res
        }
    }).catch(e => Promise.reject(e))
}

// 获取扩容实例详情
export async function getExtensionDetail(taskId) {
    return getApi(ProductRedisApiUrl)(`/mid/v1/params/redisExtend/${taskId}`).then(res => {
        try {
            return {
                params: res.data
            }
        } catch (e) {
            return res
        }
    }).catch(e => Promise.reject(e))
}

// 部署扩容实例
export async function deployExtensionInstance(taskId) {
    return getApi(ProductRedisApiUrl)(`/mid/v1/runTask/redisExtend/${taskId}`).then(res => {
        if (res.code == 200) {
            return res.msg
        } else {
            return res
        }
    }).catch(e => Promise.reject(e))
}

// 删除扩容实例
export async function deleteExtensionInstance(id) {
    return delApi(ProductRedisApiUrl)(`/mid/v1/delete/redisExtend/${id}`).then(res => {
        try {
            return res.msg
        } catch (e) {
            return res
        }
    }).catch(e => Promise.reject(e))
}

