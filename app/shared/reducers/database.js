// @flow
import {TODOS_FETCH_SUCCEEDED} from '../actions/db';
import type { Action } from './types';

const initialState = {
  todos:[]
}

export default function database(state=initialState, action: Action) {
  switch (action.type) {
    case TODOS_FETCH_SUCCEEDED:
      return {
        ...state,
        todos: action.todos
      };
    default:
      return state;
  }
}
