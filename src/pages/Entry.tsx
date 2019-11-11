/*
 * @Author: kuangdan 
 * @Date: 2019-11-11 14:47:05 
 * @Last Modified: 2019-11-11 14:47:05 
 */ 

import * as React from "react"
import { NavComponent, renderPageWithRoutes } from "@router/index";
import middlewareRouteMap from "@router/routes";

export default function PageEntry(props) {
    return (
        <>
            <header>
				<div className="logo"></div>
				<NavComponent middlewareRouteMap={middlewareRouteMap} />
			</header>

			<aside className="sidebar"></aside>

			<main>{renderPageWithRoutes(middlewareRouteMap)}</main>

			<footer></footer>
        </>
    )
}