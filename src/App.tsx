import * as React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import PageEntry from "@pages/Entry";
import {NotFound} from "@router/routes"

const App: React.SFC = props => {
	return (
		<Router>
			<Switch>
				{/* Login */}

				{/* Page */}
				<PageEntry {...props} />

				{/* Not Fount */}
				<Route path="/404" component={NotFound} />
			</Switch>
		</Router>
	);
};

export default App;
