import { ipcRenderer } from "electron";
import {createHashHistory} from "history";

import {REQUEST_READ_DIR} from "../shared/constants/ipcMessageName";
import configureStore from "../../main/store/configureStore";
import {todosFetchRequested} from "../../shared/actions/db";
import {workerRootSaga} from "../../shared/saga/root";
import {readDirectory} from "../../shared/actions/worker";

const history = createHashHistory();
const {store, sagaMiddleware }= configureStore({},history,true);
sagaMiddleware.run(workerRootSaga);

store.dispatch(todosFetchRequested());

ipcRenderer.on(REQUEST_READ_DIR, (event,message)=>{
  store.dispatch(readDirectory(message));
})
