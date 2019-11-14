import { MODAL_VISIBILITY } from "../action-types";

export default function setTableModalVisibility() {
	return async dispatch => {
		dispatch({
			type: MODAL_VISIBILITY
		});
	};
}
