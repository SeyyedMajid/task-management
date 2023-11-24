import { ipcMain, ipcRenderer } from "electron";
import { TaskManager } from "./TaskManager";
import { createTaskDto } from "./dtos/createTaskDto";
import { mainWindow } from "./index";
const taskManager = new TaskManager();

ipcMain.handle("getTasks", async (event) => {
  const tasks = await taskManager.getTasks();
  return tasks;
});

ipcMain.on("addTask", async (event, taskData: createTaskDto) => {
  try {
    await taskManager.createTask(taskData);
    event.returnValue = "operation-complete";
  } catch (error) {
    event.returnValue = "operation-failed";
    throw error;
  }
});

ipcMain.on("deleteTask", async (event, taskId: number) => {
  try {
    await taskManager.deleteTask(taskId);
    event.returnValue = "operation-complete";
  } catch (error) {
    event.returnValue = "operation-failed";
    throw error;
  }
});

ipcMain.on("addCategory", async (event, name: string) => {
  try {
    await taskManager.createCategory(name);
    event.returnValue = "operation-complete";
  } catch (error) {
    event.returnValue = "operation-failed";
    throw error;
  }
});

ipcMain.handle("getCategories", async (event) => {
  const categories = await taskManager.getCategories();
  // ipcRenderer.send()
  return categories;
});

ipcMain.on("markTaskAsCompleted", async (event, taskId, status) => {
  await taskManager.changeTaskState(taskId,status);
  event.returnValue = "operation-complete";
});

// ipcMain.on('deleteTask', async (event, taskId) => {
//   await TaskManager.deleteTask(taskId);
//   mainWindow.webContents.send('tasksUpdated');
// });
