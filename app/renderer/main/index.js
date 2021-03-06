import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {createHashHistory} from 'history';
import Root from './containers/Root';
import configureStore from '../../main/store/configureStore';
import '../assets/css/app.global.css';
import {mainRootSaga} from "../../shared/saga/root";

const history = createHashHistory();
const {store, sagaMiddleware}= configureStore({},history,true);
sagaMiddleware.run(mainRootSaga);

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
