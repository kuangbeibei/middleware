export const MiddlewarePathPrefix = 'middleware'

const ProductRedisApiUrl = '/api-mid-deploy-redis.api.fz.yonghui.cn'; // redis-中间件
const ProductMysqlApiUrl = '/api-mid-deploy-mysql.api.fz.yonghui.cn'; // mysql-中间件
const ProductUumApiUrl = '/api-uum.api.fz.yonghui.cn'; // 风光-运维端租户
const ProductAlarmApiUrl = '/api-mwp.api.fz.yonghui.cn'; // 昆仑-告警


export const ProductApiUrl = {
	ProductRedisApiUrl,
	ProductMysqlApiUrl,
    ProductUumApiUrl,
    ProductAlarmApiUrl
}

export const clusterStatus = {
	done: {
		text: '部署完成',
	},
	failed: {
		text: '部署失败',
	},
	ready: {
		text: '准备就绪',
	},
	running: {
		text: '部署执行中',
	},
	init: {
		text: '启动运行',
	},
	release: {
		text: '资源已卸载',
	},
	success: {
		text: '成功',
	},
	processing: {
		text: '处理中',
	},
	initial: {
		text: '初始状态',
	}
}