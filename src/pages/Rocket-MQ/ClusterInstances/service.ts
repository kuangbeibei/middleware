import { getApi, postApi, delApi} from '@api'
import { ProductApiUrl } from "@utils/data"

const { ProductRocketMqApiUrl, ProductUumApiUrl } = ProductApiUrl;

// 添加broker instance
export const addBrokerInstance= (params) => {
  return postApi(ProductRocketMqApiUrl)('/mid/v1/deployTask', params)
    .then(res => {
      if (res.code == 200) {
        return res.data
      } else {
        throw new Error('error: ' + res.code +' ' +  res.msg + ': ' + res.data)
      }
    }).catch(e => Promise.reject(e))
}

// 获取broker instance
export const getBrokerTaskInfo = (taskId) => {
  return getApi(ProductRocketMqApiUrl)(`/mid/v1/params/rmqBroker/${taskId}`)
    .then(res => {
      if (res.code === 200) {
        return res.data
      } else {
        throw new Error('error' + res.code + ' ' + res.msg + ': ' + res.data)
      }
    }).catch(e => Promise.reject(e))
}

// 更新broker instance
export const updateBrokerTaskInfo = (taskId, params) => {
  return postApi(ProductRocketMqApiUrl)(`/mid/v1/updateParams/rmqBroker/${taskId}`, params)
    .then(res => {
      if (res.code == 200) {
        return res.data
      }else {
        throw new Error('error: ' + res.code +' ' +  res.msg + ': ' + res.data)
      }
    }).catch(e => Promise.reject(e))
}

// 删除
export const deleteBrokerInstance = (taskId) => {
  return delApi(ProductRocketMqApiUrl)(`/mid/v1/delete/rmqBroker/${taskId}`)
    .then(res => {
      if (res.code == 200) {
        return res
      } else {
        throw new Error('error: ' + res.code +' ' +  res.msg + ': ' + res.data)
      }
    }).catch(e => Promise.reject(e))
}

// 部署 broker
export const deployBrokerInstance = (taskId) => {
  return getApi(ProductRocketMqApiUrl)(`/mid/v1/runTask/rmqBroker/${taskId}`)
    .then(res => {
      if (res.code == 200) {
        return res
      } else {
        throw new Error('error: ' + res.code +' ' +  res.msg + ': ' + res.data)
      }
    }).catch(e => Promise.reject(e))
}

// 释放broker资源
export const releaseBrokerResource = (taskId) => {
  return delApi(ProductRocketMqApiUrl)(`/mid/v1/releaseTaskResources/rmqBroker/${taskId}`)
    .then(res => {
      if (res.code == 200) {
        return res
      } else {
        throw new Error('error: ' + res.code +' ' +  res.msg + ': ' + res.data)
      }
    }).catch(e => Promise.reject(e))
}