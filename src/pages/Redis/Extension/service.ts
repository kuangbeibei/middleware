/*
 * @Author: kuangdan 
 * @Date: 2019-11-25 14:32:07 
 * @Last Modified: 2019-11-25 14:32:07 
 */ 
import { get, post, put, del } from '@api'

// 获取扩容列表
export async function getRedisExtendList(id) {
    return get(`/mid/v1/deployList/redisExtend/1/100/${id}`).then(res => {
         try {
            return res.data.data.redisClusters
        } catch (e) {
            return new Error(res) 
        }
    }).catch(e => e.message)
}

// 创建扩容实例
export async function createExtension(data) {
    return post(`/mid/v1/deployTask`, data).then(res => {
        
    }).catch(e => e.message)
}

// 获取扩容实例详情
export async function getExtensionDetail(taskId) {
    return get(`/mid/v1/params/redisExtend/${taskId}`).then(res => {
        try {
            return {
                params: res.data.data
            }
        } catch (e) {
            return res
        }
    }).catch(e => e.message)
}
