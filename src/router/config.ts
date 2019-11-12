/*
 * @Author: kuangdan
 * @Date: 2019-11-09 20:45:55
 * @Last Modified: 2019-11-09 20:45:55
 * 路由配置文件，路径配置
 */

// Mysql
export const MysqlRoutesMap: IRoute[] = [
	{
		key: '/mysql',
		component: 'Mysql',
		name: "Mysql",
		isExact: false,
		breadcrumbTitle: "Mysql集群列表"
	}
];

// Redis
export const RedisRoutesMap: IRoute[] = [
	{
		key: "/redis",
		component: 'Redis',
		name: "Redis",
		isExact: false,
		breadcrumbTitle: "Redis集群列表"
	}
];


// Rocketmq
export const RocketmqRoutesMap: IRoute[] = [
	{
		key: "/rocketmq",
		name: "Rocketmq",
		isExact: false,
		breadcrumbTitle: "RMQ集群",
		component: 'Rocketmq',
		subs: [
			{
				key: "/rocketmq/rmqnameserver/:id",
				component: 'RocketNameServer',
				name: "RocketNameServer",
				isExact: true,
				breadcrumbTitle: "NameServer列表"
			},
			{
				key: "/rocketmq/rmqbroker/:id",
				component: 'RocketBroker',
				name: "RocketBroker",
				isExact: true,
				breadcrumbTitle: "Broker列表"
			},
			{
				key: "/rocketmq/rmqconsole/:id",
				component: 'RocketConsole',
				name: "RocketConsole",
				isExact: true,
				breadcrumbTitle: "Console列表"
			},
			{
				key: "/rocketmq",// 子路由首页放在最后！
				component: 'RocketmqHome',
				name: "RocketmqHome",
				isExact: true,
				breadcrumbTitle: "RMQ集群"
			}
		]
	}
];


export const middlewareNavMap: IRoute[] = [...MysqlRoutesMap, ...RedisRoutesMap, ...RocketmqRoutesMap];

export const middlewareRouteMap: IRoute[] = middlewareNavMap // 暂时，因为还要加上404 和 login
