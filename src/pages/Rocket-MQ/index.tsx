/*
 * @Author: kuangdan
 * @Date: 2019-11-07 18:49:39
 * @Last Modified: 2019-11-07 18:49:39
 */

import * as React from "react";
import { Switch } from "react-router-dom";
import { renderPageWithRoutes } from "@router/index";

function RocketmqIndex(props) {
	return (
		<Switch>{renderPageWithRoutes(props.routes, props)}</Switch>
	);
}

export default RocketmqIndex;
