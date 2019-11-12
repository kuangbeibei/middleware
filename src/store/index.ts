import {
    createStore,
    compose,
    applyMiddleware
} from "redux"

import thunk from "redux-thunk"

import RootReducer from "./reducers"

export default (initialState={}) => createStore(RootReducer, initialState, applyMiddleware(thunk))

