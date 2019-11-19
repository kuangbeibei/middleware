import { DRAWER_VISIBILITY } from "../action-types";

export default function setDrawerVisibility() {
	return async dispatch => {
		dispatch({
			type: DRAWER_VISIBILITY
		});
	};
}
