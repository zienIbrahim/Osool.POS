import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/modules/point-of-sale/models';
import { CustomersList, PaymentFrom } from '../../models/Payment.form';
import { MasterDataService } from '../../services/mastar-data.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  model :{id:number, name:string}[]=[];
  currentNumber = '';
  @Input() Amount: number=0;
  @Input() ShowPayCreditInPOS: boolean=false;
  @Output() Done = new EventEmitter<PaymentFrom>();

  /* Flag */
   submitted: boolean = false;
   PaymentFrom: PaymentFrom = <PaymentFrom>{};
   @ViewChild('calcNumber', {static: false}) calcNumber!: ElementRef;
   CustomersList: CustomersList[] = [];

  constructor(private modelService :NgbModal,
    private _masterDataService: MasterDataService){
  // setInterval(()=>{   
  //   this.calcNumber.nativeElement.focus()
  // },0)
  }
  async ngOnInit(): Promise<void> {
    this.PaymentFrom.BuyTypeID=1;
    this.PaymentFrom.payBank=0;
    this.PaymentFrom.payCash=0;
    this.PaymentFrom.payCredit=0;
    this.PaymentFrom.ChangeCash=0;
    this.PaymentFrom.PaidAmount=0;
    this.PaymentFrom.CustID=10;
    this.PaymentFrom.CustName='';
    this.PaymentFrom.CustMobile='';
    this.PaymentFrom.CustTaxNumber='';
    this.PaymentFrom.CustomerCR='';
    this.PaymentFrom.Notes='';
    this.PaymentFrom.CustAddress='';
    this.PaymentFrom.PaymentSuccess=false;
    this.PaymentFrom.customerAddress = {
      countryCode: '',
      cityName: '',
      provinceState: '',
      citySubdivisionName: '',
      street: '',
      additionalStreet: '',
      buildingNumber: '',
      postalCode: '',
      additionalNumber: '',
    }
    this.CustomersList =(await lastValueFrom(this._masterDataService.GetCustomersList()) as any).data;
    this.calcNumber.nativeElement.focus()

  }
  GetCustByID(Customer: any) {
    this._masterDataService.GetCustomerOrSupporterByID(Customer.target.value).subscribe(
        (res: any) => {
          console.log("res :",res)

          this.PaymentFrom.customerAddress = {
            countryCode: res.countryCode,
            cityName: res.cityName,
            provinceState: res.provinceState,
            citySubdivisionName: res.citySubdivisionName,
            street: res.street,
            additionalStreet: res.additionalStreet,
            buildingNumber: res.buildingNumber,
            postalCode: res.postalCode,
            additionalNumber: res.additionalNumber,
          };
          this.PaymentFrom.CustMobile=res.custMobile;
          this.PaymentFrom.CustName=res.custName;
          this.PaymentFrom.CustTaxNumber=res.taxNumber;
          this.PaymentFrom.CustomerCR=res.cr;
        },
        () => {}
    );
}

  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
    this.setNumber()
  }

  public getNumber(v: string){
    this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;
    this.setNumber()
  }

  RemoveLast(){
    this.currentNumber = this.currentNumber.substring(0, this.currentNumber.length-1);
    this.setNumber()
  }

  public clear(){
    this.currentNumber = '';
    this.calcNumber.nativeElement.select()
    this.setNumber()
  }

  close(){
    this.modelService.dismissAll();
  }

  onInputChange(event: any): void {
    // Use a regular expression to allow only numeric characters
    this.currentNumber = event.target.value.replace(/[^0-9]/g, '');
    this.setNumber()
   
  }
setNumber(){
  switch (this.PaymentFrom.BuyTypeID) {
    case 1:
      this.PaymentFrom.payCash=Number(this.currentNumber)
      break;
    case 2:
      this.PaymentFrom.payBank=Number(this.currentNumber)
      break;
    case 3:
      this.PaymentFrom.payCredit=Number(this.currentNumber)
      break;
    default:
      break;
  }
  this.calculate()
}
calculate(){
  this.PaymentFrom.ChangeCash=0;
 let value=( this.PaymentFrom.payBank + this.PaymentFrom.payCash)
    if(this.ShowPayCreditInPOS){
      value+=this.PaymentFrom.payCredit
    }
    console.log("value :")
  this.PaymentFrom.ChangeCash= value - this.Amount;
}
  submit() {
  let totalPrice=( this.PaymentFrom.payBank + this.PaymentFrom.payCash)
       if(this.ShowPayCreditInPOS){
        totalPrice += this.PaymentFrom.payCredit
  }
  if(this.PaymentFrom.payBank > this.Amount){
    return;
  }
  if(this.PaymentFrom.ChangeCash > this.PaymentFrom.payCash){
    return;
  }
  if(totalPrice < this.Amount){
    return ;
  }
  this.Done.emit(this.PaymentFrom);
  }

  F2(){
    this.PaymentFrom.BuyTypeID=1;   
    this.chooseBuyTypeID(1)    // Now you can call you function 
  }

  F3(){
    this.PaymentFrom.BuyTypeID=2; 
    this.chooseBuyTypeID(2)   
  }

  F4(){
    if(this.ShowPayCreditInPOS){
      this.PaymentFrom.BuyTypeID=3;  
      this.chooseBuyTypeID(3)
    }
  }

  openModal(content:any){
    this.modelService.open(content , { windowClass: 'calculator' ,size:'xl'});
  }
  chooseBuyTypeID(event: any) {
    this.currentNumber='';
    this.calcNumber.nativeElement.select()
    this.PaymentFrom.BuyTypeID=Number(event);
    switch ( this.PaymentFrom.BuyTypeID) {
      case 1:
      this.PaymentFrom.payCash=Number(0)
      break;
    case 2:
      this.PaymentFrom.payBank=Number(0)
      break;
    case 3:
      if(this.ShowPayCreditInPOS){
        this.PaymentFrom.payCredit=Number(0)
      }
      break;
    default:
      break;
    }
  }

  get getcustomerAddressAsString() {
    return `${this.PaymentFrom.customerAddress.buildingNumber}, ${this.PaymentFrom.customerAddress.street}, ${this.PaymentFrom.customerAddress.additionalNumber}, ${this.PaymentFrom.customerAddress.citySubdivisionName}, ${this.PaymentFrom.customerAddress.postalCode}, ${this.PaymentFrom.customerAddress.cityName}, ${this.PaymentFrom.customerAddress.countryCode}`;
  }

}
