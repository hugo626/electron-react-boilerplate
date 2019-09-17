// @flow

import {call, put, takeLatest} from 'redux-saga/effects'
import {READ_DIR_FAILED, READ_DIR_REQUEST} from "../actions/worker";
import {readDirecotrySync} from "../tools/readFiles";
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* readDir(action) {
  try {
    console.log(`reading folder: ${action.payload}`);
    const result = yield call(readDirecotrySync, action.payload);
    console.log(`result: ${result}`);
  } catch (e) {
    yield put({type: READ_DIR_FAILED, message: e.message});
  }
}


/*
 Alternatively you may use takeLatest.

 Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run.
*/
function* watchReadDir() {
  yield takeLatest(READ_DIR_REQUEST, readDir);
}

export default watchReadDir;
