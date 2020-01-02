/*
 * @Author: kuangdan
 * @Date: 2019-12-27 14:34:44
 * @Last Modified: 2019-12-27 14:34:44
 */

import { getApi, postApi, delApi, putApi } from "@api";
import { ProductApiUrl } from "@utils/data";

const { ProductMysqlApiUrl } = ProductApiUrl;

/**
 * 操作日志
 * @param id
 */
export async function getActionlogs(id) {
	return getApi(ProductMysqlApiUrl)(`/v1/logs/operator/${id}?page=1&pageSize=100`)
		.then(res => res)
		.catch(e => Promise.reject(e.message));
}

export async function getBackupList(id) {
	return getApi(ProductMysqlApiUrl)(`/v1/backups/${id}?page=1&pageSize=100`)
		.then(res => res)
		.catch(e => Promise.reject(e.message));
}
