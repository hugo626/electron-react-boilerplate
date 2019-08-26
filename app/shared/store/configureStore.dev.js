import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {electronEnhancer} from 'redux-electron-store';
import {routerActions, routerMiddleware} from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from "redux-logger";
import createRootReducer from '../reducers';
import * as counterActions from '../actions/counter';
import rootSaga from '../sagas/root';

const configureStore = (initialState, history) => {
  // Redux Configuration
  let middleware = [];
  const enhancers = [];
  let elecEnhancer = null;

  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();
  // Thunk Middleware
  middleware.push(thunk);
  middleware.push(sagaMiddleware);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  const rootReducer = createRootReducer(history);
  if (history !== null) {
    // Router Middleware
    const router = routerMiddleware(history);
    middleware = [
      router,
      ...middleware
    ];
    elecEnhancer = electronEnhancer(true)
  }
  if (history === null) {
    middleware = [
      ...middleware,
    ];
    elecEnhancer = electronEnhancer()
  }

  // Redux DevTools Configuration
  const actionCreators = {
    ...counterActions,
    ...routerActions
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
        actionCreators
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware), elecEnhancer);
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('../reducers').default)
    );
  }
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore ;
