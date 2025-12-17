// what to do
// not to add any operand after each other or when it's empty


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


// immediat result
let immediatresult = '';


// accessing numbers and operands
let arrayOfInputs = []
const inputs = document.querySelectorAll('.numbers-operans')
inputs.forEach(function(input){
    input.addEventListener('click', function(){
        arrayOfInputs.push(input.innerHTML);
        finalResult()
        togcolor()
        // if (/[+/\-*]/.test(input.innerHTML)){
        //     if (!arrayOfInputs.at(arrayOfInputs.length-1).match(/[+/\-*]/)){
        //         arrayOfInputs.push(input.innerHTML);
        //         finalResult()
        //         togcolor()
        //     }
        // }
    })
})

// clear and equal
const clear = document.getElementById('clear')
clear.addEventListener('click', function(){
    arrayOfInputs = []
    result.innerHTML = ''
    backspace.classList.remove('togcolor')
})

const equal = document.getElementById('equal')
equal.addEventListener('click', function(){
    if (!arrayOfInputs.at(arrayOfInputs.length-1).match(/[+/\-*]/)){
        result.innerHTML = eval(result.innerHTML)
        arrayOfInputs = []
    }
})

// the backspace and togcolor function
const backspace = document.querySelector('.backspace')
backspace.addEventListener('click', function(){
    arrayOfInputs.pop()
    finalResult()
    togcolor()
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
    if (!arrayOfInputs.includes('(') & !arrayOfInputs.includes(')')){
        arrayOfInputs.push('(')
        finalResult()
    }else{
        const indexOfBracket = arrayOfInputs.indexOf('(')
        if (arrayOfInputs.at(indexOfBracket+1)){
            arrayOfInputs.push(')')
            finalResult()
        }else{
            arrayOfInputs.push('(')
            finalResult()
        }
    }
})

