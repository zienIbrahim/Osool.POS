import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MastarDataService {
  private apiUrl = environment.apiUrl;
    
  constructor(public http: HttpClient) {

  }
GetAllTenantGroupType(){
    return this.http.get(this.apiUrl + `Common/GetAllTenantGroupType`)
}
GetAllSoftware(){
  return this.http.get(this.apiUrl + `Common/GetAllSoftware`)
}
GetAllOption(){
  return this.http.get(this.apiUrl + "Common/GetAllOption")
}
GetAllTenant(){
  return this.http.get(this.apiUrl + "Common/GetAllTenant")
}
GetAllUsers(){
  return this.http.get(this.apiUrl + "Common/GetAllUsers")
}
GetAllPlanList(){
  return this.http.get(this.apiUrl + "Common/GetAllPlanList")
}
GetAllActiveOffer(){
  return this.http.get(this.apiUrl + "Common/GetAllActiveOffer")
}
}
