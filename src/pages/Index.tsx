/*
 * @Author: kuangdan
 * @Date: 2019-11-11 14:47:05
 * @Last Modified: 2019-11-11 14:47:05
 */

import * as React from "react";
import { renderPageWithRoutes } from "@router/index";
import { middlewareRouteMap } from "@router/config";

import { Switch } from "react-router-dom";

import Header from "@com/UI/Header";
import SideBar from "@com/UI/Sidebar";
import Footer from "@com/UI/Footer";

export default function PageEntry(props) {
	return (
		<>
			<Header {...props}/>

			<SideBar />

			<main>
				<Switch>
					{renderPageWithRoutes(middlewareRouteMap, props)}
				</Switch>
			</main>

			<Footer />
		</>
	);
}
