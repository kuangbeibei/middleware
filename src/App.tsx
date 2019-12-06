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
				
				<Route exact path="/middleware" render={() => <Redirect to="/middleware/mysql" push />} />
				
				{/* Page */}
				<PageIndex {...props} />

				{/* Login */}

				{/* 页面路由级别404 nomatch */}
				<Redirect to="/" />
			</Switch>
		</Router>
	);
};

export default App;
