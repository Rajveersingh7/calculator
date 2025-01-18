function add (numa, numb){
    return numa + numb;
}
function subtract (numa, numb){
    return numa - numb;
}
function multiply (numa, numb){
    return numa * numb;
}
function divide (numa, numb){
    if(numb === 0){
        return 'Error';
    }
    return numa / numb;
}



function operate (num1, operator, num2){
    if(operator === '+'){
        return add(num1, num2);
    }
    else if(operator === '-'){
        return subtract(num1, num2);
    }
    else if(operator === '*'){
        return multiply(num1, num2);
    }
    else if(operator === '/'){
        return divide(num1, num2);
    }
}

const display = document.getElementById('display');
let currentNumber = '';
let firstNumber = null;
let operator = null;
let waiting = false;

function updateDisplay(value) {
    currentNumber += value;
    display.value = currentNumber;
}

function resetCalculator() {
    currentNumber = '';
    firstNumber = null;
    operator = null;
    waiting = false;
    display.value = '';
}

const lowerButtons = document.querySelectorAll('.lower .btn');

lowerButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if(value === 'Clear'){
            resetCalculator();
        }
        else if(value === '='){
            if(firstNumber !== null && operator !== null){
                const result = operate(parseFloat(firstNumber), operator, parseFloat(currentNumber));
                display.value = result;
                currentNumber = result.toString();
                firstNumber = null;
                operator = null;
                waiting = false;
            }
        }
        else if(['+','-','*','/'].includes(value)){
            if(firstNumber === null){
                firstNumber = currentNumber;
                operator = value;
                currentNumber = '';
                waiting = true;
            }
            else if(waiting){
                operator = value;
            }
        }
        else{
            if(waiting){
                currentNumber = '';
                waiting = false;
            }
            updateDisplay(value);
        }
        
    });
});
