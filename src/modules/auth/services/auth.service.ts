import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccessToken } from '../data/AccessToken';
import { AuthenticateResponse } from '../data/login';
import { Login } from '../data/login';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(this.isTokenAvailable());
  private apiUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  constructor(
    public http: HttpClient,
    private router: Router,
    public userService: UserService
  ) {
    this.isLoggedIn = new BehaviorSubject<boolean>(this.isTokenAvailable());
  }
  private isTokenAvailable(): boolean {
    return !!localStorage.getItem('token:jwt');
  }

  Login(Login :Login) {
    return this.http.post(this.apiUrl + "Authenticate/Login",Login).pipe(
        tap((res: any) => 
        {
          if (res.accessToken) {
            let userInfo:AuthenticateResponse=res
            localStorage.setItem('token:jwt', res.accessToken);
            localStorage.setItem('token:refreshToken', res.refreshToken);
            this.setIsLoggedIn(true);
            this.router.navigate([Login.returnUrl]);
          }
        })
      );
      
}

setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn.next(isLoggedIn);
}

public getDecodedToken()  {
    const token = String(localStorage.getItem('token:jwt'));
    return this.jwtHelper.decodeToken(token);
}

isTokenExpired(): boolean {
    const token = String(localStorage.getItem('token:jwt'));

    const expiryTime : number= Number(this.getExpiryTime());
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
}

getExpiryTime() {
    return this.isTokenAvailable()? this.getDecodedToken().exp : null;
}

getIsLoggedIn(): BehaviorSubject<boolean> {
  if (this.isLoggedIn && this.isTokenAvailable()){
   return new BehaviorSubject<boolean>(true) 
  }else{
    
   return new BehaviorSubject<boolean>(false) 
  }

   
}
async logout(): Promise<any> {
  // Clear JWT from localstorage
  await localStorage.removeItem('token:refreshToken');
  await localStorage.removeItem('token:jwt');
  // Update logged in status
  this.setIsLoggedIn(false);
  // Navigate user back to login page
  await this.router.navigate(['auth/login']);
}
refreshToken(tokenModel:any):Observable<any>{
  return this.http.post(this.apiUrl + "Authenticate/RefreshToken", tokenModel);
}
havePermission(Permission :string):boolean{
  return this.getDecodedToken()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes(Permission);
}
}
