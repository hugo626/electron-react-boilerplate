import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, routerActions } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { electronEnhancer } from 'redux-electron-store';
import { ipcRenderer, ipcMain } from "electron";
import createRootReducer from '../../shared/reducers';
import * as counterActions from '../../shared/actions/counter';
import type { counterStateType } from '../../shared/reducers/types';

const configureStore = (initialState?: counterStateType, history, isRenderStore = false) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];
  const rootReducer = createRootReducer(history);
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

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...counterActions,
    ...routerActions
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = (isRenderStore && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
        actionCreators
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware),electronEnhancer({
    // Necessary for synched actions to pass through all enhancers
    dispatchProxy: a => store.dispatch(a),
  }));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);
  if (module.hot && isRenderStore) {
    module.hot.accept(
      '../../shared/reducers',
      // eslint-disable-next-line global-require
      () => {
        ipcRenderer.sendSync('renderer-reload');
        store.replaceReducer(require('../../shared/reducers').default)
      });
  } else {
    // In the main process
    ipcMain.on('renderer-reload', (event, action) => {
      delete require.cache[require.resolve('../../shared/reducers')];
      store.replaceReducer(require('../../shared/reducers'));
      event.returnValue = true;
    });
  }

  return {store, sagaMiddleware};
};

export default configureStore;
