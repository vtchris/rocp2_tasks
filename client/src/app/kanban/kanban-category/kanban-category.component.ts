import { Component, OnInit, Input } from '@angular/core';
import { categories } from '../categories-enum';

import { Todo } from '../../models/Todo';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-kanban-category',
  templateUrl: './kanban-category.component.html',
  styleUrls: ['./kanban-category.component.css']
})
export class KanbanCategoryComponent implements OnInit {

  @Input() category: categories;
  private categories = categories;
  categoryOptions = [];
  tasks: Todo[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getKanbanTasks();
    this.categoryOptions = Object.keys(this.categories);
  }

  getKanbanTasks(): void{
    this.taskService.getTodos()
      .subscribe(tasks =>
        this.tasks = 
        tasks
          .filter(task => task.category === this.category)); 
          //TODO: update with actual API property
  }

}
