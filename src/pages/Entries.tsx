/*
 * @Author: kuangdan 
 * @Date: 2019-11-12 10:43:13 
 * @Last Modified: 2019-11-12 10:43:13 
 * 所有路由出口的页面级组件
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

export default {
    Mysql,
    Redis,
    Rocketmq,
    RocketmqHome,
    RocketNameServer,
    RocketBroker,
    RocketConsole
} as any;
