/*
 * @Author: kuangdan
 * @Date: 2019-11-07 18:49:39
 * @Last Modified: 2019-11-07 18:49:39
 */

import * as React from "react";
import { Switch } from "react-router-dom";
import { renderPageWithRoutes } from "@router/index";
import Breadcrumbs from "./Breadcrumbs"

function RocketmqIndex(props) {
	return (
		<>
			<section className="breadcrumbs">
				<Breadcrumbs {...props} />
			</section>
			<section className="page-content">
				<Switch>{renderPageWithRoutes(props.routes)}</Switch>
			</section>
		</>
	);
}

export default RocketmqIndex;
