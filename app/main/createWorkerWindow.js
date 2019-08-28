import {BrowserWindow} from 'electron';
import path from 'path';

let workerWindow = null;

function showWindow() {
  workerWindow.show();
  workerWindow.focus();
}

export default function createMainWindow() {
  if (workerWindow !== null) {
    if (workerWindow.isLoaded()) {
      showWindow();
    }
    return workerWindow;
  }

  workerWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });
  const workerHtml = path.join(__dirname, '../renderer/assets/html/worker.html');
  workerWindow.loadURL(`file://${workerHtml}`);
  workerWindow.once('ready-to-show', () => {
    if (!workerWindow) {
      throw new Error('"workerWindow" is not defined');
    }
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
