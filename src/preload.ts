import { contextBridge, ipcRenderer } from "electron";
import { createTaskDto } from "./dtos/createTaskDto";

contextBridge.exposeInMainWorld("api", {
  addTask: async (task: createTaskDto) => {
    return await ipcRenderer.sendSync("addTask", task);
  },
  getTasks: async () => await ipcRenderer.invoke("getTasks"),
  changeTaskState: async (taskId, status) => {
    return await ipcRenderer.sendSync("markTaskAsCompleted", taskId, status);
  },
  deleteTask: async (taskId) => {
    await ipcRenderer.sendSync("deleteTask", taskId);
  },
  addCategory: async (name: string) => {
    return await ipcRenderer.sendSync("addCategory", name);
  },
  getCategories: async () => await ipcRenderer.invoke("getCategories"),
});
