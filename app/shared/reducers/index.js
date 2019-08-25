// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import database from "./database";

export default function createRootReducer(history: History) {
  let reducers = {
    counter,
    database
  };

  if (history !== null) {
    reducers = {
      ...reducers,
      router: connectRouter(history),
    };
  }

  return combineReducers({ ...reducers });
}
