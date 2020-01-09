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