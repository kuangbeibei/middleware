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
    Redirect
} from "react-router-dom"

import Allpages from "@pages/Entries"

// 渲染页面主体内容，后续加上auth身份等判断
function renderPageWithRoutes(middlewareRouteMap: IRoute[], props) {
    return (<>
        <Switch>
            {
                middlewareRouteMap.map((r: IRoute) => {
                    const route = (r: IRoute) => {
                        const Component = r.component && Allpages[r.component];
                        return <Route
                            path={r.key}
                            exact={r.isExact}
                            key={r.key}
                            component={
                                props => <Component {...props} routes={r.subs} />
                            }
                        />
                    }
                     return r.component
                            ? route(r)
                            : r.subs && r.subs.map((r: IRoute) => route(r));
                })
            }
            {/* 主体路由级 nomatch 未实现 */}
            <Route render={() => <Redirect to="/nomatch" />} /> 
        </Switch>
    </>)
}

export {
    renderPageWithRoutes
}