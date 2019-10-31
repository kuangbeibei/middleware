/*
 * @Author: kuangdan 
 * @Date: 2019-10-31 15:42:12 
 * @Last Modified: 2019-10-31 15:42:12 
 */ 
import * as React from "react"
import { useState, useEffect } from "react"

import {
    Switch,
    Route,
    Link
} from "react-router-dom"


interface INavComponentProps {
    middlewareRouteMap: IRoute[],
} 

const NavComponent: React.SFC<INavComponentProps> = (props) => {
    let [comparedKey, setComparedKey] = useState(location.pathname);
    useEffect(() => {
        const {
            pathname
        } = location;
        setComparedKey(pathname.substr(pathname.indexOf('/') + 1))
    }, [location.pathname])

    const {
        middlewareRouteMap
    } = props;

    return (
         <>
           <nav>
                <ul>
                    {
                        middlewareRouteMap.map((route) => {
                            return <li key={route.key} className={comparedKey === route.key ? 'active' : ''}>
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
                        component={route.page}
                    />
                })
            }
        </Switch>
    </>)
}

export {
    NavComponent,
    renderPageWithRoutes
}
