import {
    MODAL_VISIBILITY
} from "../action-types"

export default function setTableModalVisibility(dispatch) {
    return () => {
        dispatch({
            type: MODAL_VISIBILITY
        })
    }
}