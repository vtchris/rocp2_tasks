import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

import { Todo } from '../../models/Todo';
import { TaskService } from '../../services/task.service';

// import { categories } from '../categories-enum';

@Component({
  selector: 'app-kanban-detail',
  templateUrl: './kanban-detail.component.html',
  styleUrls: ['./kanban-detail.component.css']
})
export class KanbanDetailComponent implements OnInit {

  task: Todo;
  //private categories = categories;
  categoryOptions = ["ToDo", "InProgress", "Done"];

  constructor(
      private route: ActivatedRoute,
      private ts: TaskService,
      private location: Location
  ) { }

  ngOnInit(): void {
    //this.categoryOptions = Object.keys(this.categories);
    this.getTodo()
  }

  getTodo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ts.findTodo(id).subscribe(task => this.task = task);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
          this.ts.updateTodo(this.task).subscribe();
    
  }

}
