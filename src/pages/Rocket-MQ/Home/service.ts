/*
 * @Author: kuangdan 
 * @Date: 2019-11-06 18:12:08 
 * @Last Modified: 2019-11-06 18:12:08 
 */ 

import { getApi, postApi, delApi} from '@api'
import { ProductApiUrl } from "@utils/data"

const { ProductRocketMqApiUrl, ProductUumApiUrl } = ProductApiUrl;




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

// 添加rmq集群
export const addRocketMqCluster = (params) => {
  return postApi(ProductRocketMqApiUrl)('/mid/v1/deployTask', params)
    .then(res => {
      if (res.code == 200) {
        return res.data
      } else {
        throw new Error('error: ' + res.code +' ' +  res.msg)
      }
    }).catch(e => Promise.reject(e))
}

// TODO 添加分页等信息
// 获取rmq集群列表
export const getRmqClustListByPage = (params) => {
 let pageIndex = 1, pageSize = 10
 return getApi(ProductRocketMqApiUrl)(`/mid/v1/deployList/rmqCluster/${pageIndex}/${pageSize}`)
  .then(res => {
    if (res.code == 200) {
      return res.data
    } else {
      throw new Error('error: ' + res.code + ' ' +  res.msg)
    }
  }).catch(e => Promise.reject(e))
}

// 获取特定的集群部署信息
export const getRmqCluster = (taskId) => {
  return getApi(ProductRocketMqApiUrl)(`/mid/v1/params/rmqCluster/${taskId}`)
    .then(res => {
      if (res.code == 200) {
        return res.data
      } else {
        throw new Error('error: ' + res.code + ' ' +  res.msg)
      }
    }).catch(e => Promise.reject(e))
}

// 更新rmq集群部署参数
export const updateRmqCluster = (taskId, params) => {
  return postApi(ProductRocketMqApiUrl)(`/mid/v1/updateParams/rmqCluster/${taskId}`, params)
    .then(res => {
      if (res.code == 200) {
        return res.data
      } else {
        throw new Error('error: ' + res.code + ' ' +  res.msg)
      }
  }).catch(e => Promise.reject(e))

}

// 部署rmq集群，启动
export const runRmqClusterTask = (taskId) => {
  return getApi(ProductRocketMqApiUrl)(`/mid/v1/runTask/rmqCluster/${taskId}`)
    .then(res => {
      if (res.code == 200) {
        return res.msg
      } else {
        throw new Error('error: ' + res.code + ' ' +  res.msg)
      }
    }).catch(e => Promise.reject(e))
}

// 删除rmq集群
export const deleteCluster = (taskId) => {
  return delApi(ProductRocketMqApiUrl)(`/mid/v1/delete/rmqCluster/${taskId}`)
    .then(res => {
      if (res.code == 200) {
        return res.msg
      } else {
        throw new Error('error: ' + res.code + ' ' +  res.msg)
      }
    }).catch(e => Promise.reject(e))

}

// 释放资源
export const releaseCluster = (taskId) => {
  return delApi(ProductRocketMqApiUrl)(`mid/v1/releaseTaskResources/rmqCluster/${taskId}`)
  .then(res => {
    if (res.code == 200) {
      return res.data
    } else {
      throw new Error('error: ' + res.code + ' ' +  res.msg)
    }
  }).catch(e => Promise.reject(e))
}

// 获取部署日志
export const getDeployTaskOutput = (taskId) => {
  return getApi(ProductRocketMqApiUrl)(`/mid/v1/deployTaskOutput/${taskId}`)
  .then(res => {
    if (res.code == 200) {
      return res.data
    } else {
      throw new Error('error: ' + res.code +' ' +  res.msg)
    }
  }).catch(e => Promise.reject(e))
}