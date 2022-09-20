/*
  Preload scripts are injected before the web page loads in the renderer.
  Has access to both HTML DOM and a Node.js environment
*/

/* 
  contextBridge -> creates a safe bi-directional bridge across isolated contexts 
  ipc -> Inter Process Communication = enables communication between main and renderer
*/
const { contextBridge, ipcRenderer } = require("electron");

/* 
  The "Main World" is the JavaScript context that your main renderer code runs in.
  This is exposing a global object called 'versions'
*/
contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
});
