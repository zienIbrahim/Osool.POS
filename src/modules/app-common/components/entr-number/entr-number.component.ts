import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-entr-number',
  templateUrl: './entr-number.component.html',
  styleUrls: ['./entr-number.component.scss']
})
export class EntrNumberComponent {
  constructor(private modelService :NgbModal){

  }
  currentNumber = '0';
  @Output() Resulte = new EventEmitter<Number>();
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
}
