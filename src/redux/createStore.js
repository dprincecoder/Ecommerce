import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk"
import rootReducer from './rootReducer'
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware()
export const middleware = [thunk, sagaMiddleware, logger];

export const store = createStore(rootReducer, applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga)

export default store;