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
}
