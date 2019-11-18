/*
 * @Author: kuangdan
 * @Date: 2019-11-09 20:45:55
 * @Last Modified: 2019-11-09 20:45:55
 * 路由配置文件，路径配置
 */

// Mysql
export const MysqlRoutesMap = [
	{
		key: "/middleware/mysql",
		component: "Mysql",
		name: "Mysql",
		isExact: false,
		breadcrumbTitle: "Mysql集群",
		icon: "desktop",
	}
];

// Redis
export const RedisRoutesMap = [
	{
		key: "/middleware/redis",
		component: "Redis",
		name: "Redis",
		isExact: false,
		breadcrumbTitle: "Redis集群",
		icon: "desktop",
		subs: [
			{
				key: "/middleware/redis/:id/instance",
				component: "RedisInstance",
				name: "RedisInstance",
				isExact: true,
				breadcrumbTitle: "Redis实例"
			},
			{
				key: "/middleware/redis",
				component: "RedisHome",
				name: "RedisHome",
				isExact: false,
				breadcrumbTitle: "Redis集群"
			}
		]
	}
];

// Rocketmq
export const RocketmqRoutesMap = [
	{
		key: "/middleware/rocketmq", // 自动跳到/rocket/all这个路由
		name: "Rocketmq",
		component: "Rocketmq",
		isExact: false,
		breadcrumbTitle: "Rocketmq",
		icon: "desktop",
		subs: [
			{
				key: "/middleware/rocketmq/rmqnameserver/:id", // /rocketmq/:clusterId/rmqnameserver/:id
				component: "RocketNameServer",
				name: "RocketNameServer",
				isExact: true,
				breadcrumbTitle: "NameServer"
			},
			{
				key: "/middleware/rocketmq/rmqbroker/:id", // /rocketmq/:v/rmqbroker/:id
				component: "RocketBroker",
				name: "RocketBroker",
				isExact: true,
				breadcrumbTitle: "Broker"
			},
			{
				key: "/middleware/rocketmq/rmqconsole/:id", // /rocketmq/:clusterId/rmqconsole/:id
				component: "RocketConsole",
				name: "RocketConsole",
				isExact: true,
				breadcrumbTitle: "Console"
			},
			{
				key: "/middleware/rocketmq", // 子路由首页放在最后！ // /rocketmq/:clusterId
				component: "RocketmqHome",
				name: "RocketmqHome",
				isExact: false,
				breadcrumbTitle: "Rocketmq集群"
			}, 
			// 多加一层 总的集群页面
			// rocketmq/all
		]
	}
];

// export const middlewareNavMap: IRoute[] = [...MysqlRoutesMap, ...RedisRoutesMap, ...RocketmqRoutesMap];
// export const middlewareRouteMap: IRoute[] = middlewareNavMap // 暂时，因为还要加上404 和 login

// 永辉云-运维端后台导航
export const platformNavMap = [
	{
		key: "http://manager.tce.cloud.yonghui.cn/platform/tenant",
		navname: "云平台",
	},
	{
		key: "http://manager.tce.cloud.yonghui.cn/iaas/overview/computed",
		navname: "云资源",
	},
	{
		key: "http://manager.tce.cloud.yonghui.cn/appc/cluster-list",
		navname: "应用中心",
	},
	{
		key: "/http://manager.tce.cloud.yonghui.cn/develops/delivery",
		navname: "DevOps"
	},
	{
		key: "http://manager.tce.cloud.yonghui.cn/data-operation-tools/task/logtask",
		navname: "数据化运营工具"
	},
	{
		key: "http://manager.tce.cloud.yonghui.cn/monitor/alarm/strategy",
		navname: "监控"
	}
]

// 永辉云-中间件平台导航
export const middlewareNavMap = [
	{
		key: "/middleware/mysql",
		navname: "中间件",
		breadcrumbTitle: "中间件",
		name: "middleware",
	}
];

export const allNavMap = [...platformNavMap, ...middlewareNavMap];

// 永辉云-中间件平台所有 & 侧边栏导航
export const middlewareRouteMap = [
	{
		key: "/middleware/mysql",
		navname: "中间件",
		isExact: true,
		breadcrumbTitle: "中间件",
		name: "middleware",
		subs: [...MysqlRoutesMap, ...RedisRoutesMap, ...RocketmqRoutesMap]
	}
];
