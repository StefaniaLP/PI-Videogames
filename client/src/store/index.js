import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

let composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const store = createStore (rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;