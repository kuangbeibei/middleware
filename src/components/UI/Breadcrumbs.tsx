/*
 * @Author: kuangdan 
 * @Date: 2019-11-11 18:12:40 
 * @Last Modified: 2019-11-11 18:12:40 
 */ 

import * as React from "react"
import { Link, useLocation } from "react-router-dom";
import {
    Breadcrumb
} from "antd"

export default function (props) {
    let location = useLocation();

    const regExpSeparator = /\//g;
    const pathSnippets = location.pathname.split(regExpSeparator).filter(i => i); // 过滤掉空项

    return (
        <Breadcrumb>
            {/* 若有首页，先首页 */}
            {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
			<Breadcrumb.Item>
				<a href="">Application Center</a>
			</Breadcrumb.Item>
			<Breadcrumb.Item>
				<a href="">Application List</a>
			</Breadcrumb.Item>
			<Breadcrumb.Item>An Application</Breadcrumb.Item> */}
        </Breadcrumb>
    )
}