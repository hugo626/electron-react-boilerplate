// @flow
import { call, put, takeLatest } from 'redux-saga/effects'
import { TODOS_FETCH_REQUESTED, TODOS_FETCH_SUCCEEDED, TODOS_FETCH_FAILED } from "../actions/db";
import dbApi from "../db/api";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchTodos() {
  try {
     const todos = yield call(dbApi.fetchAll);
     yield put({type: TODOS_FETCH_SUCCEEDED, todos});
  } catch (e) {
     yield put({type: TODOS_FETCH_FAILED, message: e.message});
  }
}

/*
 Alternatively you may use takeLatest.

 Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run.
*/
function* loadTodos() {
 yield takeLatest(TODOS_FETCH_REQUESTED, fetchTodos);
}

export default loadTodos;
