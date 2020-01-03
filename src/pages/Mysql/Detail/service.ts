/*
 * @Author: kuangdan
 * @Date: 2019-12-27 14:34:44
 * @Last Modified: 2019-12-27 14:34:44
 */

import { getApi, postApi, delApi, putApi } from "@api";
import { ProductApiUrl } from "@utils/data";

const { ProductMysqlApiUrl } = ProductApiUrl;

/**
 * 获取操作日志
 * @param id
 */
export async function getActionlogs(id) {
	return getApi(ProductMysqlApiUrl)(`/v1/logs/operator/${id}?page=1&pageSize=100`)
		.then(res => res)
		.catch(e => Promise.reject(e.message));
}

/**
 * 获取备份列表
 * @param id 
 */
export async function getBackupList(id) {
	return getApi(ProductMysqlApiUrl)(`/v1/backups/${id}?page=1&pageSize=100`)
		.then(res => res)
		.catch(e => Promise.reject(e.message));
}

/**
 * 修改cron表达式/备份strategy
 * @param id 
 * @param cron 
 */
export async function saveBackupuStrategy(id, cron) {
	return putApi(ProductMysqlApiUrl)(`/v1/backup/strategy/${id}?cron=${cron}`).then(res => {
		if (res.message === 'ok') {
			return res.message
		} else {
			return res
		}
	}).catch(e => Promise.reject(e.message));
}

/**
 * 修改备份时间
 * @param id 
 * @param days 
 */
export async function saveBackupDays(id, days) {
	return putApi(ProductMysqlApiUrl)(`/v1/backup/keepdays/${id}?keepdays=${days}`).then(res => {
		if (res.message === 'ok') {
			return res.message
		} else {
			return res
		}
	}).catch(e => Promise.reject(e.message));
}

/**
 * 启用备份
 * @param id 
 */
export async function runBackup(id) {
	return postApi(ProductMysqlApiUrl)(`/v1/backup/strategy/${id}`).then(res => res).catch(e => Promise.reject(e.message))
}

/**
 * 停用备份
 * @param id 
 */
export async function stopBackup(id) {
	return delApi(ProductMysqlApiUrl)(`/v1/backup/strategy/${id}`).then(res => res).catch(e => Promise.reject(e.message))
}


