import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  // Retrieve the token from wherever it's stored (e.g., local storage or a service)
  private token = localStorage.getItem('authToken');

  private apiUrl = environment.url+'/api/posts';  // Spring Boot API URL

  constructor(private http: HttpClient) { }

   // Fetch all posts
   getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getPostsByUserId(userId: any): Observable<any> {
    // Create HTTP headers with Authorization header
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.apiUrl}/getPostsByUserId/` + userId, { headers });
  }


  // Insert a new post
  insertPost(data: any): Observable<any> {
    // Create HTTP headers with Authorization header
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/createPost`, data, { headers });
  }

  //update post
  updatePost(data: any,postId:any): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.apiUrl}/`+postId, data, { headers });
  }

  deletePost(userId: any): Observable<any> {
    // Create HTTP headers with Authorization header
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete(`${this.apiUrl}/` + userId, { headers });
  }

}
