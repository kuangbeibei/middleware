/*
 * @Author: kuangdan
 * @Date: 2019-11-09 20:45:55
 * @Last Modified: 2019-11-09 20:45:55
 */

import * as React from "react";

interface IDynamicImportProps {
	load: Function;
	children: any;
}

class DynamicImport extends React.Component<IDynamicImportProps> {
	state = {
		component: null
	};
	public async componentDidMount() {
		const { default: component } = await this.props.load();
		this.setState({
			component
		});
	}
	public render() {
		return this.props.children(this.state.component, this.props);
	}
}

function childrenOfDynamicImport(Component, props) {
	return Component === null ? <div>loading</div> : <Component {...props} />;
}
	

// Mysql
const Mysql = props => (
	<DynamicImport load={() => import("@pages/Mysql")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
);

// Redis
const Redis = props => (
	<DynamicImport load={() => import("@pages/Redis")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
);


// Rocketmq入口
const Rocketmq = props => (
	<DynamicImport load={() => import("@pages/Rocket-MQ")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
);

// Rocketmq 首页
const RocketmqHome = props => (
	<DynamicImport load={() => import("@pages/Rocket-MQ/Home")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
);

const RocketNameServer = props => (
	<DynamicImport load={() => import("@pages/Rocket-MQ/Nameserver")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
);

const RocketBroker = props => (
	<DynamicImport load={() => import("@pages/Rocket-MQ/Broker")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
);

const RocketConsole = props => (
	<DynamicImport load={() => import("@pages/Rocket-MQ/Console")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
);


export const MysqlRoutesMap: IRoute[] = [
	{
		path: "/mysql",
		page: Mysql,
		key: "mysql",
		name: "Mysql",
		isExact: false,
		title: "Mysql集群列表"
	}
]

export const RedisRoutesMap: IRoute[] = [
	{
		path: "/redis",
		page: Redis,
		key: "redis",
		name: "Redis",
		isExact: false,
		title: "Redis集群列表"
	},
]

export const RocketmqRoutesMap: IRoute[] = [
	{
		path: "/rocketmq",
		page: Rocketmq,
		key: "rocketmq",
		name: "Rocketmq",
		isExact: false,
		title: "RMQ集群",
		children: [
			{
				key: "rmqnameserver",
				path: "/rocketmq/rmqnameserver/:id",
				page: RocketNameServer,
				name: "RocketNameServer",
				isExact: false,
				title: "NameServer列表"
			},
			{
				key: "rmqbroker",
				path: "/rocketmq/rmqbroker/:id",
				page: RocketBroker,
				name: "RocketBroker",
				isExact: false,
				title: "Broker列表"
			},
			{
				key: "rmqconsole",
				path: "/rocketmq/rmqconsole/:id",
				page: RocketConsole,
				name: "RocketConsole",
				isExact: false,
				title: "Console列表"
			},
			{
				key: "RocketmqHome", // 子路由首页放在最后！
				path: "/rocketmq",
				page: RocketmqHome,
				name: "RocketmqHome",
				isExact: false,
				title: "RMQ集群"
			}
		]
	}
]


// 404
export const Nomatch = props => <DynamicImport load={() => import("@pages/No-match")}>
		{Component => childrenOfDynamicImport(Component, props)}
</DynamicImport>


// Login

const middlewareNavMap: IRoute[] = MysqlRoutesMap.concat(RedisRoutesMap, RocketmqRoutesMap);

const middlewareRouteMap: IRoute[] = MysqlRoutesMap.concat(RedisRoutesMap, RocketmqRoutesMap, [{
	key: "Nomatch", // 子路由首页放在最后！
	path: "/nomatch",
	page: Nomatch,
	name: "Nomatch",
	isExact: false,
	title: "nomatch"
}]);


export {
	middlewareNavMap,
	middlewareRouteMap
};
