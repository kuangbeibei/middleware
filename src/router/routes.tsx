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
		})
	}
	render() {
		return this.props.children(this.state.component, this.props);
	}
}

function childrenOfDynamicImport(Component, props) {
	return Component === null ? <div>loading</div> : <Component {...props} />;
}

const Mysql = props => (
	<DynamicImport load={() => import("@pages/Mysql")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
);

const Redis = props => (
	<DynamicImport load={() => import("@pages/Redis")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
);

const Rocketmq = props => (
	<DynamicImport load={() => import("@pages/Rocket-MQ")}>
		{Component => childrenOfDynamicImport(Component, props)}
	</DynamicImport>
);

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

const middlewareRouteMap: IRoute[] = [
	{
		path: "/mysql",
		page: Mysql,
		key: "mysql",
		name: "Mysql",
		isExact: false
	},
	{
		path: "/redis",
		page: Redis,
		key: "redis",
		name: "Redis",
		isExact: false
	},
	{
		path: "/rocketmq",
		page: Rocketmq,
		key: "rocketmq",
		name: "Rocketmq",
		isExact: false,
		children: [
			{
				key: "rmqnameserver",
				path: "/rocketmq/rmqnameserver/:id",
				page: RocketNameServer,
				name: "RocketNameServer",
				isExact: false
			},
			{
				key: "rmqbroker",
				path: "/rocketmq/rmqbroker/:id",
				page: RocketBroker,
				name: "RocketBroker",
				isExact: false
			},
			{
				key: "rmqconsole",
				path: "/rocketmq/rmqconsole/:id",
				page: RocketConsole,
				name: "RocketConsole",
				isExact: false
			},
			{
				key: "RocketmqHome", // 子路由首页放在最后！
				path: "/rocketmq",
				page: RocketmqHome,
				name: "RocketmqHome",
				isExact: false,
			},
		]
	}
];

export default middlewareRouteMap;
