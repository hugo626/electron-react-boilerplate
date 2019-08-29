// @flow
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { electronEnhancer } from 'redux-electron-store';
import createRootReducer from '../../shared/reducers';
import type { counterStateType } from '../../shared/reducers/types';
import rootSaga from '../../shared/saga/root';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

function configureStore(initialState?: counterStateType, history, isRenderStore = false) {

  const rootReducer = createRootReducer(history);
  const router = routerMiddleware(history);
  const enhancer = compose(applyMiddleware(thunk, sagaMiddleware, router),electronEnhancer({
    // Necessary for synched actions to pass through all enhancers
    dispatchProxy: a => store.dispatch(a),
  }));
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}

export default configureStore;
