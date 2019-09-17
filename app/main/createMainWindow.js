import {BrowserWindow, app} from 'electron';
import path from 'path';
import MenuBuilder from "./menu";

let mainWindow = null;

function showWindow() {
  mainWindow.show();
  mainWindow.focus();
}

export default function createMainWindow() {
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

  const mainHtml = path.join(__dirname, '../renderer/assets/html/index.html');
  mainWindow.loadURL(`file://${mainHtml}`);

  mainWindow.once('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      showWindow();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });

  mainWindow.openDevTools();
  if (process.env.NODE_ENV === 'development'||process.env.DEBUG_PROD===true) {
    mainWindow.openDevTools();
  }

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  return mainWindow;
}
