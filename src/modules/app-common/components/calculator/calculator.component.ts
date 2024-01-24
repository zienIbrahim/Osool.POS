import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  currentNumber = '0';
  firstOperand :number=0;
  operator :string='';
  waitForSecondNumber = false;

  constructor() { }

  ngOnInit() {
  }

  public getNumber(v: string){
    if(this.waitForSecondNumber)
    {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    }else{
      this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;

    }
  }

  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
  }

  private doCalculation(op:string , secondOp:number){
    switch (op){
      case '+':
      return this.firstOperand += secondOp; 
      case '-': 
      return this.firstOperand -= secondOp; 
      case '*': 
      return this.firstOperand *= secondOp; 
      case '/': 
      return this.firstOperand /= secondOp; 
      case '=':
        return secondOp;
    }
    return secondOp;
  }
  public getOperation(op: string){
    console.log(op);

    if(this.firstOperand === null){
      this.firstOperand = Number(this.currentNumber);

    }else if(this.operator){
      const result = this.doCalculation(this.operator , Number(this.currentNumber))
      this.currentNumber = String(result);
      this.firstOperand = Number(result);
    }
    this.operator = op;
    this.waitForSecondNumber = true;

    console.log(this.firstOperand);
 
  }

  public clear(){
    this.currentNumber = '0';
    this.firstOperand = 0;
    this.operator = '';
    this.waitForSecondNumber = false;
  }
}
