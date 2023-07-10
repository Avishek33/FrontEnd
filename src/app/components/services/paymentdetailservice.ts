import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  private apiUrl = 'https://localhost:7250/api/PaymentDetail/'; // Replace with your backend API URL
  constructor(private http: HttpClient) { }
  getPaymentDetails(matchId: string) : Observable<any>{
    return this.http.get<any>(`${this.apiUrl}get-payment-details-by/${matchId}`);
  }

  setAsPaid(userId: string,matchId: string) : Observable<any>{
    return this.http.put<any>(`${this.apiUrl}set-as-Paid/${userId}/${matchId}`,null);
  }
}
