import { SIDEBAR_CONTENT } from "../action-types";

export default function setSideBarContent({nav}) {
    console.log('nav ,', nav);
	return async dispatch => {
		dispatch({
            type: SIDEBAR_CONTENT,
            nav
		});
	};
}
