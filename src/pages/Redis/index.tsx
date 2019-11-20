/*
 * @Author: kuangdan
 * @Date: 2019-11-18 09:58:35
 * @Last Modified: 2019-11-18 09:58:35
 */

import * as React from "react";
import { Switch } from "react-router-dom";
import { renderPageWithRoutes } from "@router/index";
import CustomBreadcrumbs from "@com/UI/Custom-breadcrumbs";
import {
    RedisRouteProps
} from "./data"

export default function (props) {
	return (
		<>
            <section className="breadcrumbs">
                <CustomBreadcrumbs routeProps={RedisRouteProps} {...props} />
            </section>
			<section className="page-content">
				<Switch>{renderPageWithRoutes(props.routes, props)}</Switch>
			</section>
		</>
	);
}
