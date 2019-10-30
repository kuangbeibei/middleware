import * as React from "react"
import {
    Switch,
    Route,
    Link
} from "react-router-dom"

function renderNavWithRoutes(middlewareRouteMap:IRoute[]) {
    return (
        <>
           <nav>
                <ul>
                    {
                        middlewareRouteMap.map((route) => {
                            return <li key={route.key}>
                                <Link to={route.path}>{route.name}</Link>
                            </li>
                        })
                    }
                </ul>
            </nav> 
        </>
    )
}

function renderPageWithRoutes(middlewareRouteMap:IRoute[]) {
    return (<>
        <Switch>
            {
                middlewareRouteMap.map((route) => {
                    return <Route 
                        path={route.path}
                        exact={route.isExact} 
                        key={route.key}
                        render={
                            props => (<route.page {...props} />)
                        }
                    />
                })
            }
        </Switch>
    </>)
}

export {
    renderNavWithRoutes,
    renderPageWithRoutes
}
