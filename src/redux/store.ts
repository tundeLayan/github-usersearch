import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./";

const initialState = {};
const middleware = [thunk];
const middlewareEnhancer = applyMiddleware(...middleware);
const composedEnhancers = composeWithDevTools(middlewareEnhancer);

export const store = createStore(rootReducer, initialState, composedEnhancers);
