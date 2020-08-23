import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { KanbanBoardComponent } from './kanban/kanban-board/kanban-board.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'todos', component: TaskListComponent},
  { path: 'todos/:id', component: TaskDetailComponent},
  { path: 'kanban', component: KanbanBoardComponent},
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
