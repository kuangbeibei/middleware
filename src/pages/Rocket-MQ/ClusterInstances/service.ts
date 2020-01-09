import { getApi, postApi, delApi} from '@api'
import { ProductApiUrl } from "@utils/data"

const { ProductRocketMqApiUrl, ProductUumApiUrl } = ProductApiUrl;


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