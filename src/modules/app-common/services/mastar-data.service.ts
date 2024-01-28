import { Injectable } from '@angular/core';
import { User } from 'src/modules/auth/models';
import { LocallyStoredItemsKeys } from 'src/modules/app-common/models/LocallyStoredItemsKeys';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  private apiUrl = environment.apiUrl;
  userData: User = <User>{};
  jwtHelper = new JwtHelperService();

  constructor(public http: HttpClient) { }
  public getDecodedToken() {
      const token = String(localStorage.getItem('app:jwt'));
      return this.jwtHelper.decodeToken(token);
  }
getUserInfo(){
    let  UserID=this.getDecodedToken().LoginUserID;
      return this.http.get(this.apiUrl+"Authenticate/GetUserByUserID?UserID="+UserID);
}
GetAllPOSClasses(): Observable<any>{
    return this.fetchAndStoreItemsLst('POS/GetAllPOSClasses', LocallyStoredItemsKeys.GetAllPOSClasses);
}
GetPOSCategoryButtons(): Observable<any>{
  return this.fetchAndStoreItemsLst('POS/GetPOSCategoryButtons', LocallyStoredItemsKeys.GetPOSCategoryButtons);
}
GetPOSItemButtons(POSItemsOrder:number): Observable<any>{
  return this.fetchAndStoreItemsIDS(POSItemsOrder,'POS/GetPOSItemButtons?POSItemsOrder='+POSItemsOrder, LocallyStoredItemsKeys.GetPOSItemButtons);
}
GetPOSClassByBarCode(BarCode:string): Observable<any>{
  return this.fetchAndStoreItemsIDS(BarCode,'POS/GetPOSClassByBarCode?BarCode='+BarCode, LocallyStoredItemsKeys.GetPOSClassByBarCode);
}
GetPOSClassByClassUnitID(ClassUnitID:string): Observable<any>{
  return this.fetchAndStoreItemsIDS(ClassUnitID,'POS/GetPOSClassByClassUnitID?ClassUnitID='+ClassUnitID, LocallyStoredItemsKeys.GetPOSClassByClassUnitID);
}

GetAllStore(): Observable<any> {
      return this.fetchAndStoreItemsLst('Common/GetAllStoresLst', LocallyStoredItemsKeys.GetAllStore);
}
GetAllClassificationLst(): Observable<any> {
      return this.fetchAndStoreItemsLst('Common/GetAllClassificationLst', LocallyStoredItemsKeys.GetAllClassificationLst);
}
GetAllBranchs(): Observable<any> {
      return this.fetchAndStoreItemsLst('Common/GetAllBranchesLst', LocallyStoredItemsKeys.GetAllBranchs);
}
getSetting(): Observable<any> {
      return this.fetchAndStoreItemsLst('Setting/GetSettingById?ID=1', LocallyStoredItemsKeys.getSetting);
}
GetCompanyInfo(): Observable<any> {
      return this.fetchAndStoreItemsLst('CompanyInfo/GetCompanyInfoById?CompanyID=1', LocallyStoredItemsKeys.GetCompanyInfo);
}
GetAllVATType(): Observable<any> {
      return this.fetchAndStoreItemsLst('VATType/GetAllVATType', LocallyStoredItemsKeys.GetAllVATType);
}
GetTaxInvoiceTypesList(): Observable<any>{
      return this.fetchAndStoreItemsLst('Common/GetAllTaxInvoiceTypesLst', LocallyStoredItemsKeys.GetTaxInvoiceTypesList);
}
GetClassCollectedByClassID(ClassID: any): Observable<any> {
      return this.fetchAndStoreItemsIDS(ClassID,'Classes/GetClassCollectedByClassID?ClassID=' + ClassID, LocallyStoredItemsKeys.GetClassCollectedByClassID);
}

  GetAlternativeClassLstByClassID(ClassID: Number): Observable<any> {
      return this.fetchAndStoreItemsLst('Common/GetAlternativeClassLstByClassID?ClassID=' + ClassID, LocallyStoredItemsKeys.GetAlternativeClassLstByClassID);
  }
  GetAlternativeClassLstByTagsID(TagIDS: any): Observable<any> {
      return this.fetchAndStoreItemsIDS(TagIDS,'Common/GetAlternativeClassLstByTagsID', LocallyStoredItemsKeys.GetAlternativeClassLstByTagsID,'post');
  }
  GetAllDepartmentlst(): Observable<any> {
      return this.fetchAndStoreItemsLst('Department/GetDepartmentLst', LocallyStoredItemsKeys.GetAllDepartmentlst);
  }
  GetAllCommissary(): Observable<any> {
      return this.fetchAndStoreItemsLst('Common/GetAllCommissaryLst', LocallyStoredItemsKeys.GetAllCommissary);
  }
  GetSupplier(): Observable<any> {
      return this.fetchAndStoreItemsLst('Common/GetAllCustomersLst', LocallyStoredItemsKeys.GetSupplier);
  }
  GetCustomersList(): Observable<any>{
      return this.fetchAndStoreItemsLst('Common/GetAllCustomersLst', LocallyStoredItemsKeys.GetCustomersList);
  }
  GetBranchById(BranchID:number){
      return this.fetchAndStoreItemsIDS(BranchID,"Branches/GetBranchById?BranchID="+BranchID, LocallyStoredItemsKeys.GetBranchById);
  }
  private getItem<T>(key: string): T | null {
      let data: any = localStorage.getItem(key);
      if (!data) return null;

      let obj: T | null;

      try {
          obj = <T>JSON.parse(data);
      } catch  (error) {
          obj = null;
      }

      return obj
  }
  private fetchAndStoreItemsLst<T>(endPoint: string, storgeKey:any): Observable<T> {
      const storedItems = this.getItem<T>(storgeKey);
      if (storedItems) {
          return of(storedItems);
      }
       else 
       {
          return this.http.get<T>(this.apiUrl + endPoint).pipe(
              tap(items => { 
                  localStorage.setItem(storgeKey, JSON.stringify(items));
                   }));
      }
  }
  private fetchAndStoreItemsIDS<T>(ID:any, endPoint: string, storgeKey:string,method:string='get'): Observable<T> {
      let storedItems = this.getItem<any>(storgeKey);
      if (storedItems) {
          if (storedItems.find((x:any)=> x.ID==ID)) {
              return of(storedItems.find((x:any)=> x.ID==ID).Data);
          }
      }
      if(method!='post'){
          return this.http.get<T>(this.apiUrl + endPoint).pipe(
              tap((item:any) => {
                  let storedItems = this.getItem<any>(storgeKey) as any[];
                  if (storedItems) {
                      storedItems.push({ID:ID,Data:item})
                  }
                  else{
                      storedItems=[{ID:ID,Data:item}]
                  }
                  localStorage.setItem(storgeKey, JSON.stringify(storedItems));
              })
          ); 
      }else{
          return this.http.post<T>(this.apiUrl + endPoint,ID).pipe(
              tap((item:any) => {
                  let storedItems = this.getItem<any>(storgeKey) as any[];
                  if (storedItems) {
                      storedItems.push({ID:ID,Data:item})
                  }
                  else{
                      storedItems=[{ID:ID,Data:item}]
                  }
                  localStorage.setItem(storgeKey, JSON.stringify(storedItems));
              })
          );
      }
      
  }
}
