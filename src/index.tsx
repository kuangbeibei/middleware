/*
 * @Author: kuangdan
 * @Date: 2019-10-31 15:42:28
 * @Last Modified: 2019-10-31 15:42:28
 */

import * as React from "react";
import * as ReactDom from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import createStore from "./store";

import "./assets/style/reset.less";
import "./assets/style/layout.less";

const store = createStore();
ReactDom.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
