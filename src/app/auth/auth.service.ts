import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

import jwt_decode from "jwt-decode";
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string='https://localhost:7250/api/User';
  private _user: UserInfo;
  // creating behaviourl subject
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private _toastrService: ToastrService,
    private _httpClient : HttpClient) {
      const token = localStorage.getItem('jwtToken');
      this._isLoggedIn$.next(!!token);
     }
     public RegisterUser(registerrequest: any) {
      return this._httpClient.post<any>(`${this.baseUrl}/register`, registerrequest);
    }
    


  public Autheticate(authenticateRequest: any){
    return this._httpClient.post(`${this.baseUrl}/authenticate`,authenticateRequest).pipe(
      tap((response: any)=>{
        this._isLoggedIn$.next(true);
        localStorage.setItem('jwtToken', response.token as string);

      })
    );
  }

  public decodeToken(): any {
    let rawToken = localStorage.getItem('jwtToken');
    if (rawToken != null)
      return jwt_decode(rawToken);
    else
      return null;
  }

  public showLoginPageIfTokenExpries(): void {
    if (this.isTokenExpired()){
      this._toastrService.info('You session has expired. Please login again.');
      this._isLoggedIn$.next(false); // push to subscribers of observable
      
    } 
    else
      this._isLoggedIn$.next(true);  // push to subscribers of observable
  }
  public showTokenExpirationMessage() : void{

  }

  public isTokenExpired(): boolean {
    let rawToken = localStorage.getItem('jwtToken');
    if (rawToken == null){
      return true;
    }
    const date = this.getTokenExpirationDate();
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  
  public getTokenExpirationDate(): Date {
    let rawToken = localStorage.getItem('jwtToken');
    const decoded: any = jwt_decode(rawToken as string);

    if (decoded.exp === undefined)
      return null as any;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public logout(): void {
    localStorage.removeItem('jwtToken'); 
    // push to subscribers of observable
    this._toastrService.info('You are now logged out.');

    this._isLoggedIn$.next(false);
  }

  get userInfo(): UserInfo {
    if (this._user)
      return this._user;

    return this.createUserFromToken(localStorage.getItem('jwtToken') as string);
  }

  private createUserFromToken(rawToken: string): UserInfo {
    let token: any = jwt_decode(rawToken);
    let user = new UserInfo();
    user.fullName = token.fullName;
    user.email = token.email;
    user.type = token.usertype;
    user.userId = token.sub;
    user.username = token.username;
    user.phoneNumber = token.phoneNumber;
    user.address = token.address;
    user.id = token.sub;
    return user;
  }

}
export class UserInfo {
  username: string;
  fullName: string;
  email: string;
  type: string;
  userId: string;
  phoneNumber: string;
  address: string;
  id: string;
}