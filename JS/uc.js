// show the Unit Converter section and check if history tap is open
import {historyIsOpened} from './script.js'
export let uc_optionsIsOpened = false;

const uc = document.querySelector('.UC')
const uc_options = document.querySelector('.uc-options')
uc.addEventListener('click', function(){
    if (!historyIsOpened){
        uc_options.classList.toggle('show-uc-options')
        uc_optionsIsOpened ? uc_optionsIsOpened = false : uc_optionsIsOpened = true;
    }
})

// show name of the unit-converter when hover
const options = [...document.querySelectorAll('.unit')]
const tips = [...document.querySelectorAll('.tip')]
const logo = document.querySelector('.logo')
options.forEach(ele =>{
    ele.addEventListener('mouseover', ()=>{
        let indexOfEle = options.indexOf(ele)
        tips[indexOfEle].innerHTML = ele.dataset.title
        tips[indexOfEle].style.display = 'block'
    })
    ele.addEventListener('mouseleave', ()=>{
        let indexOfEle = options.indexOf(ele)
        tips[indexOfEle].style.display = 'none'
    })

    // call show uc calc function on click
    ele.addEventListener('click', function(){
        show_uc_calculator(ele)
    })
})

// show unit converter calc
const uc_calculator = document.querySelector('.uc-calculator')
function show_uc_calculator(ele){
    uc_calculator.classList.add('show-uc-calculator')
    uc_options.classList.toggle('show-uc-options')
    // we treated ele like the document to get its inner span
    logo.innerHTML = ele.querySelector('span').innerHTML
}

//  hide unit converter calc
const hide_uc_btn = document.querySelector('.hide-uc-clac ion-icon')
hide_uc_btn.addEventListener('click', ()=>{
    uc_calculator.classList.remove('show-uc-calculator')
})

// update the input on click numbers
let arraOfUnits = [];
const howManyUnits = document.querySelector('.input-unit')
const output = document.querySelector('.output-nuit')
const allNums = document.querySelectorAll('.uc-inputs .numbers-operans')
allNums.forEach(num =>{
    num.addEventListener('click', function(){
        arraOfUnits.push(num.innerHTML);
        howManyUnits.innerHTML = ''
        for (let unit of arraOfUnits){
            howManyUnits.innerHTML += unit;
        }
        output.innerHTML = eval(howManyUnits.innerHTML * 1.6)
    })
})

// clear the uc-input
const clearUC = document.querySelector('#clearUC')
clearUC.addEventListener('click', function(){
    howManyUnits.innerHTML = ''
    output.innerHTML = ''
    arraOfUnits = []
})

// uc backspace
const uc_backspace = document.querySelector('.uc-backspace')
uc_backspace.addEventListener('click', function(){
    arraOfUnits.pop()
    howManyUnits.innerHTML = ''
    for (let unit of arraOfUnits){
        howManyUnits.innerHTML += unit;
    }
    output.innerHTML = eval(howManyUnits.innerHTML * 1.6)
})