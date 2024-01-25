import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterDataService } from 'src/modules/app-common/services/mastar-data.service';
import { Address, POSCategoryButtons, POSClasses, POSItemButtons, UserData } from '../../models';
import { Setting ,CompanyInfo} from 'src/modules/app-common/models/masterData';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.scss']
})
export class PointOfSaleComponent {
  @ViewChild("contentvoucher") contentvoucher:any;
  @ViewChild("searchInput") searchElement: ElementRef =<ElementRef>{};
  myDate : any;
  setting : Setting=<Setting>{};
  CompanyInfo: CompanyInfo = <CompanyInfo>{};
  activeCategory:number=1;
  SelectedRow:number=1;
  POSCategoryButtons : POSCategoryButtons[]=[];
  POSClasses : POSClasses[]=[];
  POSItemButtons : POSItemButtons[]=[];
  invoiceItem: FormArray=<FormArray>{};
  POSInvoiceForm: FormGroup = new FormGroup({});
  UserInfo: UserData = <UserData>{};

  customerAddress: Address = <Address>{};

  constructor(private modalService: NgbModal,
     private fb: FormBuilder,
     private formBuilder: FormBuilder,
     private _masterDataService: MasterDataService) {
   }
  ngOnInit(): void {
    this.getMasterdata();
    //this.showSearch();
    this.initForm();
    this.addInvoiceItem();

    // this.getSumQut();
  }
  initForm() {
    this.POSInvoiceForm = this.formBuilder.group({
      SaleIvceID: [''],
      BuyTypeID: ['', Validators.required],
      CommID: [1, Validators.required],
      CustID: [10, Validators.required],
      Notes: [''],
      PaidAmount: [''],
      RemainingAmount: [''],
      DiscountP: [''],
      BranchId: [1, Validators.required],
      UserID: [''],
      CostID: [''],
      BankAndSave: [''],
      PayingFrom: [''],
      CustName: ['',Validators.required],
      CustMobile: [''],
      CustTaxNumber: [''],
      CustAddress: [''],
      CustomerCR: ['', Validators.required],
      MainInvoiceID: [''],
      MainInvoiceDate: [''],
      TakeInOut : [''],
      TableNo : [''],
      payCash : [''],
      payBank : [''],
      payCredit : [''],
      ChangeCash : [''],
      TaxInvoiceTypeID: ['', Validators.required],
      invoiceItem: this.formBuilder.array([]),
    })
  }
  addInvoiceItem() {
    this.invoiceItem = this.invoiceItemList;
    this.invoiceItem.push(
        this.formBuilder.group({
            ClassID: ['', Validators.required],
            ClassUnitID: ['', Validators.required],
            Qty: [{value:0,disabled:true},Validators.compose([Validators.required, Validators.min(0.001)])],
            PayPrice: [''],
            ClassName: [''],
            OrgPrice: [''],
            Price: ['', Validators.required],
            CostPrice: [''],
            StorID: [],
            BonusQty: [0],
            DisP: [0],
            DisAmount: [0],
            ShowPrice: [{value: null, disabled:!this.UserInfo.ivcePriceEdit}, Validators.required],
            VATID: [''],
            VATRate: [''],
            VATAmount: [''],
            PatchNoSN: [''],
            VATCalcTypeID: [''],
            ExpDateH: [''],
            ItemNote: [''],
            ItemAdditions: [''],
        })
    );
  }
  showSearch(){
    setTimeout(()=>{ 
      this.searchElement.nativeElement.focus();
    },0);  
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
  getItemByCategoryId(Id:number): POSItemButtons[]{
  return  this.POSItemButtons.filter(item => item.classificationID==Id)
  }
  openCalculator(content:any){
    this.modalService.open(content , { windowClass: 'calculator' } );
  }
  openNumberEntring(content:any,index:number, input:string){
    this.modalService.open(content , { windowClass: 'calculator' } );
  }
  Resulte(content:any){
  console.log("Resulte :",content)
  }
  openUsre(content:any){
    this.modalService.open(content , { windowClass: 'Usre' } );
  }
  AddItem(ButtonData:POSItemButtons){
    const count = this.invoiceItemList.value.length;
    let keepGoing: boolean = true;

    this.invoiceItemList.controls.forEach((element: any, index: number) => {
     const RawValue =  element.getRawValue()
      if (keepGoing) {
      if (count == 1 && Number(RawValue.ClassUnitID) == 0) {
        this.setItemRowValue(ButtonData.classID,ButtonData.classUnitID,0);
       // this.f['invoiceItem'].updateValueAndValidity();
        keepGoing = false;
        return;
      }
      if (Number(RawValue.ClassUnitID) == Number(ButtonData.classUnitID)) {
        this.invoiceItemList.controls[index].get('Qty')?.setValue(RawValue.Qty + 1);
            // this.f['invoiceItem'].updateValueAndValidity();
           keepGoing = false;
         return;
      }
      if (index == count - 1) {
        this.addInvoiceItem();
        this.setItemRowValue(ButtonData.classID, ButtonData.classUnitID, count);
        this.f['invoiceItem'].updateValueAndValidity();
        keepGoing = false;
        return;
       // this.setItemRowValue()
      }
    }
    })
  }
  setItemRowValue(ClassID: number, classUnitID: number, index: number) {
    this.invoiceItemList.controls[index].reset();
    let BranchId = this.f['BranchId'].value;
   // let ClassInfo = this.f['BranchId'].value;
     let ClassInfo = this.POSClasses.find(x=> x.classUnitID==classUnitID && x.classID==ClassID) as  POSClasses;
     this.invoiceItemList.controls[index].patchValue({
      ClassName:ClassInfo.classNameA,
      ShowPrice: ClassInfo.classUnitPrice,
      Qty: 1,
      VATRate: ClassInfo.vatRate,
      VATID: ClassInfo.vatid,
      ClassID: ClassID,
      StorID: this.UserInfo.defaultStorID,
      BonusQuan: 0,
      DisAmount: 0,
      DisP: 0,
      Price:ClassInfo.classUnitPrice,
      VATCalcTypeID: ClassInfo.vatCalcType,
      ClassUnitID: classUnitID,
  });
  }
  onRowSelected(Index:number){
    this.SelectedRow=Index;
   const rowvalue= this.invoiceItemList.controls[Index].value
   console.log("row Value :",rowvalue.Qty)
  }
  get addCustomerValid() {
    return this.CustomerForm.controls;
  }
  get invoiceItemList(): FormArray {
    return this.POSInvoiceForm.controls['invoiceItem'] as FormArray;
  }
  get f() {
    return this.POSInvoiceForm.controls;
  }
}
