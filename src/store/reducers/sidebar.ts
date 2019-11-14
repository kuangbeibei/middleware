import {
    SIDEBAR_CONTENT
} from "../action-types"

interface ISidebar {
    // visible: boolean
}

const initSidebar:ISidebar = {
    // visible: false
}

export default (state = initSidebar, action) => {
    console.log('action~~~~, ', action)
    switch (action.type) {
        case SIDEBAR_CONTENT:
            // state = { visible: !state.visible };
            return state
        default:
            return state
    }
}