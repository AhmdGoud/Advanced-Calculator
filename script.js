// pointer affect
const pointer = document.querySelector('.pointer')
setInterval(function(){
    pointer.classList.toggle('pointerAffect')
}, 500)

// the result function
const result = document.querySelector('.result')
function finalResult(){
    result.innerHTML = ''
    for (ele of arrayOfInputs){
        result.innerHTML += ele
    }
}


// accessing numbers and operands
let arrayOfInputs = []
let atleastOperand = false;
const immediatresult = document.querySelector('.immediatresult');
const inputs = document.querySelectorAll('.numbers-operans')
inputs.forEach(function(input){
    input.addEventListener('click', function(){

        if (/[+/\-*%]/.test(input.innerHTML) && arrayOfInputs.length > 0 && arrayOfInputs.at(arrayOfInputs.length-1).match(/[+/\-*%]/) 
        || /[+/\-*%]/.test(input.innerHTML) && arrayOfInputs.length === 0){
            return;
        }else{
            arrayOfInputs.push(input.innerHTML);
            finalResult()
            togcolor()
        }

        // immediat result
        let lastOperand = arrayOfInputs.at(arrayOfInputs.length-1);
        if (/[+/\-*%]/.test(input.innerHTML)){
            atleastOperand = true;
        }
        if (atleastOperand && !/[+/\-*%]/.test(lastOperand)){
            immediatresult.innerHTML = eval(result.innerHTML);
        }
    })
})


// clear and equal
const clear = document.getElementById('clear')
clear.addEventListener('click', function(){
    arrayOfInputs = []
    result.innerHTML = ''
    backspace.classList.remove('togcolor')
    immediatresult.innerHTML = ''
})


const equal = document.getElementById('equal')
equal.addEventListener('click', function(){
    if (!arrayOfInputs.at(arrayOfInputs.length-1).match(/[+/\-*]/)){
        operationsForHistory()
        result.innerHTML = eval(result.innerHTML)
        arrayOfInputs = []
        immediatresult.innerHTML = ''
    }
})

// history operations
const histroyOperations = [];
const history = document.querySelector('.history')
function operationsForHistory(){

    const singleOperation = {
        Expresion: result.innerHTML,
        theResult: eval(result.innerHTML)
    }
    if (histroyOperations.length > 2){
        histroyOperations.shift()
        histroyOperations.push(singleOperation);
    }else{
        histroyOperations.push(singleOperation);
    }

    window.localStorage.setItem('operations', JSON.stringify(histroyOperations))
    const operations = window.localStorage.getItem("operations")
    const parsOperations = JSON.parse(operations)
    history.innerHTML = ''

    for (ele of parsOperations){
        const theOperation = document.createElement('div')
        theOperation.className = 'theoperation'
        const theExpresion = document.createElement('div')
        const theResultHistroy = document.createElement('div')
        theExpresion.innerHTML = ele.Expresion;
        theResultHistroy.innerHTML = ele.theResult
        theOperation.append(theExpresion, theResultHistroy)
        history.append(theOperation)
    }
}

// clear history
function clearHistory(){
    
}

// show history results
const historyBtn = document.querySelector('.historybtn')
historyBtn.addEventListener('click', function(){
    history.classList.toggle('show-histroy')
})

// the backspace and togcolor function
const backspace = document.querySelector('.backspace')
backspace.addEventListener('click', function(){
    arrayOfInputs.pop()
    finalResult()
    togcolor()
    inputs.forEach(function(input){
        let lastOperand = arrayOfInputs.at(arrayOfInputs.length-1);
        if (input.innerHTML !== undefined && /[+/\-*%]/.test(input.innerHTML)){
            atleastOperand = true;
        }
        if (atleastOperand && arrayOfInputs.length > 0 && !/[+/\-*%]/.test(lastOperand)){
            immediatresult.innerHTML = eval(result.innerHTML);
        }
    })
})

function togcolor(){
    if (arrayOfInputs.length >= 1){
        backspace.classList.add('togcolor')
    }else{
        backspace.classList.remove('togcolor')
    }
}

// the brackets
const brackets = document.getElementById('brackets')
brackets.addEventListener('click', function(){
    if (!arrayOfInputs.includes('(') && !arrayOfInputs.includes(')')){
        arrayOfInputs.push('(')
    }else{
        let indexOfBracket = arrayOfInputs.indexOf('(')
        let last = arrayOfInputs.at(indexOfBracket+1)
        let opened = arrayOfInputs.filter((ele) => ele === '(').length;
        let closed = arrayOfInputs.filter((ele) => ele === ')').length;
        if (opened > closed){
            arrayOfInputs.push(')')
        }else{
            arrayOfInputs.push('(')
        }
    }
    finalResult()
})
