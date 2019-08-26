import {BrowserWindow} from 'electron';
import path from 'path';

const mainHtml = path.join(__dirname, '../renderer/assets/html/worker.html');

let workerWindow = null;

function showWindow() {
  workerWindow.show();
  workerWindow.focus();
}

export default function createWindow() {
  if (workerWindow !== null) {
    if (!workerWindow.webContents.isLoading()) {
      showWindow();
    }
    return workerWindow;
  }

  workerWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });


  workerWindow.loadURL(`file://${mainHtml}`);

  workerWindow.webContents.on('ready-to-show', () => {
    if (!workerWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    console.log("Show window!!");
    showWindow();
    if (process.env.START_MINIMIZED) {
      workerWindow.minimize();
    } else {
      showWindow();
    }
  });

  workerWindow.on('closed', () => {
    workerWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    workerWindow.openDevTools();
  }

  return workerWindow;
}
