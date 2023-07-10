import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class matchdetail {
  private apiUrl = 'https://localhost:7250/api/MatchDetail/'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  createMatchDetail(matchdetail: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}create-match-detail`, matchdetail);
    
  }

  getMatchDetails() : Observable<any>{
    return this.http.get<any>(`${this.apiUrl}match-detail`);
  }
}
