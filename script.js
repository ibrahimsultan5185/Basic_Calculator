const result = document.getElementById("result");
const previous = document.getElementById("previous");

function addValue(value) {
    if (result.value === "Error") {
        result.value = "";
    }

    if (result.value === "0") {
        result.value = value;
    } else {
        result.value += value;
    }
}

function clearDisplay() {
    result.value = "0";
    previous.innerText = "";
}

function deleteNumber() {
    result.value = result.value.slice(0, -1);

    if (result.value === "") {
        result.value = "0";
    }
}

function calculate() {
    try {
        const expression = result.value;

        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
            throw new Error("Invalid expression");
        }

        const answer = Function('"use strict"; return (' + expression + ')')();

        if (!Number.isFinite(answer)) {
            throw new Error("Invalid result");
        }

        previous.innerText = expression + " =";
        result.value = String(Number(answer.toPrecision(12)));
    } catch (error) {
        previous.innerText = "";
        result.value = "Error";
    }
}
