import * as React from "react"
import { renderPageWithRoutes } from "@router/index";
import CustomBreadcrumbs from "@com/UI/Custom-breadcrumbs";

import {
    MysqlRouteProps
} from "./data"

export default function(props) {
    return (
        <>
            <section className="breadcrumbs">
                <CustomBreadcrumbs routeProps={MysqlRouteProps} {...props} />
            </section>
			<section className="page-content">
				{renderPageWithRoutes(props.routes, props)}
			</section>
		</>
    )
}