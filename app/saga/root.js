import { all } from 'redux-saga/effects'
import loadTodos from "./db";
import watchReadDir from "./home";

export default function* rootSaga() {
  yield all([
    loadTodos(),
    watchReadDir()
  ])
  // code after all-effect
}
