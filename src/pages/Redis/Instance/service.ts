/*
 * @Author: kuangdan 
 * @Date: 2019-11-20 14:58:01 
 * @Last Modified: 2019-11-20 14:58:01 
 */ 

import { get, post, put, del } from '@api'

export async function getClusterDetail(taskId) {
    return get(`/mid/v1/params/redis/${taskId}`).then(res => {
        try {
            return res.data.data
        } catch (e) {
            return res
        }
    }).catch(e => e.message)
}