import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

import { KanbanBoardComponent } from './kanban/kanban-board/kanban-board.component';
import { KanbanDetailComponent } from './kanban/kanban-detail/kanban-detail.component';
import { KanbanNewTaskComponent } from './kanban/kanban-new-task/kanban-new-task.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'todos', component: TaskListComponent},
  { path: 'todos/:id', component: TaskDetailComponent},
  { path: 'todos/add', component: TaskDetailComponent},
  { path: 'kanban', component: KanbanBoardComponent},
  { path: 'kanban/:id', component: KanbanDetailComponent},
  { path: 'kanban/add', component: KanbanNewTaskComponent},
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
