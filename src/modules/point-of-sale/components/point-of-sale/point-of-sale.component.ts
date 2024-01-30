import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterDataService } from 'src/modules/app-common/services/mastar-data.service';
import { Address, Branch, POSCategoryButtons, POSClasses, POSClassesResponse, POSItemButtons, UserData } from '../../models';
import { Setting ,CompanyInfo} from 'src/modules/app-common/models/masterData';
import { lastValueFrom } from 'rxjs';
import { GetClassQuantitiesByClassID } from 'src/modules/app-common/models/Payment.form';
import { LocallyStoredItemsKeys } from 'src/modules/app-common/models/LocallyStoredItemsKeys';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.scss']
})
export class PointOfSaleComponent {
  @ViewChild("contentvoucher") contentvoucher:any;
  @ViewChild("searchInput") searchElement: ElementRef =<ElementRef>{};
  @ViewChild('ErrorPopup') ErrorPopup: any;
  myDate : any;
  setting : Setting=<Setting>{};
  CompanyInfo: CompanyInfo = <CompanyInfo>{};
  activeCategory:number=1;
  SelectedRow:number=0;
  Inputtype:string='';
  ErrorMsg:string='';
  entrNumberTitle:string='';
  POSCategoryButtons : POSCategoryButtons[]=[];
  POSClasses : POSClasses[]=[];
  POSItemButtons : POSItemButtons[]=[];
  invoiceItem: FormArray=<FormArray>{};
  POSInvoiceForm: FormGroup = new FormGroup({});
  UserInfo: UserData = <UserData>{};
  BranchData: Branch = <Branch>{};

  barCodeData: string = '';

    /* Claclation Declartion */
  TotalVatAmount: number = 0;
  TotalInvoiceAmount: number = 0;
  TotalInvoiceAfterDiscount: number = 0;
  NetTotalInvoiceAmount: number = 0;

  customerAddress: Address = <Address>{};
  Math: any;

