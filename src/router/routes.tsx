import * as React from "react"
import Loading from "@com/Loading"
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
		});
    }
	render() {
        return this.props.children(this.state.component)
    }
}

function childrenOfDynamicImport(Component, props) {
	return Component === null ? <Loading /> : <Component {...props} />
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

const Rocketmq = props => (
	<DynamicImport load={() => import("@pages/Rocket-MQ")}>
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
		isExact: false
	},
	{
		path: "/rocketmq",
		page: Rocketmq,
		key: "rocketmq",
		name: "Rocket-MQ",
		isExact: false
	}
];

export default middlewareRouteMap;
