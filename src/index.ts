import { app, BrowserWindow } from "electron";
import * as path from "path";
import { connection } from "./database";
import "./ipcFunctions";

createApp();

export let mainWindow: BrowserWindow;

async function createApp() {
  await connection.initialize().then(() => {
    console.log("db connection successfull");
  });

  if (require("electron-squirrel-startup")) {
    app.quit();
  }

  function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1000,
      height: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js"),
      },
      autoHideMenuBar: true,
      maximizable: false,
      // resizable: false,
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));

    // mainWindow.webContents.openDevTools();
  }

  app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
}
