import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/Todo';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url: string = 'http://3.15.237.3:8080/todos';

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private http: HttpClient) { }

  addTodo(todo: Todo): Observable<any> {
    return this.http.post<Todo>(this.url, todo, this.httpHeader);
  }

  deleteTodo(todo: Todo): Observable<any> {
    return this.http.delete(`${this.url}/${todo.id}`, this.httpHeader);
  }

  findTodo(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url);
  }


  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(`${this.url}`, todo, this.httpHeader)
  }

  searchTodos(term: string): Observable<Todo[]> {

    if (!term.trim()) {
      // if not search term, return empty todo array
      return of([]);
    }

    return this.http.get<Todo[]>(`${this.url}`).pipe(
      map(x => x.filter(t => t.title.match(new RegExp(term, 'gi')))),
      catchError(this.handleError<Todo[]>('searchTodos', []))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  } // end handleError method

  //Kanban-related Services
  isKanbanTask(task: Todo): boolean {
    if (task.category === 'ToDo' ||
      task.category === 'InProgress' ||
      task.category === 'Done') {
      return true;
    } else {
      return false;
    }
  }

//Use to change the Category when Completed is changed
  syncKanbanCompleted(task: Todo): void { 
    if (task.completed) {
      task.category = "Done";
      this.updateTodo(task).subscribe();
    } else {
      task.category = "InProgress";
      this.updateTodo(task).subscribe();
    }
  }

  //Use to change the Completed flag when Category is changed
  syncKanbanDone(task: Todo): void { 
    if (task.category === 'Done') {
      task.completed = true;
      this.updateTodo(task).subscribe();
    } else {
      task.completed = false;
      this.updateTodo(task).subscribe();
    }
  }

}
