import { contextBridge, ipcRenderer } from "electron";

export const api = {
  increaseCounter: (newCounter) => {
    ipcRenderer.send("increaseCounter", newCounter);
  },

  openNewWindow: (counter) => {
    ipcRenderer.send("openNewWindow", counter);
  },

  on: (channel, callback) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld("Main", api);
