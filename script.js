let currentNumber = "";
let previousNumber = "";
let operator = "";

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

function appendNumber(number) {

    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    if (currentNumber === "0" && number !== ".") {
        currentNumber = "";
    }

    currentNumber += number;

    updateDisplay();
}

function chooseOperator(selectedOperator) {

    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber !== "" && previousNumber !== "") {
        calculate();
    }

    operator = selectedOperator;

    previousNumber = currentNumber;
    currentNumber = "";

    updateDisplay();
}

function calculate() {

    if (previousNumber === "" || currentNumber === "" || operator === "") {
        return;
    }

    const first = parseFloat(previousNumber);
    const second = parseFloat(currentNumber);

    let result;

    switch (operator) {

        case "+":
            result = first + second;
            break;

        case "-":
            result = first - second;
            break;

        case "*":
            result = first * second;
            break;

        case "/":
            if (second === 0) {
                currentNumber = "Error";
                previousNumber = "";
                operator = "";
                updateDisplay();
                return;
            }

            result = first / second;
            break;

        case "%":
            result = first % second;
            break;
    }

    currentNumber = String(result);
    previousNumber = "";
    operator = "";

    updateDisplay();
}

function clearDisplay() {

    currentNumber = "";
    previousNumber = "";
    operator = "";

    updateDisplay();
}

function deleteNumber() {

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();
}

function updateDisplay() {

    currentDisplay.textContent = currentNumber || "0";

    if (operator && previousNumber) {
        previousDisplay.textContent =
            `${previousNumber} ${operator}`;
    } else {
        previousDisplay.textContent = "";
    }
}