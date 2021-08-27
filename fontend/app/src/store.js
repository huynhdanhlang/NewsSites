import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import combineReducers from "./redux/reducers/index";
import createSagaMiddleware from "redux-saga";
import mySaga from "./redux/saga/posts";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunk, sagaMiddleware];

const store = createStore(
  combineReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(mySaga);
export default store;
