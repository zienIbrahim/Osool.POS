// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';import { Observable, of, ReplaySubject } from 'rxjs';
// import { environment } from 'environments/environment';
// import { User } from '@modules/auth/models';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { AccessToken } from '@modules/auth/data/AccessToken';

// @Injectable({
//     providedIn: 'root'
//   })

//   export class SharedService {
    
//     private apiUrl = environment.apiUrl;
//     userData: User=<User>{};
//     jwtHelper = new JwtHelperService();

//     constructor(public http: HttpClient)
//      {}
  
//     getSetting(){
//         return this.http.get(this.apiUrl+"Setting/GetSettingById?ID=1");
//     }
//     getUserInfo(){
//       let  UserID=this.getDecodedToken().UserID;
//       console.log("get Decoded Token ",this.getDecodedToken());
//         return this.http.get(this.apiUrl+"Authenticate/GetUserByUserID?UserID="+UserID);
//     }
//     GetChartOfAcc4Lst() {
//       return this.http.get(this.apiUrl + 'ChartOfAcc/GetChartOfAcc4Lst');
//   }
//   GetAllUserStore(){
//     return this.http.get(this.apiUrl +"Common/GetAllUserStoreLst");
//    }
//    GetAllStore(){
//     return this.http.get(this.apiUrl +"Common/GetAllStoresLst");
//    }
//    public getDecodedToken() {
//         const token = String(localStorage.getItem('app:jwt'));
//         return this.jwtHelper.decodeToken(token);
//     }
//     changeTheme(primary: string) {
   
//       document.documentElement.style.setProperty('--primary-color', primary);
//     }

// }


