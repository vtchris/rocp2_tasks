import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  todos : Todo[];
  

  constructor(private ts : TaskService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.ts.getTodos()
        .subscribe(todos => this.todos = todos);
  }
}
