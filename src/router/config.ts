import { Component } from "react";

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
		icon: "database",
		subs: [
			{
				key: "/middleware/mysql/:id/instance",
				component: "MysqlInstance",
				name: "MysqlInstance",
				isExact: false,
				breadcrumbTitle: "实例"
			},
			{
				key: "/middleware/mysql/:id/detail",
				component: "MysqlDetail",
				name: "MysqlDetail",
				isExact: false,
				breadcrumbTitle: "详情"
			},
			{
				key: "/middleware/mysql",
				component: "MysqlHome",
				name: "MysqlHome",
				isExact: false,
				breadcrumbTitle: "Mysql集群"
			}
		]
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
				key: "/middleware/redis/:id/extension",
				component: "RedisExtension",
				name: "RedisExtension",
				isExact: true,
				breadcrumbTitle: "扩容"
			},
			{
				key: "/middleware/redis/:taskId/detail",
				component: "RedisDetail",
				name: "RedisDetail",
				isExact: true,
				breadcrumbTitle: "详情"
			},
			{
				key: "/middleware/redis/:taskId/instance/monitor",
				component: "RedisInstanceMonitor",
				name: "RedisInstanceMonitor",
				isExact: true,
				breadcrumbTitle: "监控"
			},
			{
				key: "/middleware/redis/:taskId/instance",
				component: "RedisInstance",
				name: "RedisInstance",
				isExact: true,
				breadcrumbTitle: "实例"
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
		icon: "rocket",
		subs: [
      {
        key: "/middleware/rocketmq/detail/:id",
        // component: 
        component: "RocketmqDetail",
        isExact: true,
        name: "RocketmqDetail",
        breadcrumbTitle: "rocketMqDetail"
      },
			{
				key: "/middleware/rocketmq/rmqnameserver/:id",
				component: "RocketNameServer",
				name: "RocketNameServer",
				isExact: true,
				breadcrumbTitle: "NameServer"
			},
			{
				key: "/middleware/rocketmq/rmqbroker/:id",
				component: "RocketBroker",
				name: "RocketBroker",
				isExact: true,
				breadcrumbTitle: "Broker"
			},
			{
				key: "/middleware/rocketmq/rmqconsole/:id",
				component: "RocketConsole",
				name: "RocketConsole",
				isExact: true,
				breadcrumbTitle: "Console"
			},
			{
				key: "/middleware/rocketmq", // 子路由首页放在最后！
				component: "RocketmqHome",
				name: "RocketmqHome",
				isExact: false,
				breadcrumbTitle: "Rocketmq集群"
			}
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
		key: "/platform/tenant",
		navname: "云平台"
	},
	{
		key: "/iaas/overview/computed",
		navname: "云资源"
	},
	{
		key: "/appc/cluster-list",
		navname: "应用中心"
	},
	{
		key: "/develops/delivery",
		navname: "DevOps"
	},
	{
		key: "/data-operation-tools/task/logtask",
		navname: "数据化运营工具"
	},
	{
		key: "/monitor/alarm/strategy",
		navname: "监控"
	}
];

// 永辉云-中间件平台导航
export const middlewareNavMap = [
	{
		key: "/middleware/mysql",
		navname: "中间件",
		breadcrumbTitle: "中间件",
		name: "middleware"
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
