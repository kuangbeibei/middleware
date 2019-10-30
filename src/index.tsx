import * as React from 'react'
import * as ReactDom from 'react-dom'
import {
    BrowserRouter as Router,
} from "react-router-dom"

import "./assets/style/reset.less"
import "./assets/style/layout.less"
import middlewareRouteMap from "@router/routes"
import Breadcrumbs from "@com/Breadcrumbs"

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

        <div className="breadcrumbs">
            <Breadcrumbs />
        </div>

        <main>
            {
                renderPageWithRoutes(middlewareRouteMap)
            }
        </main>
    </Router>
, document.getElementById('root'))