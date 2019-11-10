import * as React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import breadcrumbNameMap from "./data";

const regExpSeparator = /\//g;

export default function(props) {
    console.log('breadcrumbNameMap ,', breadcrumbNameMap);
	const {
		location: { pathname }
	} = props;

    const pathSnippets = pathname.split(regExpSeparator).filter(i => i); // 过滤掉空项
    
    console.log('pathSnippets', pathSnippets);

	// useEffect

	return (
		<Breadcrumb>
			{pathSnippets.map((item, idx) => {
                const url = `/${pathSnippets.slice(0, idx + 1).join('/')}`;
                console.log('url,', url);
                console.log('breadcrumbNameMap[url],', breadcrumbNameMap[url])
				return (
					<Breadcrumb.Item key={url}>
						<Link to={url}>{breadcrumbNameMap[url]}</Link>
					</Breadcrumb.Item>
				);
			})}
			{/* <Breadcrumb.Item>Home</Breadcrumb.Item>
			<Breadcrumb.Item>
				<a href="">Application Center</a>
			</Breadcrumb.Item>
			<Breadcrumb.Item>
				<a href="">Application List</a>
			</Breadcrumb.Item>
			<Breadcrumb.Item>An Application</Breadcrumb.Item> */}
		</Breadcrumb>
	);
}
