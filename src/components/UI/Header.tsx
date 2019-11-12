/*
 * @Author: kuangdan 
 * @Date: 2019-11-12 10:25:26 
 * @Last Modified: 2019-11-12 10:25:26 
 */ 

import * as React from "react"
import { useState, useEffect } from "react"

import {
    Link,
} from "react-router-dom"

import { middlewareNavMap } from "@router/config";

interface INavComponentProps {
    middlewareNavMap: IRoute[],
} 

// 渲染导航栏
const NavComponent: React.SFC<INavComponentProps> = (props) => {
    let [comparedKey, setComparedKey] = useState(location.pathname);
    useEffect(() => {
        const {
            pathname
        } = location;
        setComparedKey(pathname.substr(pathname.indexOf('/') + 1))
    }, [location.pathname])

    const {
        middlewareNavMap
    } = props;

    return (
         <>
           <nav>
                <ul>
                    {
                        middlewareNavMap.map((route) => {
                            return <li key={route.key} className={comparedKey === route.key ? 'active' : ''}>
                                <Link to={route.key}>{route.name}</Link>
                            </li>
                        })
                    }
                </ul>
            </nav> 
        </>
    )
}


export default function (props) {
    return (
        <header>
				<div className="logo"></div>
				<NavComponent middlewareNavMap={middlewareNavMap} />
			</header>
    )
}