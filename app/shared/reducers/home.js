// @flow
import {READ_DIR_SUCCEEDED} from '../actions/home';
import type { Action } from './types';

const initialState = {
  files:[]
}

export default function database(state=initialState, action: Action) {
  switch (action.type) {
    case READ_DIR_SUCCEEDED:
      return {
        ...state,
        files: action.files
      };
    default:
      return state;
  }
}
