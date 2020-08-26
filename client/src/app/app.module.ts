import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarLinkComponent } from './navbar/navbar-link/navbar-link.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskSearchComponent } from './task-search/task-search.component';
// import { TaskComponent } from './dev/task/task.component';

import { KanbanModule } from './kanban/kanban.module';
import { NewTaskComponent } from './new-task/new-task.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    NavbarComponent,
    NavbarLinkComponent,
    DashboardComponent,
    TaskDetailComponent,
    TaskSearchComponent,
    NewTaskComponent, 
    HeaderComponent, FooterComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    KanbanModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
