export class Todo {
  [x: string]: any;
  id: number;
  title: string;
  createdOn: Date;
  completed: boolean;
  user?: string;
  category?: string;
  dueDate?: Date;
  priority?: boolean;
}
