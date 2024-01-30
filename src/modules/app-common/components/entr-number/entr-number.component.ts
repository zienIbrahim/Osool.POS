import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-entr-number',
  templateUrl: './entr-number.component.html',
  styleUrls: ['./entr-number.component.scss']
})
export class EntrNumberComponent {
  constructor(private modelService :NgbModal){

  }
  currentNumber = '';
  @Output() Resulte = new EventEmitter<Number>();
  @Input() Title!: string;

  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
  }
  public getNumber(v: string){
    this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;
  }

  RemoveLast(){
    this.currentNumber = this.currentNumber.substring(0, this.currentNumber.length-1);
  }
  public clear(){
    this.currentNumber = '0';
  }
  don(){
    console.log("content ",Number(this.currentNumber))
    this.Resulte.emit(Number(this.currentNumber));
    this.modelService.dismissAll();
  }
  close(){
    this.modelService.dismissAll();
  }
  onInputChange(event: any): void {
    // Use a regular expression to allow only numeric characters
    this.currentNumber = event.target.value.replace(/[^0-9]/g, '');
  }
}
