import { SIDEBAR_FLAG } from "../action-types";

export default function setSideBarFlag({navFlag}) {
	return async dispatch => {
		dispatch({
            type: SIDEBAR_FLAG,
            navFlag
		});
	};
}
