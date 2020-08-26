import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Todo } from '../models/Todo';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  todo : Todo;
  todos : Todo[];
  // completed : boolean = false;
  // priority : boolean = false; 

  constructor(
    private ts: TaskService,
    private location: Location
  ) { }

  ngOnInit(): void {

  }

  add(task: string, category: string, dueDate: Date, completed: boolean, priority: boolean): void {
    
    task = task.trim();
    category = category.trim();
    if (!task) { return; }
    let todoJSON: Todo = {
      "id": 0,
      "title": task,
      "createdOn": null,
      "completed": completed,
      "user" : null,
      "category": category,
      "dueDate": dueDate,
      "priority": priority
    };

    this.ts.addTodo(todoJSON)
      .subscribe(todo => 
        location.reload()
        
      );

  }

  reset(): void {
    location.reload();
  }


  getTodos(): void {
    this.ts.getTodos()
      .subscribe(todos => this.todos = todos);

  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.ts.updateTodo(this.todo)
      .subscribe(() => this.goBack());
  }

}
