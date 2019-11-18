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

// Rocketmq入口
const Rocketmq = props => {
	console.log("Rocketmq 入口");
	return (
		<DynamicImport load={() => import("@pages/Rocket-MQ")}>
			{Component => childrenOfDynamicImport(Component, props)}
		</DynamicImport>
	);
};

// Rocketmq 首页
const RocketmqHome = props => {
	console.log("rocket mq 首页");
	return (
		<DynamicImport load={() => import("@pages/Rocket-MQ/Home")}>
			{Component => childrenOfDynamicImport(Component, props)}
		</DynamicImport>
	);
};

const RocketNameServer = props => {
	console.log("RocketNameServer");
	return (
		<DynamicImport load={() => import("@pages/Rocket-MQ/Nameserver")}>
			{Component => childrenOfDynamicImport(Component, props)}
		</DynamicImport>
	);
};

const RocketBroker = props => {
	console.log("RocketBroker");
	return (
		<DynamicImport load={() => import("@pages/Rocket-MQ/Broker")}>
			{Component => childrenOfDynamicImport(Component, props)}
		</DynamicImport>
	);
};

const RocketConsole = props => {
	console.log("RocketConsole");
	return (
		<DynamicImport load={() => import("@pages/Rocket-MQ/Console")}>
			{Component => childrenOfDynamicImport(Component, props)}
		</DynamicImport>
	);
};

export default {
	Mysql,
	Redis,
	RedisHome,
	RedisInstance,
	Rocketmq,
	RocketmqHome,
	RocketNameServer,
	RocketBroker,
	RocketConsole
} as any;
