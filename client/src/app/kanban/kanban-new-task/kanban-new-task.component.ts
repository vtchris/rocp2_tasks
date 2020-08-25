import { Component, OnInit } from '@angular/core';

import { Todo } from 'src/app/models/Todo';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-kanban-new-task',
  templateUrl: './kanban-new-task.component.html',
  styleUrls: ['./kanban-new-task.component.css']
})
export class KanbanNewTaskComponent implements OnInit {

  constructor(
    private ts: TaskService
  ) { }

  ngOnInit(): void {
  }

  add(taskTitle: string, taskDueDate: Date, taskCategory: string) {
    if (!taskTitle) { return; }
    else {
      let todoJSON: Todo = {
        "id": 0,
        "title": taskTitle,
        "createdOn": null,
        "completed": false,
        "user": null,
        "dueDate": taskDueDate,
        "category": taskCategory,
        "priority": false
      };
      this.ts.addTodo(todoJSON).subscribe();
    }
  }
}
