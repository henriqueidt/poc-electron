import { app, BrowserWindow, ipcMain } from "electron";
import store, { saveNote } from "./store/store";

let windows = new Set();
let mainWindow;

const { getState, setState, subscribe, destroy } = store;

function createWindow({ note = null, isNewNoteWindow = false }) {
  let window = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#ffffff",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: isNewNoteWindow
        ? NEW_TASK_WINDOW_PRELOAD_WEBPACK_ENTRY
        : MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  if (!isNewNoteWindow) {
    mainWindow = window;
  }

  windows.add(window);
  window.webContents.openDevTools();

  window.loadURL(
    isNewNoteWindow ? NEW_TASK_WINDOW_WEBPACK_ENTRY : MAIN_WINDOW_WEBPACK_ENTRY
  );

  window.on("closed", () => {
    windows.delete(window);
    window = null;
  });

  const { notes } = getState();

  window.webContents.on("did-finish-load", () => {
    if (isNewNoteWindow) {
      if (note) {
        window.send("load-note", note);
      }
    } else {
      window.send("notes-update", notes);
    }
  });

  subscribe((state) => {
    mainWindow.send("notes-update", state.notes);
  });
}

async function registerListeners() {
  ipcMain.on("openNewNoteWindow", (_, note) => {
    createWindow({ note, isNewNoteWindow: true });
  });

  ipcMain.on("onNoteSave", (_, note) => {
    saveNote(note);
    const savedWindow = BrowserWindow.getFocusedWindow();
    savedWindow.close();
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
