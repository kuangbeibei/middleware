import {
    SIDEBAR_FLAG
} from "../action-types"

interface ISidebar {
    navFlag: string
}

const initSidebaFlagr:ISidebar = {
    navFlag: ''
}

export default (state = initSidebaFlagr, action) => {
    switch (action.type) {
        case SIDEBAR_FLAG:
            state = { navFlag: action.navFlag };
            return state
        default:
            return state
    }
}