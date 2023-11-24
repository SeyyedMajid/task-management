import { DataSource } from "typeorm";
import { Task } from "./entities/task.entity";
import { Category } from "./entities/category.entity";

export const connection = new DataSource({
  type: "sqlite",
  database: "tasks.db",
  synchronize: true,
  logging: true,
  entities: [Task, Category],
});


