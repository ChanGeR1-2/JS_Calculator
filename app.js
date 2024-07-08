const numberButtons = document.querySelector(".buttons");
const display = document.querySelector(".display");
let displayValue = '0';

let firstNumber = null;
let secondNumber = null;
let operator = null;
let reset = false;

numberButtons.addEventListener("click", (event) => {
    if (event.target.classList.contains("number-button")) {
        displayValue = displayValue === '0' || reset ? event.target.textContent : displayValue + event.target.textContent;
        reset = false;
    } else if (event.target.classList.contains("util-button")) {
        switch(event.target.id) {
            case "reset-button":
                displayValue = '0';
                firstNumber = null;
                secondNumber = null;
                operator = null;
        }
    } else if (event.target.classList.contains("sign-button")) {
        if (operationPresent()) {
            secondNumber = parseInt(displayValue);
            const result = operate(operator, firstNumber, secondNumber)
            displayValue = result.toString();
            firstNumber = result;
            secondNumber = null;
            operator = event.target.textContent;
        } else {
            operator = event.target.textContent;
            firstNumber = parseInt(displayValue);
        }
        reset = true;
    } else if (event.target.id === "equals-button") {
        secondNumber = parseInt(displayValue);
        displayValue = operate(operator, firstNumber, secondNumber).toString();
        firstNumber = null;
        secondNumber = null;
        operator = null;
    }
    display.textContent = displayValue;
})

function operationPresent() {
    return firstNumber && operator;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        alert("No division by zero!");
        return -1;
    }
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}