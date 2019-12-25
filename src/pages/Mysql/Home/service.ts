/*
 * @Author: kuangdan
 * @Date: 2019-12-16 14:23:32
 * @Last Modified: 2019-12-16 14:23:32
 */

import { getApi, postApi, delApi, putApi } from "@api";
import { ProductApiUrl } from "@utils/data";

const { ProductMysqlApiUrl } = ProductApiUrl;

// 获取mysql集群列表
export async function getMysqlClusters({
	name = "",
	status = "",
	type = "",
	tenantId = "",
	userId = ""
}) {
	return getApi(ProductMysqlApiUrl)(
		`/v1/clusters?name=${name}&status=${status}&type=${type}&tenantId=${tenantId}&userId=${userId}&page=1&pageSize=100`
	)
		.then(res => {
			try {
				return res.data;
			} catch (e) {
				Promise.reject(res.message)
			}
		})
		.catch(e => Promise.reject(e));
}

// 获取mysql高级配置默认值
export async function getDefaultClusterConfig() {
	return getApi(ProductMysqlApiUrl)(`/v1/info/db/defaultcfg`)
		.then(res => {
			try {
				return res.data;
			} catch (e) {
				Promise.reject(res.message)
			}
		})
		.catch(e => Promise.reject(e));
}

// 获取mysql集群详情，编辑时
export async function getClusterDetail(id) {
	return getApi(ProductMysqlApiUrl)(`/v1/clusters/${id}`)
		.then(res => {
			try {
				return res.data;
			} catch (e) {
				Promise.reject(res.message)
			}
		})
		.catch(e => Promise.reject(e));
}

// 创建集群接口
export async function createMysqlCluster(data) {
	return postApi(ProductMysqlApiUrl)(`/v1/clusters`, data)
		.then(res => {
			try {
				return res.message;
			} catch (e) {
				Promise.reject(res.message)
			}
		})
		.catch(e => Promise.reject(e));
}

// 修改集群再次提交接口
export async function updateMysqlCluster(id, data) {
	return putApi(ProductMysqlApiUrl)(`/v1/clusters/${id}`, data)
		.then(res => {
			try {
				return res.message;
			} catch (e) {
				Promise.reject(res.message)
			}
		})
		.catch(e => Promise.reject(e));
}

// 部署
export async function deployCluster(id) {
	return postApi(ProductMysqlApiUrl)(`/v1/manage/deploy/${id}`)
		.then(res => {
			try {
				return res.message;
			} catch (e) {
				Promise.reject(res.message);
			}
		})
		.catch(e => Promise.reject(e));
}

// 卸载
export async function unload(id) {
	return delApi(ProductMysqlApiUrl)(`/v1/manage/deploy/${id}`)
		.then(res => {
			try {
				return res.message;
			} catch (e) {
				Promise.reject(res.message);
			}
		})
		.catch(e => Promise.reject(e));
}

// 删除
export async function deleteCluster(id) {
	return delApi(ProductMysqlApiUrl)(`/v1/clusters/${id}`)
		.then()
		.then(res => {
			try {
				return res.message;
			} catch (e) {
				Promise.reject(res.message)
			}
		})
		.catch(e => Promise.reject(e));
}
