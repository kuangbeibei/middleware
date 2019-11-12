import {
    MODAL_VISIBILITY
} from "../action-types"

interface IModalVisibility {
    visible: boolean
}

const initModalVisibility:IModalVisibility = {
    visible: false
}

export default (state = initModalVisibility, action) => {
    switch (action.type) {
        case MODAL_VISIBILITY:
            state = { visible: !state.visible };
            return state
        default:
            return state
    }
}