// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { electronEnhancer } from 'redux-electron-store';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import type { counterStateType } from '../reducers/types';
import rootSaga from '../sagas/root';




function configureStore(initialState?: counterStateType, hashHistory ,scope : String = 'main') {
  // Redux Configuration
  let middleware = [];
  const enhancers = [];
  let elecEnhancer = null;

  const rootReducer = createRootReducer(hashHistory);
  // Router Middleware
  const router = routerMiddleware(hashHistory);
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware()
  // Thunk Middleware
  middleware.push(thunk);

  middleware.push(sagaMiddleware);
  if (scope === 'renderer') {
    middleware = [
      router,
      ...middleware
    ];
    elecEnhancer = electronEnhancer(true)

  }
  if (scope === 'main') {
    middleware = [
      ...middleware,
    ];
    elecEnhancer = electronEnhancer()

  }

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware), elecEnhancer);
  const enhancer = compose(...enhancers);

  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}

export default configureStore;
