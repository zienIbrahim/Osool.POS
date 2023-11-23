import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.scss']
})
export class PointOfSaleComponent {
  @ViewChild("contentvoucher") contentvoucher:any;
  ItemOfgroupData: any = [];
  AllItemData: any = [];
  PriceItem: any;
  active = 0;
  Total = 0;
  cartlist: any = [];
  Unitprice:any;
  myDate : any;
  sumbit:boolean = false;
  voucherSales : any =[];
  resultSales:any = [];
  OrderNo:any;
  invoiceTotle = 0;
  SumQut:any;
  ItemNOSum:any;
  selectedStor = null;
  constructor(private modalService: NgbModal, private fb: FormBuilder) {
   }
  ngOnInit(): void {
    this.getItemOfGroup();
    this.getAllItem();
    this.GetCustomer();
    this.GetStore();
    this.myDataTime();
    // this.getSumQut();
  }

  CustomerForm = new FormGroup({
    id: new FormControl(null ,[Validators.required]),
    customerName: new FormControl(null),
    phone: new FormControl(null),
    other: new FormControl(null),
  });
  StoreForm = new FormGroup({
    id: new FormControl(null ,[Validators.required])
  });

  myDataTime(){
    let date: Date = new Date();
    date.setDate(date.getDate());
    let datePipe: DatePipe = new DatePipe('en-US');
    this.myDate =  datePipe.transform(date , 'yyyy-MM-dd')
  }
  getAllItem() {
   
  }
  getItemOfGroup() {
  
  }
  GetCustomer() {
  
  }
  GetStore() {
  
  }
  changeQnty(cartQut: any, anty: any) {
    for (let i = 0; i < this.cartlist.length; i++) {
      if (this.cartlist[i] == cartQut)
        this.cartlist[i].quantity = anty;
      this.cartlist[i].subTotal = this.cartlist[i].quantity * this.cartlist[i].unitPrice;
    }
    this.calculateTotal();
  }
  changeQntymin(cartQut: any) {
    for (let i = 0; i < this.cartlist.length; i++) {
      if (this.cartlist[i] == cartQut && this.cartlist[i].quantity > 0)
        this.cartlist[i].quantity -= 1;
      this.cartlist[i].subTotal = this.cartlist[i].quantity * this.cartlist[i].unitPrice;
    }
    this.calculateTotal();
  }
  changeQntyPlus(cartQut: any) {
    for (let i = 0; i < this.cartlist.length; i++) {
      if (this.cartlist[i] == cartQut)
        this.cartlist[i].quantity += 1;
      this.cartlist[i].subTotal = this.cartlist[i].quantity * this.cartlist[i].unitPrice;
    }
    this.calculateTotal();
  }
  calculateTotal() {
    this.Total=0;
    this.cartlist.forEach((cart: any) => {
      this.Total += cart.subTotal;
    });
  }
  getSumQut(data:any){
    // console.log(data);
  }
  addToCart(cartToAdd: any) {
    // this.getSumQut(cartToAdd.id)
    console.log('cartToAdd :' ,cartToAdd);
    if (this.cartlist.length == 0) {
      cartToAdd.quantity = 1;
      cartToAdd.unitPrice = cartToAdd.priceItem;
      cartToAdd.subTotal = cartToAdd.quantity * cartToAdd.unitPrice;
      cartToAdd.itemNo = cartToAdd.id;
      this.cartlist.push(cartToAdd);
      this.calculateTotal();
    } else {
      for (let i = 0; i < this.cartlist.length; i++) {
        if (this.cartlist[i].id == cartToAdd.id) {
          if (this.ItemNOSum ==  this.cartlist[i].quantity) {
            alert('Qut = Sum');
          } else {
            this.cartlist[i].quantity += 1;
          }
          cartToAdd.subTotal = cartToAdd.quantity * cartToAdd.unitPrice;
          this.calculateTotal();
          break;
        }
        else if (this.cartlist[i].id != cartToAdd.id && i + 1 == this.cartlist.length) {
          cartToAdd.quantity = 1;
          cartToAdd.unitPrice = cartToAdd.priceItem;
          cartToAdd.subTotal = cartToAdd.quantity * cartToAdd.unitPrice;
          cartToAdd.itemNo = cartToAdd.id;
          this.cartlist.push(cartToAdd);
          this.calculateTotal();
          break;
        }
      }
    }
  }

  AddIOrder() {
    if (this.CustomerForm.invalid) {
      this.CustomerForm.markAllAsTouched;
      return;
    }
    if (this.StoreForm.invalid) {
      this.StoreForm.markAllAsTouched;
      return;
    }
    
    let orderToPost: any = {
      customerNo:this.CustomerForm.value.id,
      saleDate: this.myDate,
      storeNo: this.StoreForm.value.id,
      data: this.cartlist
    };
  
  }

  removeToCart(cartITem: any) {
    this.cartlist = this.cartlist.filter(
      (licenses: any) => JSON.stringify(licenses.id) !== JSON.stringify(cartITem.id)
    );
    this.calculateTotal();
  }

  ResetToCart(){
    this.cartlist=[];
    this.CustomerForm.reset();
    this.StoreForm.reset();
    this.active = 0;
    this.Total = 0;
  }

  get addCustomerValid() {
    return this.CustomerForm.controls;
  }
  get addStoreValid() {
    return this.StoreForm.controls;
  }
}
