import { getApi, postApi, delApi} from '@api'
import { ProductApiUrl } from "@utils/data"

const { ProductRocketMqApiUrl, ProductUumApiUrl } = ProductApiUrl;

// 获取特定的集群部署信息
export const getClusterConfigInfo = (taskId) => {
  return getApi(ProductRocketMqApiUrl)(`/mid/v1/configInfo/rmqCluster/${taskId}`)
    .then(res => {
      if (res.code == 200) {
        return res.data
      } else {
        throw new Error('error: ' + res.code + ' ' +  res.msg)
      }
    }).catch(e => Promise.reject(e))
}
