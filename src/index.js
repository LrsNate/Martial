const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const autoUpdater = electron.autoUpdater;
const appVersion = require('./package.json').version;

if (false && process.env.NODE_ENV !== 'development') {
  const updateFeed = 'https://martial-releases.herokuapp.com/update';
  autoUpdater.setFeedURL(`${updateFeed}?version=${appVersion}&platform=darwin`);

  setInterval(() => autoUpdater.checkForUpdates(), 1800000);
  autoUpdater.checkForUpdates();

  autoUpdater.on('error', () => {
  });

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    electron.dialog.showMessageBox({
      buttons: ['Ok'],
      message: 'Nouvelle mise à jour',
      detail: `Une nouvelle mise à jour est disponible. Elle sera installée au prochain démarrage de l'application.\n\nNouvelle version: v${releaseName}\n${releaseNotes}`,
    });
  });
}


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1000, height: 700 });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  app.quit();
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
