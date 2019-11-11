/*
 * @Author: kuangdan
 * @Date: 2019-11-11 14:19:44
 * @Last Modified: 2019-11-11 14:19:44
 */

import * as React from "react";
const img = require("../assets/image/404.png");

function NotFound(props) {
	return (
		<div
			style={{
				height: "100%",
				background: "#ececec",
				overflow: "hidden"
			}}
		>
			<img src={img} alt="404" />
		</div>
	);
}

export default NotFound;
