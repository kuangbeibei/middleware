import * as React from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from "react-router-dom";

import PageIndex from "@pages/Index";
import Nomatch from "@pages/No-match";

const App: React.SFC = props => {
	return (
		<Router>
			<Switch>
				{/* Login */}

				{/* Page */}
				<PageIndex {...props} />

				{/* 页面路由级别404 nomatch */}
				<Route path="/nomatch" component={Nomatch} />
				
				<Route component={Nomatch} />
			</Switch>
		</Router>
	);
};

export default App;
