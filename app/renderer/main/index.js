import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {createHashHistory} from "history";
import Root from './components/Root';
import configureStore from '../../shared/store/configureStore';
import '../assets/css/app.global.css';

const history = createHashHistory();
const store = configureStore({},history);
render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
