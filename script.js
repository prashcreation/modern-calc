let currentNumber = "0";
let previousNumber = "";
let operator = null;

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

function updateDisplay() {
    currentDisplay.innerText = currentNumber;
    previousDisplay.innerText = previousNumber;
}

function appendNumber(number) {
    if (number === "." && currentNumber.includes(".")) return;

    if (currentNumber === "0" && number !== ".") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }

    updateDisplay();
}

function chooseOperator(selectedOperator) {
    if (currentNumber === "" && previousNumber === "") return;

    if (previousNumber !== "") {
        calculate();
    }

    operator = selectedOperator;
    previousNumber = currentNumber + " " + operator;
    currentNumber = "0";

    updateDisplay();
}

function calculate() {
    if (!operator || previousNumber === "") return;

    let parts = previousNumber.split(" ");
    let firstNumber = parseFloat(parts[0]);
    let secondNumber = parseFloat(currentNumber);

    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                currentNumber = "Error";
                operator = null;
                previousNumber = "";
                updateDisplay();
                return;
            }
            result = firstNumber / secondNumber;
            break;

        case "%":
            result = firstNumber % secondNumber;
            break;
    }

    currentNumber = String(result);
    previousNumber = "";
    operator = null;

    updateDisplay();
}

function clearDisplay() {
    currentNumber = "0";
    previousNumber = "";
    operator = null;
    updateDisplay();
}

function deleteNumber() {
    if (currentNumber.length === 1) {
        currentNumber = "0";
    } else {
        currentNumber = currentNumber.slice(0, -1);
    }

    updateDisplay();
}


/* =========================
   KEYBOARD SUPPORT
   ========================= */

document.addEventListener("keydown", function (event) {

    // Numbers 0-9
    if (event.key >= "0" && event.key <= "9") {
        appendNumber(event.key);
    }

    // Decimal point
    else if (event.key === ".") {
        appendNumber(".");
    }

    // Operators
    else if (event.key === "+") {
        chooseOperator("+");
    }

    else if (event.key === "-") {
        chooseOperator("-");
    }

    else if (event.key === "*") {
        chooseOperator("*");
    }

    else if (event.key === "/") {
        event.preventDefault();
        chooseOperator("/");
    }

    else if (event.key === "%") {
        chooseOperator("%");
    }

    // Enter or =
    else if (event.key === "Enter" || event.key === "=") {
        calculate();
    }

    // Escape = AC
    else if (event.key === "Escape") {
        clearDisplay();
    }

    // Backspace = delete
    else if (event.key === "Backspace") {
        deleteNumber();
    }
});
