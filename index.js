// Single query for all number buttons at once
document.querySelectorAll(".btn-num").forEach(btn => {
  btn.addEventListener("click", () => handleNumber(btn.dataset.value));
});

document.querySelectorAll(".btn-op").forEach(btn => {
  btn.addEventListener("click", () => handleOperator(btn.dataset.value));
});

document.getElementById("btn-clear").addEventListener("click", clearAll);
document.getElementById("btn-eq").addEventListener("click", calculate);
document.getElementById("btn-decimal").addEventListener("click", addDecimal);

let current = "0";
let previous = "";
let operator = null;
let justEvaled = false;

function handleNumber(val) {
  if (justEvaled) { current = val; justEvaled = false; return updateDisplay(); }
  current = current === "0" ? val : current + val;
  updateDisplay();
}

function handleOperator(op) {
  if (operator && !justEvaled) calculate();
  previous = current;
  current = "0";
  operator = op;
  justEvaled = false;
}

function calculate() {
  if (!operator) return;
  const a = parseFloat(previous);
  const b = parseFloat(current);
  let result;

  switch (operator) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "*": result = a * b; break;
    case "/": result = b !== 0 ? a / b : "Error"; break;
    default: return;
  }

  current = String(result);
  operator = null;
  justEvaled = true;
  updateDisplay();
}

function addDecimal() {
  if (justEvaled) { current = "0."; justEvaled = false; return updateDisplay(); }
  if (!current.includes(".")) {
    current += ".";
    updateDisplay();
  }
}

function clearAll() {
  current = "0";
  previous = "";
  operator = null;
  justEvaled = false;
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("display").textContent = current;
}
