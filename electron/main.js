import { app, BrowserWindow, ipcMain } from "electron";

let windows = new Set();

function createWindow({ counter = 0 }) {
  let window = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#ffffff",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  windows.add(window);
  window.webContents.openDevTools();

  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  window.on("closed", () => {
    window = null;
  });

  window.webContents.on("did-finish-load", () => {
    window.send("increase-counter", counter);
  });
}

async function registerListeners() {
  ipcMain.on("increaseCounter", (_, newCounter) => {
    windows.forEach((window) => {
      window.send("increase-counter", newCounter);
    });
  });

  ipcMain.on("openNewWindow", (_, counter) => {
    createWindow({ counter });
  });
}

app
  .on("ready", createWindow)
  .whenReady()
  .then(registerListeners)
  .catch((e) => console.error(e));

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
