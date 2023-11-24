import { Repository } from "typeorm";
import { Task } from "./entities/task.entity";
import { Category } from "./entities/category.entity";
import { createTaskDto } from "./dtos/createTaskDto";
import { connection } from "./database";

export class TaskManager {
  constructor(
    private taskRepo = connection.getRepository(Task),
    private categoryRepo = connection.getRepository(Category)
  ) {}

  async createTask(task: createTaskDto) {
    let newTask = await this.taskRepo.create({
      ...task,
      category: { id: task.category },
    });
    await this.taskRepo.save(newTask);
  }

  async deleteTask(taskId: number) {
    await this.taskRepo.delete(taskId);
  }

  async changeTaskState(taskId: number, status) {
    await this.taskRepo.update(taskId, { isCompleted: status });
  }

  async createCategory(name: string) {
    let newCategory = await this.categoryRepo.create({
      name,
    });
    await this.categoryRepo.save(newCategory);
  }

  async getCategories() {
    return await this.categoryRepo.find();
  }

  async getTasks() {
    return await this.taskRepo.find({ relations: { category: true } });
  }
}
