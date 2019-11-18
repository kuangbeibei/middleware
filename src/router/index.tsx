/*
 * @Author: kuangdan
 * @Date: 2019-10-31 15:42:12
 * @Last Modified: 2019-10-31 15:42:12
 */

import * as React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import Allpages from "@pages/Entries";

const requireLogin = () => {
	
}

const routes = (middlewareRouteMap, props) => {
	return middlewareRouteMap.map((r: IRoute) => {
		const route = (r: IRoute) => {
			const C = r.component && Allpages[r.component];

			return C ? (
				<Route
					path={r.key}
					exact={r.isExact}
					key={r.key}
					component={props => <C {...props} routes={r.subs} />}
				/>
			) : r.subs ? (
				routes(r.subs, props)
			) : null;
		};
		return r.component
			? route(r)
			: r.subs && r.subs.map((r: IRoute) => route(r));
	});
};

// 渲染页面主体内容，后续加上auth身份等判断
function renderPageWithRoutes(middlewareRouteMap: IRoute[], props) {
	return (
		<>
			<Switch>
				{...routes(middlewareRouteMap, props)}
				{/* 主体路由级 nomatch 未实现 */}
				<Redirect to="/nomatch" />
			</Switch>
		</>
	);
}

export { renderPageWithRoutes };
