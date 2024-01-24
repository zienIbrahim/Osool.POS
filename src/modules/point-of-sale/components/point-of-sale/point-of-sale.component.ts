import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterDataService } from 'src/modules/app-common/services/mastar-data.service';
import { POSCategoryButtons, POSClasses, POSItemButtons } from '../../models';
import { Setting ,CompanyInfo} from 'src/modules/app-common/models/masterData';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.scss']
})
export class PointOfSaleComponent {
  @ViewChild("contentvoucher") contentvoucher:any;
  myDate : any;
  setting : Setting=<Setting>{};
  CompanyInfo: CompanyInfo = <CompanyInfo>{};
  activeCategory:number=1;
  POSCategoryButtons : POSCategoryButtons[]=[];
  POSClasses : POSClasses[]=[];
  POSItemButtons : POSItemButtons[]=[];
  constructor(private modalService: NgbModal,
     private fb: FormBuilder,
     private _masterDataService: MasterDataService) {
   }
  ngOnInit(): void {
    this.getMasterdata();
    // this.getSumQut();
  }

  CustomerForm = new FormGroup({
    id: new FormControl(null ,[Validators.required]),
    customerName: new FormControl(null),
    phone: new FormControl(null),
    other: new FormControl(null),
  });
  
  getMasterdata(){
    this._masterDataService.GetPOSCategoryButtons().subscribe(
      {
        next:(value)=>{
          this.POSCategoryButtons=value.data;
          console.log("category ",this.POSCategoryButtons)
        }
  });
  this._masterDataService.GetPOSItemButtons(1).subscribe(
      {
        next:(value)=>{
          this.POSItemButtons=value.data;
        }
  });
  this._masterDataService.GetAllPOSClasses().subscribe(
      {
        next:(value)=>{
          this.POSClasses=value.data;
        }
  });
  this._masterDataService.getSetting().subscribe(
      {
        next:(value)=>{
          this.setting=value;
        }
});
  this._masterDataService.GetCompanyInfo().subscribe(
    {
      next:(value)=>{
        this.CompanyInfo=value;
}
}
);
  }
  myDataTime(){
    let date: Date = new Date();
    date.setDate(date.getDate());
    let datePipe: DatePipe = new DatePipe('en-US');
    this.myDate =  datePipe.transform(date , 'yyyy-MM-dd')
  }
  getItemByCategoryId(Id:number):POSClasses[]{
  return  this.POSClasses.filter(item => item.classificationID==Id && item.showInPOS==true)
  }
  openCalculator(content:any){
    this.modalService.open(content , { windowClass: 'calculator' } );
  }
  openUsre(content:any){
    this.modalService.open(content , { windowClass: 'Usre' } );
  }
  get addCustomerValid() {
    return this.CustomerForm.controls;
  }


}
