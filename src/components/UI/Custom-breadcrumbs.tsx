/*
 * @Author: kuangdan
 * @Date: 2019-11-11 18:12:40
 * @Last Modified: 2019-11-11 18:12:40
 */

import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import {
	variable 
} from "@tools"

export default function(props) {
	const {
		location: { pathname },
		routeProps
	} = props;

	let pathSnippets = pathname.split("/").filter(i => i);

	if (routeProps) {

		let comparedUrl; // 要做累加
		let BreadcrumbItems = pathSnippets.reduce((prev, next, idx) => { // 实现了，但这方法需要用迭代封装优化！
			let sliceSnippet = pathSnippets.slice(0, idx + 1);
			let url = !comparedUrl ? `/${sliceSnippet.join("/")}` : `${comparedUrl}/${next}`;
			let title = routeProps[url];
			if (!title) {
				sliceSnippet[sliceSnippet.length - 1] = variable;
				let tempUrl = `/${sliceSnippet.join("/")}`

				title = routeProps[tempUrl];
				if (!title) {
					prev.push("");
					comparedUrl += `/${next}`;
					return prev;
				} else {
					comparedUrl = tempUrl;
				}
			} else {
				comparedUrl = url;
			}

			let link = url;
			prev.push(
				<Breadcrumb.Item key={link}>
					{idx === pathSnippets.length - 1 ? (
						title
					) : (
						<Link to={link}>{title}</Link>
					)}
				</Breadcrumb.Item>
			);
			return prev;
		}, []);

		return (
			<Breadcrumb>
				{/* 若有首页，先首页 */}
				{/* <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
				{BreadcrumbItems}
			</Breadcrumb>
		);
	}
	return null;
}
