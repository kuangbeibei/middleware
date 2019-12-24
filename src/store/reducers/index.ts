/*
 * @Author: kuangdan
 * @Date: 2019-11-09 20:45:43
 * @Last Modified: 2019-11-09 20:45:43
 */

import { combineReducers } from "redux";

import tableModalVisibility from "./modalVisibility";
import drawerVisibility from "./drawerVisibility"
import navFlagToSidebar from "./sidebar"
import monitorTime from "./Monitor/time"

const RootReducer = combineReducers({
	tableModalVisibility,
	drawerVisibility,
	navFlagToSidebar,
	monitorTime
});

export default RootReducer;
