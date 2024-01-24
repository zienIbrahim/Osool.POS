import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticateResponse } from '../data/login';
import { Login } from '../data/login';
import { UserService } from './user.service';
import   AppUtils from 'src/modules/app-common/models/AppUtils';
import { User } from '../models';

@Injectable()
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(this.isTokenAvailable());
  private apiUrl = environment.apiUrl;
  userData: User=<User>{};
  private UserInfo: BehaviorSubject<AuthenticateResponse> = new BehaviorSubject<AuthenticateResponse>(<AuthenticateResponse>{});

  jwtHelper = new JwtHelperService();
  constructor(
    public http: HttpClient,
    private router: Router,
    public userService: UserService
  ) {
    this.isLoggedIn = new BehaviorSubject<boolean>(this.isTokenAvailable());
  }
  private isTokenAvailable(): boolean {
    return !!localStorage.getItem('app:jwt');
  }

Login(Login :Login) {
    return this.http.post(this.apiUrl + "Authenticate/Login",Login).pipe(
        tap((res: any) => 
        {//clears the localstorage

          AppUtils.RefreshMasterData();
          let authenticateResponse:AuthenticateResponse=res
          if(res.isHaveMultiTenant==true){
            const jwtData= this.getDecodedToken()
            this.userData={
              id: authenticateResponse.id,
              firstName:authenticateResponse.username,
              lastName:jwtData.tenantName,
              email:res.username,
              image:"/assets/img/illustrations/profiles/profile-1.png",
              TenantName:jwtData.user_name
            };
            localStorage.setItem('app:jwt', res.token);
            localStorage.setItem('app:userData',JSON.stringify(this.userData));
            localStorage.setItem('app:UserTenats',JSON.stringify(jwtData.Tenants));
            this.userService.setuser(this.userData);
            this.setIsLoggedIn(true);
            this.router.navigate([`/auth/multi-tenant-select`]);
          }
          if (res.token && res.isHaveMultiTenant!=true) {

            this.UserInfo.next(authenticateResponse)
            localStorage.setItem('app:jwt', res.token); 
            localStorage.setItem('app:refreshToken', res.refreshToken);
            const jwtData= this.getDecodedToken()
            this.userData={
              id: authenticateResponse.id,
              firstName:authenticateResponse.username,
              lastName:jwtData.tenantName,
              email:res.username,
              image:"/assets/img/illustrations/profiles/profile-1.png",
              TenantName:jwtData.user_name
            };
            localStorage.setItem('app:userData',JSON.stringify(this.userData));
            this.userService.setuser( this.userData);
            this.setIsLoggedIn(true);
            this.router.navigate([Login.returnUrl]);
          }
          if(authenticateResponse.subscriptionRemainingDays){
            if(authenticateResponse.subscriptionRemainingDays<=7)
           {

           }
          }
        })
      );
      
}


setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn.next(isLoggedIn);
}

public getDecodedToken()  {
    const token = String(localStorage.getItem('app:jwt'));
    return this.jwtHelper.decodeToken(token);
}

isTokenExpired(): boolean {
    const token = String(localStorage.getItem('app:jwt'));

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
 await localStorage.removeItem('app:jwt');
 await localStorage.removeItem('app:refreshToken');
 await localStorage.removeItem('app:userInfo');
 await localStorage.removeItem('app:UserTenats');
 localStorage.clear()  //clears the localstorage
 // Update logged in status
 this.setIsLoggedIn(false);
 // Navigate user back to login page
 await this.router.navigate(['https://osoolsys.com']);
}

refreshToken(tokenModel:any):Observable<any>{
  return this.http.post(this.apiUrl + "Authenticate/RefreshToken", tokenModel);
}

havePermission(Permission :string):boolean{
  return this.getDecodedToken()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].includes(Permission);
}

}
