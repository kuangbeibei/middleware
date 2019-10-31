import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import middlewareRouteMap from "@router/routes";
import Breadcrumbs from "@com/Breadcrumbs";

import { NavComponent, renderPageWithRoutes } from "@router/index";

const App: React.SFC = () => {
	
	return (
			<Router>
				<header>
					<div className="logo"></div>
					<NavComponent middlewareRouteMap={middlewareRouteMap} />
				</header>

				<aside className="sidebar"></aside>

				<main>
					<section className="breadcrumbs">
						<Breadcrumbs />
					</section>

					<section className="page-content">
						{renderPageWithRoutes(middlewareRouteMap)}
					</section>
				</main>

				<footer></footer>
			</Router>
		);
}

export default App;
