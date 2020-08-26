import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Title } from '@angular/platform-browser';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  upcomingTasks: Todo[] = [];
  today: Date;

  constructor(private taskService: TaskService, private titleService: Title) { }

  ngOnInit(): void {
    this.setTitle('Taskadoodle');
    this.getUpcomingTasks();
    this.today = new Date();    
  }

  getUpcomingTasks(): void {
    this.taskService.getTodos()
      .subscribe(upcomingTasks =>
        this.upcomingTasks =
        upcomingTasks
          .filter(task => !task.completed)  //Finds only incomplete tasks
          .filter(task=> task.dueDate) //Finds tasks that have a due date
          .sort((a, b) => (a.dueDate > b.dueDate) ? 1 : -1) //sorts list by due date (oldest first). 
          //TODO: sort by due date instead
          .slice(0, 6));   //Takes top 5 tasks from filtered list
  }

  setTitle( newTitle: string): void {
    this.titleService.setTitle( newTitle );
  }

  markCompleted(task: Todo): void {
    if (this.taskService.isKanbanTask(task)){
      this.taskService.syncKanbanCompleted(task);
    }
    this.taskService.updateTodo(task).subscribe();
  }

  isKanbanTask(task: Todo): boolean{
    return this.taskService.isKanbanTask(task);
  }

}
