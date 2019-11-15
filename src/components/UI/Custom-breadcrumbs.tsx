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

import { MiddlewarePathPrefix } from "@utils/data"

const generateBreadcrumbs = (pathSnippets) => {
	let baseUrl;

	return pathSnippets.reduce((prev, cur, idx) => {
		const generate = () => {

		}

		return prev
	}, [])
}

export default function(props) {
	const {
		location: { pathname },
		routeProps
	} = props;

	let pathSnippets = pathname.split("/").filter(i => i);

	if (routeProps) {
		let baseUrl; // 要做累加
		let BreadcrumbItems = pathSnippets.reduce((prev, next, idx) => { // 实现了，但这方法需要用迭代封装优化！
			if (next === MiddlewarePathPrefix) {
				return prev;
			}
			let sliceSnippet = pathSnippets.slice(0, idx + 1);
			let url = !baseUrl ? `/${sliceSnippet.join("/")}` : `${baseUrl}/${next}`;
			let title = routeProps[url];
			if (!title) {
				sliceSnippet[sliceSnippet.length - 1] = variable;
				let tempUrl = `/${sliceSnippet.join("/")}`

				title = routeProps[tempUrl];
				if (!title) {
					baseUrl += `/${next}`;
					return prev;
				} else {
					baseUrl = tempUrl;
				}
			} else {
				baseUrl = url;
			}

			prev.push(
				<Breadcrumb.Item key={url}>
					{idx === pathSnippets.length - 1 ? (
						title
					) : (
						<Link to={url}>{title}</Link>
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

	// return generateBreadcrumbs(pathSnippets) || null
}
