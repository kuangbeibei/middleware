/*
 * @Author: kuangdan
 * @Date: 2019-11-07 18:49:39
 * @Last Modified: 2019-11-07 18:49:39
 */

import * as React from "react";
import { Switch } from "react-router-dom";
import { renderPageWithRoutes } from "@router/index";
import {
	RocketmqRouteProps
} from "./data"

import CustomBreadcrumbs from "@com/UI/Custom-breadcrumbs"

function RocketmqIndex(props) {
	return (
		<>
			<section className="breadcrumbs">
				<CustomBreadcrumbs routeProps={RocketmqRouteProps} {...props} />
			</section>
			<section className="page-content">
				{renderPageWithRoutes(props.routes, props)}
			</section>
		</>
	);
}

export default RocketmqIndex;
