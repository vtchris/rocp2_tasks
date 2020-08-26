import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  todos: Todo[];
  today: Date;
  verbose: boolean = false; //turns on additional fields in tasklist for filter/sort/debugging

  @Input() filter: string;
  filters: string[] = ["Select Filter",
    "Incomplete", "Completed",
    "Priority", "Not Priority",
    "Has Due Date", "Overdue",
    "Non-Kanban"];

  @Input() sortType: string;
  sortTypes: string[] = ["Select Sort Type", "Oldest First", "Newest First", "Due Date"]

  constructor(private ts: TaskService) { }

  ngOnInit(): void {
    this.getTodos();
    this.today = new Date();
  }

  getTodos(): void {
    this.ts.getTodos()
      .subscribe(todos => this.todos = todos);
  }

  add(task: string): void {
    task = task.trim();
    if (!task) { return; }
    let todoJSON: Todo = {
      "id": 0,
      "title": task,
      "createdOn": null,
      "completed": false
    };

    this.ts.addTodo(todoJSON)
      .subscribe(todo => {
        this.getTodos()
      });

  }

  delete(todo: Todo): void {
    this.todos = this.todos.filter(t => t !== todo)
    this.ts.deleteTodo(todo).subscribe();
  }

  markCompleted(task: Todo): void {
    this.ts.updateTodo(task).subscribe();
  }

  reloadPage(): void {
    location.reload();
  }

  filterTasks(filter: string): void {
    switch (filter) {
      case "Completed":
        this.todos = this.todos
          .filter(todo => todo.completed);
        break;
      case "Incomplete":
        this.todos = this.todos
          .filter(todo => !todo.completed);
        break;
      case "Priority":
        this.todos = this.todos
          .filter(todo => todo.priority);
        break;
      case "Not Priority":
        this.todos = this.todos
          .filter(todo => !todo.priority);
        break;
      case "Has Due Date":
        this.todos = this.todos
          .filter(todo => todo.dueDate);
        break;
      case "Overdue":
        this.todos = this.todos
          .filter(todo => todo.dueDate)
          //I don't know why I need to put these two dates into NEW dates, 
          //but it doesn't work otherwise, so... WHATEVER!
          .filter(todo => new Date(todo.dueDate) < new Date(this.today))
          .filter(todo => !todo.completed);
        break;
      case "Non-Kanban":
        this.todos = this.todos
          .filter(todo => !this.ts.isKanbanTask(todo));
        break;
      default:
        this.getTodos();
    }
  }

  sortTasks(sort: string): void {
    switch (sort) {
      case "Oldest First":
        this.todos = this.todos.sort((a, b) =>
          (new Date(a.createdOn) < new Date(b.createdOn)) ? 1 : -1);
        break;
      case "Newest First":
        this.todos = this.todos.sort((a, b) =>
          (new Date(a.createdOn) > new Date(b.createdOn)) ? 1 : -1);
        break;
      case "Due Date":
        this.todos = this.todos
          .sort((a, b) => (new Date(a.dueDate) > new Date(b.dueDate)) ? 1 : -1);
        break;
      default:
        this.getTodos();
    }
  }
}
