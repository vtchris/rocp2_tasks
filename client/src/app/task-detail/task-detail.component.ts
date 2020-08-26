import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/Todo';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  todo: Todo;
  todos: Todo[];

  constructor(
    private route: ActivatedRoute,
    private ts: TaskService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getTodo();
    this.getTodos();
  }

  getTodo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // console.log('Once the getTodo function is up, this will work properly!');
    this.ts.findTodo(id)
      .subscribe(todo => this.todo = todo);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.ts.updateTodo(this.todo)
      .subscribe(() => this.goBack());
  }


  delete(todo: Todo): void {
//    this.todos = this.todos.filter(t => t !== todo)
    this.ts.deleteTodo(todo).subscribe(()=> this.goBack());
  //  this.goBack();
  //this.getTodos();
  }


  getTodos(): void {
    this.ts.getTodos()
      .subscribe(todos => this.todos = todos);

  }

  markCompleted(task: Todo): void {
    this.ts.updateTodo(task).subscribe();
  }

}
