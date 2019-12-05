/*
 * @Author: kuangdan 
 * @Date: 2019-12-05 17:56:21 
 * @Last Modified: 2019-12-05 17:56:21 
 */ 

import { getApi, postApi, delApi, putApi } from '@api'

import {
    ProductApiUrl
} from "@utils/data"

export const getAlarmBasicList = (clusterType = "redis") => {
    return getApi(ProductApiUrl.ProductAlarmApiUrl)(`/mw/strategy/list?clusterType=${clusterType}`).then(res => {
        
    })
}