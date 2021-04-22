const { app, BrowserWindow } = require('electron');
const path = require('path');
const INSTANCE_RUNNING = !app.requestSingleInstanceLock();

let mainWindow;

if (INSTANCE_RUNNING) {
  app.quit();
} else {
  app.on('ready', () => {
    mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      },
      title: 'athan app',
  
      // dimensions
      width: 700,
      height: 730,
      minWidth: 700,
      minHeight: 500,
      frame: false
    });
    mainWindow.loadURL(path.join(__dirname, '/mainWindow/mainWindow.html'));
  });
}