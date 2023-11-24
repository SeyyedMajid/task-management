import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  function: (param: any) => {
    ipcRenderer.send("onSubmit", param);
  },
});
