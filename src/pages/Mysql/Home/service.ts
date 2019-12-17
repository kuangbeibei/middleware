/*
 * @Author: kuangdan 
 * @Date: 2019-12-16 14:23:32 
 * @Last Modified: 2019-12-16 14:23:32 
 */ 


import { getApi, postApi, delApi, putApi } from '@api'
import {
    ProductApiUrl
} from "@utils/data"

const {
    ProductMysqlApiUrl
} = ProductApiUrl;

// 获取mysql集群列表
export async function getMysqlClusters({name="", status="", type="", tenantId="", userId=""}) {
    return getApi(ProductMysqlApiUrl)(`/v1/clusters?name=${name}&status=${status}&type=${type}&tenantId=${tenantId}&userId=${userId}&page=1&pageSize=100`).then(res => {
        try {
            return res.data
        } catch (e) {
            Promise.reject(e)
        }
    }).catch(e => Promise.reject(e))
}