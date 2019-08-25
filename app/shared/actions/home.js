// @flow
import { ipcRenderer } from "electron";
import {REQUEST_READ_DIR} from "../constants/ipcMessageName";

const READ_DIR_REQUEST = 'READ_DIR_REQUEST';
const READ_DIR_SUCCEEDED = 'READ_DIR_SUCCEEDED';
const READ_DIR_FAILED = 'READ_DIR_FAILED';

const sendReadDirRequest = (path: string = ".") =>({
  type: READ_DIR_REQUEST,
  path
})

const readDirIpc = (path: string = ".") =>(ipcRenderer.send(REQUEST_READ_DIR, path))


export {READ_DIR_REQUEST, READ_DIR_SUCCEEDED, READ_DIR_FAILED, sendReadDirRequest, readDirIpc};
