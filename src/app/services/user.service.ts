import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.url+'/api/users';  // Spring Boot API URL

  constructor(private http: HttpClient) { }

   // sign in 
  signIn(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`,data);
  }

  signUp(data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}`,data);
  }
}
