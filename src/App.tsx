import * as React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import middlewareRouteMap from "@router/routes";

import { NavComponent, renderPageWithRoutes } from "@router/index";

const App: React.SFC = props => {
	return (
		<Router>
			<header>
				<div className="logo"></div>
				<NavComponent middlewareRouteMap={middlewareRouteMap} />
			</header>

			<aside className="sidebar"></aside>

			<main>{renderPageWithRoutes(middlewareRouteMap)}</main>

			<footer></footer>
		</Router>
	);
};

export default App;
