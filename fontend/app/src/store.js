import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducers from "./redux/reducers/index";
import createSagaMiddleware from "redux-saga";
import mySaga from "./redux/saga/posts";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, thunk];

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(mySaga);
export default store;
