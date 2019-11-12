/*
 * @Author: kuangdan
 * @Date: 2019-11-11 14:47:05
 * @Last Modified: 2019-11-11 14:47:05
 */

import * as React from "react";
import { NavComponent, renderPageWithRoutes } from "@router/index";
import { middlewareRouteMap, middlewareNavMap } from "@router/routes";

import { Switch, Route, Redirect } from "react-router-dom";

export default function PageEntry(props) {
	return (
		<>
			<Switch>
				<>
					<header>
						<div className="logo"></div>
						<NavComponent middlewareNavMap={middlewareNavMap} />
					</header>

					<aside className="sidebar"></aside>

					<main>
						{renderPageWithRoutes(middlewareRouteMap, props)}
					</main>

					<footer></footer>
				</>
			</Switch>
		</>
	);
}
