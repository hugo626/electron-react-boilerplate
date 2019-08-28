// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../../shared/reducers';
import type { counterStateType } from '../../shared/reducers/types';
import rootSaga from '../../shared/saga/root';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, sagaMiddleware, router);

function configureStore(initialState?: counterStateType) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}

export default { configureStore, history };
