import { all } from 'redux-saga/effects'
import loadTodos from "./db";
import watchReadDir from "./worker";

function* mainRootSaga() {
  yield all([
  ])
  // code after all-effect
}

function* workerRootSaga() {
  yield all([
    loadTodos(),
    watchReadDir()
  ])
  // code after all-effect
}

export {mainRootSaga, workerRootSaga}
