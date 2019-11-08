/*
 * @Author: kuangdan
 * @Date: 2019-11-07 18:49:39
 * @Last Modified: 2019-11-07 18:49:39
 */

import * as React from "react";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { renderPageWithRoutes } from "@router/index";

function RocketmqIndex(props) {
	console.log('props.routes,', props.routes);
	console.log('props~~~ ,',props)
	return (
		<Switch>
			{
				renderPageWithRoutes(props.routes)
			}
			
		</Switch>
	);
}

export default RocketmqIndex;
