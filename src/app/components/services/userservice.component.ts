import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7250/api/User'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
    
  }

  userDropdown(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/get-user-dropdown`);
  }
}
