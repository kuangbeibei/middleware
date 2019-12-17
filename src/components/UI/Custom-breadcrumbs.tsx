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

const numRegExp = /\d/;

// 两条线：1. 根据title来判断是否添加该面包屑；2. 根据baseUrl来生成与routes匹配的，link是实际的地址 3.得注意有query的情况 

const generateBreadcrumbs = (routeProps, pathSnippets, state?) => {
	let baseUrl;

	return pathSnippets.reduce((prev, cur, idx) => {
		
		if (cur === MiddlewarePathPrefix) {
			return prev
		}

		let sliceSnippet = pathSnippets.slice(0, idx + 1);
		let link = `/${sliceSnippet.join("/")}`;
		baseUrl = !baseUrl ? link : `${baseUrl}/${cur}`;

		compareRoutes(baseUrl, 1);

		function compareRoutes(url, round) {
			let breadTitle = routeProps[url];
			if (breadTitle) {
				baseUrl = url;
				generate(link, breadTitle)
			} else {
				if (round > 1) {
					baseUrl += `/${cur}`;
					return prev;
				}
				// sliceSnippet[sliceSnippet.length - 1] = variable;
				sliceSnippet = sliceSnippet.map(s => {
					if (numRegExp.test(s)) {
						s = variable
					}
					return s
				})
				let tempUrl = `/${sliceSnippet.join("/")}`;
				compareRoutes(tempUrl, 2);
			}
		}

		function generate(link, breadTitle) {
			// console.log('...state!.query, ', state && state!.query);
			prev.push(
				<Breadcrumb.Item key={link}>
					{idx === pathSnippets.length - 1 ? (
						breadTitle
					) : (
						<Link to={{pathname: link, state: {...state!.query} || undefined}}>{breadTitle}</Link>
					)}
				</Breadcrumb.Item>
			);
		}

		return prev

	}, [])

	
}

export default function (props) {
	const {
		location: { pathname, state },
		routeProps
	} = props;
	// console.log('props, ', props);

	let pathSnippets = pathname.split("/").filter(i => i);

	if (routeProps) {
		return generateBreadcrumbs(routeProps, pathSnippets, state)
	}
	return null;
}
