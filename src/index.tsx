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

        <aside className="sidebar">
            
        </aside>
        
        <main>
            <section className="breadcrumbs">
                <Breadcrumbs />
            </section>

            <section className="page-content">
                {
                    renderPageWithRoutes(middlewareRouteMap)
                }
            </section>
        </main>

        <footer></footer>
    </Router>
, document.getElementById('root'))