import * as React from 'react'
import * as ReactDom from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"

import Mysql from "./pages/Mysql";
import Redis from "./pages/Redis";
import RocketMQ from "./pages/Rocket-MQ"

ReactDom.render(
	<Router>
        <div>
            <nav>
            <ul>
                <li>
                <Link to="/">mysql</Link>
                </li>
                <li>
                <Link to="/redis">redis</Link>
                </li>
                <li>
                <Link to="/rocketmq">rocketmq</Link>
                </li>
            </ul>
            </nav>
            <Switch>
                <Route exact path="/">
                    <Mysql />
                </Route>
                <Route path="/redis">
                    <Redis />
                </Route>
                <Route path="/rocketmq">
                    <RocketMQ />
                </Route>
            </Switch>
        </div>
    </Router>
, document.getElementById('root'))