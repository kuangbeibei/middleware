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
    ProductMidApiUrl
} = ProductApiUrl;

// 获取mysql集群列表
export async function getMysqlClusters() {
    return getApi(ProductMidApiUrl)(`/v1/clusters`).then(res => {

    }).catch(e => Promise.reject(e))
}