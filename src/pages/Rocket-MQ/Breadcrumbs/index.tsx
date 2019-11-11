import * as React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import breadcrumbNameMap from "./data";

const regExpSeparator = /\//g;

export default function(props) {
	console.log("breadcrumbNameMap ,", breadcrumbNameMap);
	const {
		location: { pathname }
	} = props;

	const pathSnippets = pathname.split(regExpSeparator).filter(i => i); // 过滤掉空项
    
    // useEffect

	return (
		<Breadcrumb>
			{pathSnippets.map((item, idx) => {
				const url = `/${pathSnippets.slice(0, idx + 1).join("/")}`;
                if (breadcrumbNameMap[url]) {
                    // 首先，url上的路由，如果能和routes匹配到的，直接link过去
					return (
						<Breadcrumb.Item key={url}>
							<Link to={url}>{breadcrumbNameMap[url]}</Link>
						</Breadcrumb.Item>
					);
                } else {
                    // 第二，如果不能完全匹配，需要逐一进行配对，进行的是结构匹配！
                    console.log("pathSnippets", pathSnippets);
                    
                    // 第三，如果都没有匹配到，不处理（自然会显示到最近的上级页面，但是需要下面的页面显示404，不然路由、面包屑、页面内容不匹配）
                }
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

// 已知url pathSnippets 的数组长度，以及数组的每一项
// 便利breadcrumbNameMap，的key
    // split “/”拆分，长度要和pathSnippets一致
    // 一致的，进行逐一匹配，遇到 冒号的不匹配，非冒号的一定要匹配才行

