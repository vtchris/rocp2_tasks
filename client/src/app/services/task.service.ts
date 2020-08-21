import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url:string = 'http://3.15.237.3:8080/todos';

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private http: HttpClient) { }

  addTodo(todo: Todo):Observable<any>{
    return this.http.post<Todo>(this.url,todo,this.httpHeader);
  }

  deleteTodo(todo: Todo):Observable<any>{
    return this.http.delete(`${this.url}/${todo.id}`,this.httpHeader);
  }

  findTodo(todo: Todo):Observable<any>{
    return this.http.get(`${this.url}/${todo.id}`);
  }
  
  getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.url);
  }

  updateTodo(todo: Todo): Observable<any> {  
    return this.http.put(`${this.url}`,todo,this.httpHeader)
  }  

}
