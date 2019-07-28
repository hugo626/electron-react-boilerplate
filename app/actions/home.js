// @flow
import type { GetState, Dispatch } from '../reducers/types';
const {ipcRenderer} = require('electron');
import { READ_DIR } from "../constants/ipcMessageName";

const READ_DIR_REQUEST = 'READ_DIR_REQUEST';
const READ_DIR_SUCCEEDED = 'READ_DIR_SUCCEEDED';
const READ_DIR_FAILED = 'READ_DIR_FAILED';

const readDirRequest = (path:string = ".") =>{
  return {
    type: READ_DIR_REQUEST,
    path
  };
}

const readDirIpc = (path:string = ".") =>{
  return ipcRenderer.sendSync(READ_DIR, path)
}


export {READ_DIR_REQUEST, READ_DIR_SUCCEEDED, READ_DIR_FAILED, readDirRequest, readDirIpc};
