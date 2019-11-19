import {
    DRAWER_VISIBILITY
} from "../action-types"

interface IDrawerVisibility {
    visible: boolean
}

const initDrawerVisibility:IDrawerVisibility = {
    visible: false
}

export default (state = initDrawerVisibility, action) => {
    switch (action.type) {
        case DRAWER_VISIBILITY:
            state = { visible: !state.visible };
            return state
        default:
            return state
    }
}