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
import {app, dialog } from 'electron';
import configureStore from '../shared/store/configureStore';
import createMainWindow from "./createMainWindow";
import createWorkerWindow from "./createWorkerWindow";


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

async function start() {

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const store = configureStore(global.state, null );

  let currentState
  store.subscribe(() =>{
    let oldState = currentState;
    currentState = store.getState()
    console.log(currentState)
    // if(!oldState){
    //   createNotificationWindow(currentState.notificationWindow.name)
    // }
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  // init
  createMainWindow();
  // createWorkerWindow();
}


app.on('ready', ()=>{
  start()
    .catch((err) => {
      dialog.showErrorBox('There\'s been an error', err);
    });
});

