/*
  It is not possible to access the DOM directly from the main process
*/

/*
  app -> Controls the application's event lifecycle
  BrowserWindow -> Creates and manages app windows
  ES Modules (import) not currently supported on Electron
*/
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.webContents.openDevTools();

  ipcMain.handle("ping", () => "pong");
  win.loadFile("index.html");
};

// BrowserWindows can only be created after the 'ready' event is fired
app.whenReady().then(() => {
  createWindow();

  /* 
    On macOS, the app will continue running when all windows are closed.
    Add this to create a new window if none is open when activating the app
  */
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  /*
    Node's 'process.platform' variable tells which platform is running.
    Except for macOS, usually the app will quit when all the windows are closed.
    This is implementing this pattern
    * darwin = macOS
    * linux = Linux
    * win32 = Windwos
  */
  if (process.platform !== "darwin") {
    app.quit();
  }
});
