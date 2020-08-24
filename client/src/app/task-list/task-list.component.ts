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
  today: Date = new Date();

  @Input() filter: string;
  filters: string[] = ["Select Filter", "Completed", "Incomplete"];

  @Input() sortType: string;
  sortTypes: string[] = ["Select Sort Type", "Oldest First", "Newest First"]

  constructor(private ts: TaskService) { }

  ngOnInit(): void {
    this.getTodos();
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

  filterTasks(filter: string): void {
    switch (filter) {
      case "Completed":
        this.ts.getTodos().subscribe(todos =>
          this.todos = todos.filter(todo => todo.completed));
          break;
      case "Incomplete":
        this.ts.getTodos().subscribe(todos =>
          this.todos = todos.filter(todo => !todo.completed));
          break;
        default:
          this.getTodos();
    }

  }

  sortTasks(sort: string): void {
    switch(sort) {
      case "Oldest First":
        this.ts.getTodos().subscribe(todos =>
          this.todos = todos.sort((a, b) => (a.createdOn < b.createdOn) ? 1 : -1));
          break;
      case "Newest First":
        this.ts.getTodos().subscribe(todos =>
          this.todos = todos.sort((a, b) => (a.createdOn > b.createdOn) ? 1 : -1));
          break;
      default:
        this.getTodos();
    }
  }
}
