/*
 * @Author: kuangdan
 * @Date: 2019-11-07 18:49:39
 * @Last Modified: 2019-11-07 18:49:39
 */

import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

function RocketmqIndex(props) {
	console.log('props.routes,', props.routes);
	return (
		<Switch>
			{props.routes.map(route => (
				<Route
					path={route.path}
					key={route.key}
					exact={route.isExact}
					component={
						props => <route.page {...props}/>
					}
				/>
			))}
		</Switch>
	);
}

export default RocketmqIndex;
