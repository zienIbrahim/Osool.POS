import { Component } from '@angular/core';

@Component({
  selector: 'app-entr-number',
  templateUrl: './entr-number.component.html',
  styleUrls: ['./entr-number.component.scss']
})
export class EntrNumberComponent {
  currentNumber = '0';
  firstOperand :number=0;
  operator :string='';
  waitForSecondNumber = false;

  public getNumber(v: string){
    if(this.waitForSecondNumber)
    {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    }else{
      this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;

    }
  }
}
