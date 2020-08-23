import { Component, OnInit } from '@angular/core';

import { categories } from '../categories-enum';
@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {

  private categories = categories;
  categoryOptions = [];

  constructor() { }

  ngOnInit(): void {
    this.categoryOptions = Object.keys(this.categories);
  }

}
