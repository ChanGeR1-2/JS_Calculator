const numberButtons = document.querySelector(".buttons");
const bottomDisplay = document.querySelector("#bottom-display");
const topDisplay = document.querySelector("#top-display span");

let currentNumber = [];
let nums = [];
let ops = [];

let resetValues = false;
let decimalPointValueChange = false;

numberButtons.addEventListener("click", (event) => {
    const target = event.target;
    if (resetValues) {
        nums = [];
        ops = [];
        resetValues = false;
    }
    if (target.classList.contains("number-button")) {
        if (decimalPointValueChange) {
            currentNumber[currentNumber.length - 1] = ".";
            decimalPointValueChange = false;
        }
        currentNumber.push(target.textContent);
    } else if (target.classList.contains("util-button")) {
        switch (target.id) {
            case "reset-button":
                reset();
                break;
            case "change-sign-button":
                if (currentNumber[0]) {
                    if (currentNumber[0].charAt(0) === "-") {
                        currentNumber[0] = currentNumber[0].slice(1);
                    } else {
                        currentNumber[0] = "-" + currentNumber[0];
                    }
                }
                break;
            case "back-button":
                const num = currentNumber[currentNumber.length - 1]
                currentNumber[currentNumber.length - 1] = num.slice(0, num.length - 2);
                if (!currentNumber[currentNumber.length - 1]) {
                    currentNumber.pop();
                }
                break;
        }
    } else if (target.classList.contains("sign-button")) {
        pushNumber();
        ops.push(target.textContent);
        if (ops[1]) {
            calculate();
            nums = [];
            ops.shift();
            pushNumber();
        }
    } else if (target.id === "equals-button") {
        pushNumber();
        if (calculate()) {
            resetValues = true;
        }
    } else if (target.id === "point-button") {
        if (currentNumber.filter((str) => str.includes(".")).length === 0) {
            currentNumber.push(currentNumber.length === 0 ? "0.0" : ".0");
            decimalPointValueChange = true;
        }
    }
    refresh();
})

function refresh() {
    bottomDisplay.textContent = currentNumber.length > 0 ? currentNumber.join('') : '0';
    let displayString = '';
    if (ops[0]) {
        displayString += nums[0] + " " + ops[0];
        if (nums[1]) {
            displayString += " " + nums[1] + " =";
        }
    }
    topDisplay.textContent = displayString;
}

function calculate() {
    const result = operate(ops[0], nums[0], nums[1]);
    if (result) {
        currentNumber = [];
        currentNumber.push(result.toString());
        return true;
    }
    return false;
}

function pushNumber() {
    if (currentNumber[0]) {
        if(currentNumber.filter((str) => str.includes(".")).length === 0) {
            nums.push(parseInt(currentNumber.join('')));
        } else {
            nums.push(parseFloat(currentNumber.join('')));
        }
        currentNumber = [];
    }
}

function reset() {
    currentNumber = [];
    nums = [];
    ops = [];
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
    if (a === undefined || b === undefined || !operator) return;
    switch (operator) {
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