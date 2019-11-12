/*
 * @Author: kuangdan
 * @Date: 2019-11-11 18:12:40
 * @Last Modified: 2019-11-11 18:12:40
 */

import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

export default function(props) {
	const {
		location: { pathname },
		routeProps
	} = props;

	let pathSnippets = pathname.split("/").filter(i => i);
	console.log("pathSnippets", pathSnippets);
	console.log('RocketmqRouteProps', routeProps);
	if (routeProps) {
		const BreadcrumbItems = pathSnippets.map((_, index) => {
			let copyPathSnippets = pathSnippets.slice(0);
			let url = `/${copyPathSnippets.slice(0, index + 1).join("/")}`;
			let link = url;
			if (!routeProps[url]) {
				copyPathSnippets[copyPathSnippets.length - 1] = ":"
				url = `/${copyPathSnippets.slice(0).join("/")}`;
				link = pathname
			}
			
			return (
				<Breadcrumb.Item key={url}>
					<Link to={link}>{routeProps[url]}</Link>
				</Breadcrumb.Item>
			);
		});
		return (
			<Breadcrumb>
				{/* 若有首页，先首页 */}
				{/* <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
				{
					BreadcrumbItems
				}
			</Breadcrumb>
		);
	}
	return null;
}
