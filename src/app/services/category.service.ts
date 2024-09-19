import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // Retrieve the token from wherever it's stored (e.g., local storage or a service)
  private token = localStorage.getItem('authToken');

  private apiUrl = environment.url+'/api/category';  // Spring Boot API URL

  constructor(private http: HttpClient) { }

  getAllCategory(): Observable<any> {
    // Create HTTP headers with Authorization header
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.apiUrl}`,{headers});
  }



  // Insert a new post
  insertCategory(data: any): Observable<any> {
    // Create HTTP headers with Authorization header
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}`, data, { headers });
  }

  //update post
  updateCategory(data: any,postId:any): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.apiUrl}/`+postId, data, { headers });
  }

  deleteCategory(userId: any): Observable<any> {
    // Create HTTP headers with Authorization header
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete(`${this.apiUrl}/` + userId, { headers });
  }
}
