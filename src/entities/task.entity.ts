import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "datetime" })
  dueDate: Date;

  @Column({ type: "boolean", default: false })
  isCompleted: boolean;

  @ManyToOne(() => Category)
  category: Category;
}