  constructor(private modalService: NgbModal,
     private fb: FormBuilder,
     private formBuilder: FormBuilder,
     private _masterDataService: MasterDataService) {
      this.Math = Math;

   }
  ngOnInit(): void {
    this.getMasterdata();
    this.initForm();
    this.addInvoiceItem();
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
      InvoiceDiscountAmount: [0],
      InvoiceDiscountPercentage: [0],
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
  
  async getMasterdata(){
    this.UserInfo = await lastValueFrom(this._masterDataService.getUserInfo()) as UserData;
    this.BranchData = await lastValueFrom(this._masterDataService.GetBranchById(Number(this.UserInfo.defaultBranchID))) as Branch;
    this._masterDataService.GetPOSCategoryButtons().subscribe(
      {
        next:(value)=>{
          this.POSCategoryButtons=value.data;
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
  getItemByCategoryId(Id:number): POSClasses[]{
  return  this.POSClasses.filter(item => item.classificationID==Id && item.showInPOS)
  }
  openCalculator(content:any){
    this.modalService.open(content , { windowClass: 'calculator' ,size:'xl'});
  }
  openErrorPopup(){
    this.modalService.open(this.ErrorPopup , { windowClass: 'calculator' ,size:'sm' ,centered:false,modalDialogClass:'box'});
  }

  openItemNote(content: any) {
    const classUnitID = this.invoiceItemList.controls[this.SelectedRow].get('ClassUnitID')?.value;
    if (classUnitID!='')
    this.modalService.open(content, { windowClass: 'calculator' });
  }
  openNumberEntring(content:any, input:string,index:number=this.SelectedRow){
    this.SelectedRow =index;
    this.Inputtype=input;
    switch (this.Inputtype) {
      case 'ShowPrice':
        this.entrNumberTitle='السعر'
        break;
      case 'Qty':
        this.entrNumberTitle='الكمية'
        break;
      case 'InvoiceDiscountAmount':
        this.entrNumberTitle='مبلغ الخصم'
        break;
      case 'InvoiceDiscountPercentage':
        this.entrNumberTitle='نسبة الخصم %'
        break;
      default:
        this.entrNumberTitle='الادخال'
        break;
    }
    if(this.Inputtype=='ShowPrice' || this.Inputtype=='Qty'){
      const classUnitID = this.invoiceItemList.controls[this.SelectedRow].get('ClassUnitID')?.value;
      if(classUnitID=='')
      return
    }
    this.modalService.open(content , { windowClass: 'calculator' } );
  }
  async Resulte(content:any){
    if(this.Inputtype=='ShowPrice'){
      this.changePrice(content)
    }
    if(this.Inputtype=='Qty'){
     let RawValue= this.invoiceItemList.controls[this.SelectedRow].getRawValue();
     let model:GetClassQuantitiesByClassID={
      classID:RawValue.ClassID,
      storID:Number(this.UserInfo.defaultStorID),
      }
      let qty= Number((await lastValueFrom(this._masterDataService.GetClassQuantitiesByClassID(model)) as any).currentQty);
      if(qty < (RawValue.Qty + content) && !this.BranchData.negativePay){
       this.ErrorMsg="الكمية غير متوفرة"
       this.openErrorPopup();
       return ;
      }
    }
    if(this.Inputtype=='InvoiceDiscountAmount'){
      this.calcDiscountAmount(content)
      this.calcluateFormValue();
      return;
    }
    if(this.Inputtype=='InvoiceDiscountPercentage'){
      this.calcDiscountPercentage(content)
      this.calcluateFormValue();
      return;
    }
    this.invoiceItemList.controls[this.SelectedRow].get(this.Inputtype)?.setValue(content);
    this.calcluateFormValue();
    }
  openUsre(content:any){
    this.modalService.open(content , { windowClass: 'Usre' } );
  }
  barcodeSearchEvent(){
    if(this.barCodeData !=''){
    const ButtonData= this.POSClasses.find(item => item.barCode==this.barCodeData)
    if(ButtonData){
      this.barCodeData=''
      this.AddItem(ButtonData)
    }
    else{
       this._masterDataService.GetPOSClassByBarCode(this.barCodeData).subscribe((item:any)=>{
       if(item.showInPOS){
        this.POSClasses=[...this.POSClasses,item];
        let value: POSClassesResponse = JSON.parse(localStorage.getItem(LocallyStoredItemsKeys.GetAllPOSClasses) || '{}') as POSClassesResponse;
        value.data=[...value.data,item];
        localStorage.setItem(LocallyStoredItemsKeys.GetAllPOSClasses ,JSON.stringify(value));
        this.barCodeData='';
        this.AddItem(item);
       }
       });
    }
    }
  }
  async AddItem(ButtonData:POSClasses){
    const count = this.invoiceItemList.value.length;
    let keepGoing: boolean = true;
    let model:GetClassQuantitiesByClassID={
    classID:ButtonData.classID,
    storID:Number(this.UserInfo.defaultStorID),
    };
    let qty= Number((await lastValueFrom(this._masterDataService.GetClassQuantitiesByClassID(model)) as any).currentQty);
    this.invoiceItemList.controls.forEach(async (element: any, index: number) => {
     const RawValue =  element.getRawValue()
      if (keepGoing) {
      if (count == 1 && Number(RawValue.ClassUnitID) == 0) {
       if(qty<1 && !this.BranchData.negativePay){
        this.ErrorMsg="الكمية غير متوفرة"
        this.openErrorPopup();
        keepGoing = false;
        return ;
       }
        this.setItemRowValue(ButtonData.classID,ButtonData.classUnitID,0);
       // this.f['invoiceItem'].updateValueAndValidity();
        keepGoing = false;
        this.calcluateFormValue()
        return;
      }
      if (Number(RawValue.ClassUnitID) == Number(ButtonData.classUnitID)) {
      
        if(qty < (RawValue.Qty+1)&& !this.BranchData.negativePay){
         this.ErrorMsg="الكمية غير متوفرة"
         this.openErrorPopup();
         keepGoing = false;
         return ;
        }
        this.invoiceItemList.controls[index].get('Qty')?.setValue(RawValue.Qty + 1);
            // this.f['invoiceItem'].updateValueAndValidity();
           keepGoing = false;
           this.calcluateFormValue()
         return;
      }
      if (index == count - 1) {

        if(qty < 1 && !this.BranchData.negativePay){
         this.ErrorMsg="الكمية غير متوفرة"
         this.openErrorPopup();
         keepGoing = false;
         return ;
        }
        this.addInvoiceItem();
        this.setItemRowValue(ButtonData.classID, ButtonData.classUnitID, count);
        this.f['invoiceItem'].updateValueAndValidity();
        keepGoing = false;
        this.calcluateFormValue()
        return;
       // this.setItemRowValue()
      }
    }
    });
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
  }
  RemoveInvoiceItem(index: number = this.SelectedRow){
    const add = this.POSInvoiceForm.get('invoiceItem') as FormArray;
    if (add.length > 1) add.removeAt(index);
  }
  changePrice(newPrice:number,index:number = this.SelectedRow){
    const classID=this.invoiceItemList.controls[index].get('ClassID')?.value;
    const classUnitID = this.invoiceItemList.controls[index].get('ClassUnitID')?.value;
    const price = this.invoiceItemList.controls[index].get('ShowPrice')?.value;
    const ClassUnitInfo = this.POSClasses.find(x=> x.classUnitID==classUnitID && x.classID==classID) as  POSClasses;
        if( !this.UserInfo.ivcePriceEdit){
            this.invoiceItemList.controls[index].get('ShowPrice')?.setValue(ClassUnitInfo.classUnitPrice);
            this.calcluateFormValue();
            return;
        }
        if(!classID || !classUnitID){
            this.invoiceItemList.controls[index].get('ShowPrice')?.setValue(ClassUnitInfo.classUnitPrice)
            this.calcluateFormValue();
            return;
        }
        if(ClassUnitInfo.aCostX && !this.UserInfo.saleLessCost&& ClassUnitInfo.aCostX<price){
            this.invoiceItemList.controls[index].get('ShowPrice')?.setValue(ClassUnitInfo.classUnitPrice);
            // this.calcluateFormValue();
            return;
        }
        if(ClassUnitInfo.classUnitPrice && !this.UserInfo.saleLessThanLastPrice && ClassUnitInfo.classUnitPrice<price){
            this.invoiceItemList.controls[index].get('ShowPrice')?.setValue(ClassUnitInfo.classUnitPrice);
            this.calcluateFormValue();
            return;
        }
        this.invoiceItemList.controls[this.SelectedRow].get('ShowPrice')?.setValue(newPrice);
        this.calcluateFormValue();
  }
  AddNoteToItem(note:string,index: number = this.SelectedRow){
    this.invoiceItemList.controls[index].get('ItemNote')?.setValue(note);
    this.modalService.dismissAll()
  }
  closeModal(){
    this.modalService.dismissAll();
  }
  calcDiscountPercentage(Percentage: number){
   // Percentage=Number(Percentage.target.value) 
    if (Percentage > 100) {
      this.POSInvoiceForm.patchValue({
        InvoiceDiscountAmount: 0,
        InvoiceDiscountPercentage: 0,
    });
    return;
    }
    this.POSInvoiceForm.patchValue({
      InvoiceDiscountAmount: ((this.TotalInvoiceAmount * Percentage) / 100).toFixed(2),
      InvoiceDiscountPercentage: Percentage,

  });

  this.TotalInvoiceAfterDiscount = this.TotalInvoiceAmount - this.POSInvoiceForm.get('InvoiceDiscountAmount')?.value;
  }
  calcDiscountAmount(amount: number){
    if (Number(this.TotalInvoiceAmount.toFixed(2)) < amount) {
      this.POSInvoiceForm.patchValue({
        InvoiceDiscountAmount: 0,
        InvoiceDiscountPercentage: 0,
      });
      return;
    }
    this.POSInvoiceForm.patchValue({
      InvoiceDiscountPercentage: (100 * (Number(amount) / Number(this.TotalInvoiceAmount.toFixed(2)))).toFixed(7),
      InvoiceDiscountAmount: amount,

  });
  this.TotalInvoiceAfterDiscount =
  this.TotalInvoiceAmount - this.POSInvoiceForm.get('InvoiceDiscountAmount')?.value;
  }
  calcluateFormValue(){
    this.TotalVatAmount = 0;
    this.TotalInvoiceAmount = 0;
    this.NetTotalInvoiceAmount = 0;
    this.TotalInvoiceAfterDiscount = 0;
    let TotalInvoiceAmount: number = 0;
    let TotalVatAmount:number =0;
    let InvoiceDiscountAmount = this.POSInvoiceForm.get('InvoiceDiscountAmount')?.value;
    this.invoiceItemList.controls.forEach((element: any, index: number) => {
      const row =  element.getRawValue()
      let VATAmount: number = 0;
      let Price: number = 0;
      let totalPrice: number = 0;
      if (row.Qty > 0) {
        if(row.VATCalcTypeID == 1) 
          Price = Number(row.ShowPrice)
        if (row.VATCalcTypeID == 2)
        Price = Number(row.ShowPrice ) / (1+ (row.VATRate /100));
        VATAmount = Number((((Price  * row.VATRate) / 100)));
        TotalVatAmount +=  Math.round(((VATAmount*row.Qty ) + Number.EPSILON) * 100) / 100;
        totalPrice = Math.round((Price * row.Qty + Number.EPSILON) * 100) / 100;
        TotalInvoiceAmount +=totalPrice;
      }
      this.invoiceItemList.controls[index].patchValue({
        VATAmount: VATAmount,
        Price: Price.toFixed(5),
        OrgPrice: Number((VATAmount*row.Qty )+totalPrice).toFixed(2),
    });
    });
    this.TotalInvoiceAmount = Number(TotalInvoiceAmount.toFixed(2));
    this.TotalInvoiceAfterDiscount = Number((this.TotalInvoiceAmount - InvoiceDiscountAmount).toFixed(2));
    this.TotalVatAmount = Number(((
      TotalVatAmount -  (TotalVatAmount *  this.POSInvoiceForm.get('InvoiceDiscountPercentage')?.value)/100
    )).toFixed(2));
    this.NetTotalInvoiceAmount = this.TotalInvoiceAfterDiscount + this.TotalVatAmount;
    this.calcDiscountPercentage(this.POSInvoiceForm.get('InvoiceDiscountPercentage')?.value);
  }
  handlePaymentFrom(event:any){
     console.log("handle Payment From event :",event);

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
