/*
 * @Author: kuangdan
 * @Date: 2019-11-12 10:43:13
 * @Last Modified: 2019-11-12 10:43:13
 * 所有路由出口的页面级组件
 */

import * as React from "react";
import Loading from "@com/UI/Loading";

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
	return Component === null ? <Loading /> : <Component {...props} />;
}

// Mysql
const Mysql = props => (
	<DynamicImport load={() => import("@pages/Mysql")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
);

const MysqlHome = props => (
	<DynamicImport load={() => import("@pages/Mysql/Home")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
)

const MysqlDetail = props => (
	<DynamicImport load={() => import("@pages/Mysql/Detail")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
)

const MysqlInstance = props => (
	<DynamicImport load={() => import("@pages/Mysql/Instance")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
)

// Redis 入口
const Redis = props => (
	<DynamicImport load={() => import("@pages/Redis")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
);

// Redis 首页
const RedisHome = props => (
	<DynamicImport load={() => import("@pages/Redis/Home")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
);

// Redis 实例
const RedisInstance = props => (
	<DynamicImport load={() => import("@pages/Redis/Instance")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
);

// Redis 实例监控
const RedisInstanceMonitor = props => (
	<DynamicImport load={() => import("@pages/Redis/Instance-Monitor")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
);

// Redis 详情
const RedisDetail = props => (
	<DynamicImport load={() => import("@pages/Redis/Detail")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
)

// Redis 扩容
const RedisExtension = props => (
	<DynamicImport load={() => import("@pages/Redis/Extension")}>
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

// Rocketmq 详情页
const RocketmqDetail = props => (
  <DynamicImport load={() => import("@pages/Rocket-MQ/ClusterDetail")}>
    {Component => childrenOfDynamicImport(Component, props)}
  </DynamicImport>
)


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

export default {
	Mysql,
	MysqlHome,
	MysqlDetail,
	MysqlInstance,
	Redis,
	RedisHome,
	RedisInstance,
	RedisInstanceMonitor,
	RedisDetail,
	RedisExtension,
	Rocketmq,
	RocketmqHome,
	RocketNameServer,
	RocketBroker,
  RocketConsole,
  RocketmqDetail
} as any;
