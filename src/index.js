const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    title: 'athan app',

		// dimensions
		width: 800,
		height: 730,
		minWidth: 500,
		minHeight: 500,
    frame: false
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '/mainWindow/mainWindow.html'),
      protocol: 'file:',
      slashes: true
    })
  );
});