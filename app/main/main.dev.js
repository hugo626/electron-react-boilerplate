/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import {app, ipcMain} from 'electron';
import {autoUpdater} from 'electron-updater';
import log from 'electron-log';
import {createMemoryHistory} from "history";
import {RECEIVED_READ_DIR, REQUEST_READ_DIR} from "../renderer/shared/constants/ipcMessageName";
import createMainWindow from "./createMainWindow";
import createWorkerWindow from "./createWorkerWindow";
import configureStore from "./store/configureStore";
import {mainRootSaga} from "../shared/saga/root";

const history = createMemoryHistory();
const {store, sagaMiddleware }= configureStore({database:'main'},history);
sagaMiddleware.run(mainRootSaga);

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;
let workerWindow = null;
if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  mainWindow = null;
  workerWindow = null;
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = createMainWindow();
  workerWindow = createWorkerWindow();

  ipcMain.on(REQUEST_READ_DIR, (event, arg) => {
    workerWindow.webContents.send(REQUEST_READ_DIR, arg);
    // readFilesAsync(arg).then( files=>{
    //   event.returnValue = files
    // });
  })

  ipcMain.on(RECEIVED_READ_DIR, (event, arg) => {
    console.log(`received Worker's result ${event} ${arg}`)
  })

  workerWindow.webContents.on(REQUEST_READ_DIR, (event, arg) => {
    console.log("worker received the task: " + arg)
  })


  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
});

store.subscribe(() =>{
  console.log(store.getState())
})
