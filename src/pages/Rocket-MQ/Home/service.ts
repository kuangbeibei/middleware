/*
 * @Author: kuangdan 
 * @Date: 2019-11-06 18:12:08 
 * @Last Modified: 2019-11-06 18:12:08 
 */ 

import { getApi, postApi} from '@api'
import {
  ProductApiUrl
} from "@utils/data"

const {
  ProductRocketMqApiUrl,
  ProductUumApiUrl
} = ProductApiUrl;


// TODO 抽取自定义hooks
export const getTenants = async () => {
  return getApi(ProductUumApiUrl)(`/tenant/os/list`).then(res => {
    try {
      if (res.data && Array.isArray(res.data)) {
          return res.data
      }
    } catch (e) {
      return res
    }
  }).catch(e => Promise.reject(e))
}

export const addRocketMqCluster = (params) => {

  return postApi(ProductRocketMqApiUrl)('/mid/v1/deployTask', params).then(res => {
    if (res.code == 200) {
      return res.data
    } else {
      throw new Error('error: ' + res.code  +  res.msg)
    }
  }).catch(e => Promise.reject(e))

}

export const getRmqClustListByPage = (params) => {
 let pageIndex = 1, pageSize = 10
 return getApi(ProductRocketMqApiUrl)(`/mid/v1/deployList/rmqCluster/${pageIndex}/${pageSize}`).then(res => {
  if (res.code == 200) {
    return res.data
  } else {
    throw new Error('error: ' + res.code + ' ' +  res.msg)
  }
}).catch(e => Promise.reject(e))
}