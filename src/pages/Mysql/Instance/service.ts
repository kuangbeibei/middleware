/*
 * @Author: kuangdan 
 * @Date: 2019-12-17 17:27:40 
 * @Last Modified: 2019-12-17 17:27:40 
 */
import { getApi, postApi, delApi, putApi } from "@api";
import { ProductApiUrl } from "@utils/data";

const { ProductMysqlApiUrl } = ProductApiUrl;

export const getHostList = async id => {
    return getApi(ProductMysqlApiUrl)(`/v1/hosts/${id}`).then(res => {
        try {
            return res.data
        } catch (e) {
            return Promise.reject(e)
        }
    }).catch(e => Promise.reject(e))
}