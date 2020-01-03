/*
 * Mysql 机器实例 配置-监控页面 api
 * @Date: 2020-01-03 18:00:34
 * @Last Modified: 2020-01-03 18:00:34
 */

import { getApi, postApi, delApi, putApi } from "@api";

import { ProductApiUrl } from "@utils/data";

const { ProductMysqlApiUrl } = ProductApiUrl;

// 主机配置
export async function getHostConfig(id, ip) {
	return getApi(ProductMysqlApiUrl)(`/v1/instance/cfg/${id}?ip=${ip}`)
		.then(res => res)
		.catch(e => Promise.reject(e.message));
}

// DB配置
export async function getDbConfig(id, ip) {
	return getApi(ProductMysqlApiUrl)(`/v1/db/cfg/${id}?ip=${ip}`)
		.then(res => res)
		.catch(e => Promise.reject(e.message));
}
