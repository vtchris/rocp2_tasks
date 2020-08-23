import { Component, OnInit, NgModule } from '@angular/core';


import { Todo } from '../models/Todo';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  upcomingTasks: Todo[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getUpcomingTasks();
  }

  getUpcomingTasks(): void {
    this.taskService.getTodos()
    .subscribe(upcomingTasks => 
      this.upcomingTasks = 
      upcomingTasks
        .filter(task => !task.completed)  //Finds only incomplete tasks
        .sort((a, b) => (a.createdOn > b.createdOn) ? 1 : -1) //sorts list by creation date (oldest first). 
        //TODO: sort by due date instead
        .slice(0,5));   //Takes top 5 tasks from filtered list
  }

  markCompleted(task: Todo): void {
    this.taskService.updateTodo(task).subscribe();
  }

}
