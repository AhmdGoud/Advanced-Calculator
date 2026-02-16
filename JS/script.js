// pointer affect
const pointer = document.querySelector(".pointer");
setInterval(function () {
  pointer.classList.toggle("pointerAffect");
}, 500);

// the final result function
let arrayOfInputs = [];
const result = document.querySelector(".result");
function finalResult() {
  result.innerHTML = "";
  for (let ele of arrayOfInputs) {
    result.innerHTML += ele;
  }
}

// accessing numbers and operands
let atleastOperand = false;
const immediatresult = document.querySelector(".immediatresult");
const inputs = document.querySelectorAll(".input .numbers-operans");
inputs.forEach(function (input) {
  input.addEventListener("click", function () {
    // checking if first or last input is an operator then adding operands to the result section
    const isLastInputOperand = /[+/\-*%]/.test(
      arrayOfInputs.at(arrayOfInputs.length - 1),
    );
    if (
      (/[+/\-*%]/.test(input.innerHTML) &&
        arrayOfInputs.length > 0 &&
        isLastInputOperand) ||
      (/[+/\-*%]/.test(input.innerHTML) && arrayOfInputs.length === 0)
    ) {
      return;
    } else {
      arrayOfInputs.push(input.innerHTML);
      finalResult();
      togcolor();
    }

    // the immediate  result
    let lastOperand = arrayOfInputs.at(arrayOfInputs.length - 1);
    if (/[+/\-*%]/.test(input.innerHTML)) {
      atleastOperand = true;
    }
    if (atleastOperand && !/[+/\-*%]/.test(lastOperand)) {
      immediatresult.innerHTML = eval(result.innerHTML);
    }
  });
});

// clear result section
const clear = document.getElementById("clear");
clear.addEventListener("click", function () {
  arrayOfInputs = [];
  result.innerHTML = "";
  backspace.classList.remove("togcolor");
  immediatresult.innerHTML = "";
});

// equal feature
const equal = document.getElementById("equal");
equal.addEventListener("click", function () {
  if (
    arrayOfInputs.length > "0" &&
    !arrayOfInputs.at(arrayOfInputs.length - 1).match(/[+/\-*]/)
  ) {
    operationsForHistory();
    result.innerHTML = eval(result.innerHTML);
    arrayOfInputs = [];
    immediatresult.innerHTML = "";
  }
});

// history operations
const histroyOperations = [];
const history = document.querySelector(".history");
function operationsForHistory() {
  // single operation in history
  const singleOperation = {
    Expresion: result.innerHTML,
    theResult: `= ${eval(result.innerHTML)}`,
  };
  if (histroyOperations.length > 9) {
    histroyOperations.shift();
    histroyOperations.push(singleOperation);
  } else {
    histroyOperations.push(singleOperation);
  }

  // storing at loacal storage
  window.localStorage.setItem("operations", JSON.stringify(histroyOperations));
  const operations = window.localStorage.getItem("operations");
  const parsOperations = JSON.parse(operations);
  history.innerHTML = "";

  // iterate over the array of operations and append it to the page
  for (let ele of parsOperations) {
    // creating elements
    const theOperation = document.createElement("div");
    theOperation.className = "theoperation";
    const theExpresion = document.createElement("div");
    const theResultHistroy = document.createElement("div");
    // assigning values and append
    theExpresion.innerHTML = ele.Expresion;
    theResultHistroy.innerHTML = ele.theResult;
    theOperation.append(theExpresion, theResultHistroy);
    history.prepend(theOperation);
  }
}

// show history results and check if UC tap is open
export let historyIsOpened = false;
import { uc_optionsIsOpened } from "./uc.js";

const historyBtn = document.querySelector(".historybtn");
const theHistory = document.querySelector(".history-section");
historyBtn.addEventListener("click", function () {
  if (!uc_optionsIsOpened) {
    theHistory.classList.toggle("show-histroy");
    historyBtn.innerHTML === "History"
      ? (historyBtn.innerHTML = "Keypad")
      : (historyBtn.innerHTML = "History");
    historyIsOpened ? (historyIsOpened = false) : (historyIsOpened = true);
  }
});

// clear history from screen and local storage
const clearHistory = document.querySelector(".clearbtn");
clearHistory.addEventListener("click", clearing);
function clearing() {
  window.localStorage.removeItem("operations");
  history.innerHTML = "";
}

// the backspace removing method
const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", function () {
  arrayOfInputs.pop();
  finalResult();
  togcolor();
  inputs.forEach(function (input) {
    let lastOperand = arrayOfInputs.at(arrayOfInputs.length - 1);
    arrayOfInputs.length === 0 ? (immediatresult.innerHTML = "") : "";

    if (input.innerHTML !== undefined && /[+/\-*%]/.test(input.innerHTML)) {
      atleastOperand = true;
    }
    if (
      atleastOperand &&
      arrayOfInputs.length > 0 &&
      !/[+/\-*%]/.test(lastOperand)
    ) {
      immediatresult.innerHTML = eval(result.innerHTML);
    }
  });
});

// change backspace color when result in empty
function togcolor() {
  if (arrayOfInputs.length >= 1) {
    backspace.classList.add("togcolor");
  } else {
    backspace.classList.remove("togcolor");
  }
}

// the parentheses method (still have some logic)
const brackets = document.getElementById("brackets");
brackets.addEventListener("click", function () {
  if (!arrayOfInputs.includes("(") && !arrayOfInputs.includes(")")) {
    arrayOfInputs.push("(");
  } else {
    let indexOfBracket = arrayOfInputs.indexOf("(");
    let last = arrayOfInputs.at(indexOfBracket + 1);
    let opened = arrayOfInputs.filter((ele) => ele === "(").length;
    let closed = arrayOfInputs.filter((ele) => ele === ")").length;
    if (opened > closed) {
      arrayOfInputs.push(")");
    } else {
      arrayOfInputs.push("(");
    }
  }
  finalResult();
});
