/*
 * @Author: kuangdan
 * @Date: 2019-11-11 18:12:40
 * @Last Modified: 2019-11-11 18:12:40
 */

import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

interface IBreadcrumbs {
    breadItems: Object[]
}

export default function(props) {
	const { breadItems } = props;

	return (
		<Breadcrumb>
			{/* 若有首页，先首页 */}
			{/* <Breadcrumb.Item>Home</Breadcrumb.Item>*/}

            {breadItems.map((item, idx) => {
                if (idx === breadItems.length - 1) {
                    return <Breadcrumb.Item key={item.link}>
                        {item.breadcrumbTitle}
					</Breadcrumb.Item>
                }
                return <Breadcrumb.Item key={item.link}>
						<Link to={item.link}>{item.breadcrumbTitle}</Link>
					</Breadcrumb.Item>
				
			})}
		</Breadcrumb>
	);
}
