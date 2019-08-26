import {BrowserWindow} from 'electron';
import path from 'path';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';

import MenuBuilder from './menu';

const mainHtml = path.join(__dirname, '../renderer/assets/html/main.html');
let mainWindow = null;

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

function showWindow() {
  mainWindow.show();
  mainWindow.focus();
}

export default function createWindow() {
  if (mainWindow !== null) {
    if (!mainWindow.webContents.isLoading()) {
      showWindow();
    }
    return mainWindow;
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${mainHtml}`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    showWindow();
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      showWindow();
    }
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();

  return mainWindow;
}
