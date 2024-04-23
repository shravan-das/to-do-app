import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiURL = "http://localhost:3000/tasks";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(post:Post): Observable<any> {

    return this.httpClient.post(this.apiURL , JSON.stringify(post), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id:number): Observable<any> {

    return this.httpClient.get(this.apiURL + '/'+ id)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:number, post:Post): Observable<any> {

    return this.httpClient.put(this.apiURL + '/' + id, JSON.stringify(post), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/'+ id, this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  UpdateLike(id: number, post: Post): Observable<any> {
    return this.httpClient.get<Post>(`${this.apiURL}/${id}`).pipe(
      switchMap((existingPost: Post) => {
        const updatedPost: Post = {
          ...existingPost,
          IsLiked: !existingPost.IsLiked
        };
       return this.httpClient.put(`${this.apiURL}/${id}`, updatedPost, this.httpOptions);
      }),
      catchError(this.errorHandler)
    );
  }
  

 
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}