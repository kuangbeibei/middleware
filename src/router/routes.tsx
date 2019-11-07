import * as React from "react"

interface IDynamicImportProps {
    load: Function,
    children: any
}

class DynamicImport extends React.Component<IDynamicImportProps> {
	state = {
		component: null
	};
	componentDidMount() {
		this.props.load().then(component => {
			this.setState(() => ({
					component: component.default ? component.default : component
			}));
			console.log('我来啦')
		});
    }
	render() {
        return this.props.children(this.state.component)
    }
}

function childrenOfDynamicImport(Component, props) {
	return Component === null ? <div>loading</div> : <Component {...props} />
}


const Mysql = props => (
	<DynamicImport load={() => import("@pages/Mysql")}>
		{
			Component => childrenOfDynamicImport(Component, props)
		}
	</DynamicImport>
)

const Redis = props => (
	<DynamicImport load={() => import("@pages/Redis")}>
		{
			Component => childrenOfDynamicImport(Component, props)
		}
	</DynamicImport>
)

const RocketmqIndex = props => (
	<DynamicImport load={() => import("@pages/Rocket-MQ")}>
		{
			Component => childrenOfDynamicImport(Component, props)
		}
	</DynamicImport>
)

const RocketmqHome = props => (
	<DynamicImport load={() => import("@pages/Rocket-MQ/Home")}>
		{
			Component => childrenOfDynamicImport(Component, props)
		}
	</DynamicImport>
)

const RocketNameServer = props => (
	<DynamicImport load={() => import("@pages/Rocket-MQ/Nameserver")}>
		{
			Component => childrenOfDynamicImport(Component, props)
		}
	</DynamicImport>
)

const middlewareRouteMap: IRoute[] = [
	{
		path: "/",
		page: Mysql,
		key: "mysql",
		name: "Mysql",
		isExact: true
	},
	{
		path: "/redis",
		page: Redis,
		key: "redis",
		name: "Redis",
		isExact: true
	},
	{
		path: "/rocketmq",
		page: RocketmqIndex,
		key: "RocketmqIndex",
		name: "RocketmqIndex",
		isExact: true,
		children: [
			{	
				key: 'RocketNameServer',
				path: '/rocketmq/rmqnameserver',
				page: RocketNameServer,
				name: 'RocketNameServer',
				isExact: false
			},
			{	
				key: 'RocketmqHome',
				path: '/rocketmq',
				page: RocketmqHome,
				name: 'RocketmqHome',
				isExact: false
			},
		]
	}
];

export default middlewareRouteMap;
