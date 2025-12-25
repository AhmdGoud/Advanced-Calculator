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
    ele.addEventListener('click', show_uc_calculator)
})

// show unit converter calc
const uc_calculator = document.querySelector('.uc-calculator')
function show_uc_calculator(){
    uc_calculator.classList.add('show-uc-calculator')
    uc_options.classList.toggle('show-uc-options')
}
//  hide unit converter calc
const hide_uc_btn = document.querySelector('.hide-uc-clac ion-icon')
hide_uc_btn.addEventListener('click', ()=>{
    uc_calculator.classList.remove('show-uc-calculator')
})