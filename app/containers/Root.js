// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import type { Store } from '../reducers/types';
import Routes from '../Routes';
import { todosFetchRequested } from "../db/actions";

type Props = {
  store: Store,
  history: {}
};

export default class Root extends Component<Props> {
  render() {
    const { store, history } = this.props;
    store.dispatch(todosFetchRequested());
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}
