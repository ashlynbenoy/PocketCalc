class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.clear_calculator();
    }
  
    clear_calculator() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
      this.display_update();
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
      this.display_update();
    }
  
    add_num(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
      this.display_update();
    }
  
    operation_choose(operation) {
      if (this.currentOperand === '') return;
      if (this.previousOperand !== '') {
        this.calculate();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
      this.display_update();
    }
  
    calculate() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(prev)||isNaN(current)) return;
      switch (this.operation) {
        case '+':
          computation = prev+current;
          break;
        case '-':
          computation = prev-current;
          break;
        case '*':
          computation = prev*current;
          break;
        case '÷':
          computation = prev/current;
          break;
        default:
          return;
      }
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
      this.display_update();
    }
  
    display_num(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];
      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
  
    display_update() {
      this.currentOperandTextElement.innerText =
        this.display_num(this.currentOperand);
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.display_num(this.previousOperand)} ${this.operation}`;
      } else {
        this.previousOperandTextElement.innerText = '';
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const numberButtons = document.querySelectorAll('[data-number]');
    const operationButtons = document.querySelectorAll('[data-operation]');
    const equalsButton = document.querySelector('[data-equals]');
    const deleteButton = document.querySelector('[data-delete]');
    const allClearButton = document.querySelector('[data-all-clear]');
    const previousOperandTextElement = document.querySelector('[data-previous-operand]');
    const currentOperandTextElement = document.querySelector('[data-current-operand]');
  
    const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
  
    numberButtons.forEach(button => {
      button.addEventListener('click', () => {
        calculator.add_num(button.innerText);
      });
    });
  
    operationButtons.forEach(button => {
      button.addEventListener('click', () => {
        calculator.operation_choose(button.innerText);
      });
    });
  
    equalsButton.addEventListener('click', () => {
      calculator.calculate();
    });
  
    allClearButton.addEventListener('click', () => {
      calculator.clear_calculator();
    });
  
    deleteButton.addEventListener('click', () => {
      calculator.delete();
    });
  });