import * as React from 'react'
import * as ReactDom from 'react-dom'
import {
    BrowserRouter as Router,
} from "react-router-dom"

import "./assets/style/reset.less"
import "./assets/style/layout.less"
import middlewareRouteMap from "@router/routes"

import {
    renderNavWithRoutes,
    renderPageWithRoutes
} from "@router/index"

ReactDom.render(
	<Router>
        <header>
            <div className="logo"></div>
            {
                renderNavWithRoutes(middlewareRouteMap)
            }
        </header>
        <section className="sidebar">
            
        </section>
        <main>
            {
                renderPageWithRoutes(middlewareRouteMap)
            }
        </main>
    </Router>
, document.getElementById('root'))