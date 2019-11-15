/*
 * @Author: kuangdan
 * @Date: 2019-11-12 10:25:26
 * @Last Modified: 2019-11-12 10:25:26
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setSideBarFlag from "@actions/setSidebar";

import { Link } from "react-router-dom";

import { middlewareNavMap, allNavMap } from "@router/config";

interface INavComponentProps {
	// middlewareNavMap: IRoute[];
	allNavMap: any,
	location: any;
	setSideBarFlag: Function;
}

// 渲染导航栏
const NavComponent: React.SFC<INavComponentProps> = props => {
	const {
		location: { pathname },
		// middlewareNavMap,
		allNavMap,
		setSideBarFlag
	} = props;

	let [comparedKey, setComparedKey] = useState(pathname);


	useEffect(() => {
		// 1. 处理nav导航， compare之比较路径之后的第一个斜杠后面的
		const start = pathname.indexOf("/");
		const end = pathname.indexOf("/", start + 1);
		if (end > -1) {
			setComparedKey(pathname.substr(start + 1, end - 1));
		} else {
			setComparedKey(pathname.substr(start + 1));
		}
		
	}, [pathname]);

	useEffect(() => {
		if (comparedKey.indexOf("/") === -1) {
			// 2. 处理sidebar，dispatch navFlag过去
			setSideBarFlag({
				navFlag: comparedKey
			})
		}
	}, [comparedKey])
	

	return (
		<>
			<nav>
				<ul>
					{allNavMap.map(route => {
						return (
							<li
								key={route.key}
								className={
									comparedKey === route.name
										? "active"
										: ""
								}
							>
								<Link to={route.key}>{route.navname}</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</>
	);
};

function Header(props) {
	return (
		<header>
			<NavComponent allNavMap={allNavMap} {...props} />
		</header>
	);
}

export default connect(
	state => state,
	dispatch => ({
		setSideBarFlag: bindActionCreators(setSideBarFlag, dispatch)
	})
)(Header);
