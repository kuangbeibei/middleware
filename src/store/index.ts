import {
    createStore,
    compose,
    applyMiddleware
} from "redux"

import thunk from "redux-thunk"

import RootReducer from "./reducers"

export default <T extends object>(initialState: T = Object.create({})) => createStore(RootReducer, initialState, applyMiddleware(thunk))

