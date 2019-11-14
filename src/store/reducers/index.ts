/*
 * @Author: kuangdan
 * @Date: 2019-11-09 20:45:43
 * @Last Modified: 2019-11-09 20:45:43
 */

import { combineReducers } from "redux";

import tableModalVisibility from "./modalVisibility";
import navFlagToSidebar from "./sidebar"

const RootReducer = combineReducers({
	tableModalVisibility,
	navFlagToSidebar
});

export default RootReducer;
