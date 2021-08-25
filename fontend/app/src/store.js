import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import combineReducers from "./reducers";

const middlewares = [thunk];

const store = createStore(
  combineReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
