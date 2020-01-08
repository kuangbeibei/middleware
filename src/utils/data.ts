export const MiddlewarePathPrefix = 'middleware'

const ProductRedisApiUrl = '/api-mid-deploy-redis.api.fz.yonghui.cn'; // redis-中间件
const ProductMysqlApiUrl = '/api-mid-deploy-mysql.api.fz.yonghui.cn'; // mysql-中间件
const ProductUumApiUrl = '/api-uum.api.fz.yonghui.cn'; // 风光-运维端租户
const ProductAlarmApiUrl = '/api-mwp.api.fz.yonghui.cn'; // 昆仑-告警
const ProductRocketMqApiUrl = '/api-mid-deploy-rmq.api.fz.yonghui.cn' // rocketMQ-中间件 TODO 要修改

export const ProductApiUrl = {
	ProductRedisApiUrl,
	ProductMysqlApiUrl,
	ProductUumApiUrl,
	ProductAlarmApiUrl,
	ProductRocketMqApiUrl,
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

export const dateLocale = {
	lang: {
		placeholder: "选择日期",
		rangePlaceholder: ["开始时间", "结束时间"],
		today: "今天",
		now: "现在",
		backToToday: "回到今天",
		ok: "确定",
		clear: "清空",
		month: "月",
		year: "年",
		timeSelect: "选择时间",
		dateSelect: "选择日期",
		monthSelect: "选择月份",
		yearSelect: "选择年份",
		decadeSelect: "选择十年",
		yearFormat: "YYYY",
		dateFormat: "M/D/YYYY",
		dayFormat: "D",
		dateTimeFormat: "M/D/YYYY HH:mm:ss",
		monthFormat: "MMMM",
		monthBeforeYear: true,
		previousMonth: "上一个月",
		nextMonth: "下一个月",
		previousYear: "上一年",
		nextYear: "下一年",
		previousDecade: "上一个十年",
		nextDecade: "下一个十年",
		previousCentury: "上一个世纪",
		nextCentury: "下一个世纪"
	},
	timePickerLocale: {
		placeholder: "选择时间"
	},
	dateFormat: "YYYY-MM-DD",
	dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
	weekFormat: "YYYY-wo",
	monthFormat: "YYYY-MM"
};