import { ipcMain } from "electron";

ipcMain.on("onSubmit", (event, param) => {
  console.log(param);
});


