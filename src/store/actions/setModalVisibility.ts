import {
    MODAL_VISIBILITY
} from "../action-types"

export default function setTableModalVisibility(dispatch) {
    return async (dispatch) => {
        dispatch({
            type: MODAL_VISIBILITY
        })
    }
}