import * as React from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from "react-router-dom";

import PageEntry from "@pages/Index";
import Nomatch from "@pages/No-match";

const App: React.SFC = props => {
	return (
		<Router>
			<Switch>
				{/* Login */}

				{/* Page */}
				<PageEntry {...props} />

				{/* Not Found */}
				<Route path="/nomatch" component={Nomatch} />
				
				<Route component={Nomatch} />
			</Switch>
		</Router>
	);
};

export default App;
