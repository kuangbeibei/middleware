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
    Link,
    Redirect
} from "react-router-dom"


interface INavComponentProps {
    middlewareNavMap: IRoute[],
} 

// 渲染导航栏
const NavComponent: React.SFC<INavComponentProps> = (props) => {
    let [comparedKey, setComparedKey] = useState(location.pathname);
    useEffect(() => {
        const {
            pathname
        } = location;
        setComparedKey(pathname.substr(pathname.indexOf('/') + 1))
    }, [location.pathname])

    const {
        middlewareNavMap
    } = props;

    return (
         <>
           <nav>
                <ul>
                    {
                        middlewareNavMap.map((route) => {
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


// 渲染页面主题内容
function renderPageWithRoutes(middlewareRouteMap:IRoute[], props) {
    return (<>
        <Switch>
            {
                middlewareRouteMap.map((route) => {
                    return <Route 
                        path={route.path}
                        exact={route.isExact} 
                        key={route.key}
                        component={(props) => {
                            return <route.page {...props} routes={route.children} />
                        }}
                    />
                })
            }
            {/* 页面级 nomatch 未实现 */}
            <Route render={() => <Redirect to="/nomatch" />} /> 
        </Switch>
    </>)
}

export {
    NavComponent,
    renderPageWithRoutes
}
