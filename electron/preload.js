import { contextBridge, ipcRenderer } from "electron";

export const api = {
  openNewNoteWindow: (note) => {
    ipcRenderer.send("openNewNoteWindow", note);
  },

  onNoteSave: (note) => {
    ipcRenderer.send("onNoteSave", note);
  },

  on: (channel, callback) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld("Main", api);
