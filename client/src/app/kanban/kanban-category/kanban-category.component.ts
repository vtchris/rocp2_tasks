import { Component, OnInit, Input } from '@angular/core';

import { categories } from '../categories-enum';
import { Todo } from '../../models/Todo';
import { TaskService } from '../../services/task.service';

//import { KBTASKS } from '../kanban-tasks-demo';
@Component({
  selector: 'app-kanban-category',
  templateUrl: './kanban-category.component.html',
  styleUrls: ['./kanban-category.component.css']
})
export class KanbanCategoryComponent implements OnInit {

  @Input() category : string;
  //private categories = categories;
  categoryOptions = ["ToDo", "InProgress", "Done"];
  tasks: Todo[] = [];
  //tasks: Todo[] = KBTASKS;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getKanbanTasks();
    //this.category = this.getCategory(this.category);

    //this.categoryOptions = Object.keys(this.categories);
    //this.categoryOptions.forEach(v => console.log("Category Init: " + v));
    //console.log("Category Init Done");
  }

  getKanbanTasks(): void{
    this.taskService.getTodos()
      .subscribe(tasks => 
        this.tasks = tasks
          .filter(task => task.category == this.category)); 
          
  }

  updateCategory(task: Todo): void{
    this.taskService.syncKanbanDone(task);
    this.taskService.updateTodo(task).subscribe(() => location.reload());
  }

  delete(task: Todo): void {
    this.taskService.deleteTodo(task).subscribe(() => location.reload());
  }

  getCategory(value : string): categories {
    let cat: categories;
    for (let key in categories) {
      if (value === categories[key]) {
        console.log(`"${value}" (type: ${typeof(value)}) is "${key}" (type: ${typeof(key)})`);
        cat = categories[key];
        break;
      } else {
        console.log(`"${value}" (type: ${typeof(value)}) is not "${key}" (type: ${typeof(key)})`);
      }
    }
    console.log(`getCategory is returning ${cat}`)
    return cat;
  }

}
