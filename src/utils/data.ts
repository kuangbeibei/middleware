export const MiddlewarePathPrefix = 'middleware'

const ProductMidApiUrl = '/api-mid-deploy-redis.api.fz.yonghui.cn';
const ProductUumApiUrl = '/api-uum.api.fz.yonghui.cn';
const ProductAlarmApiUrl = '/api-mwp.api.fz.yonghui.cn';

export const ProductApiUrl = {
    ProductMidApiUrl,
    ProductUumApiUrl,
    ProductAlarmApiUrl
}

const Color_normal = '#0070cc';
const Color_success = '#87d068';
const Color_error = '#f5222d';
const Color_gray = '#2db7f5';

export const clusterStatus = {
	done: {
		text: '部署完成',
		color: Color_success
	},
	failed: {
		text: '部署失败',
		color: Color_error
	},
	ready: {
		text: '准备就绪',
		color: Color_gray
	},
	running: {
		text: '部署执行中...',
		color: Color_normal,
	},
	init: {
		text: '启动运行...',
		color: Color_gray
	},
	release: {
		text: '资源已释放',
		color: Color_gray
	},
	success: {
		text: '成功',
		color: Color_success
	},
	processing: {
		text: '处理中...',
		color: Color_normal
	},
	initial: {
		text: '初始状态',
		color: Color_gray
	}
}