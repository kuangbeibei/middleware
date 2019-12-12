export const MiddlewarePathPrefix = 'middleware'

const ProductMidApiUrl = '/api-mid-deploy-redis.api.fz.yonghui.cn';
const ProductUumApiUrl = '/api-uum.api.fz.yonghui.cn';
const ProductAlarmApiUrl = '/api-mwp.api.fz.yonghui.cn';

export const ProductApiUrl = {
    ProductMidApiUrl,
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
		text: '资源已释放',
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