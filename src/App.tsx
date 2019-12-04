import * as React from "react";
import {
	HashRouter as Router,
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
				
				{
					/* 本地开发用 */
					location.port === '8899' ? <Route exact path="/" render={() => <Redirect to="/middleware/mysql" push />} />  : ''
				}
				
				{/* Page */}
				<PageIndex {...props} />

				{/* Login */}

				{/* 页面路由级别404 nomatch */}
				<Redirect to="/nomatch" />
			</Switch>
		</Router>
	);
};

export default App;
