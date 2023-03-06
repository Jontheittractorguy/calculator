let operand = [];
let operates = "";
let signs = false;
let equalSign = false;

// listen for key press
const calculator = document.querySelector("#calcBody");
const keys = calculator.querySelector("#buttons");
const display = document.querySelector("#typedDisplay");
const operation = document.querySelector("#operationDisplay");
const total = document.querySelector(".totally");

keys.addEventListener('click',e => {
    if (e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;
        let content = key.textContent;
        const displayNumb = display.textContent;
        // display
        if (typeof action != "string"){

            if (display.textContent === "0" || signs == true){
                display.textContent = content;
                operates += content;
            } else if (equalSign == true){
                clearAll();
                display.textContent = content;
                operates = content;
            } else {
                display.textContent = displayNumb + content;
                operates += content;
            }
            signs = false;
            equalSign = false;
        } else if (action == "percent") {
            percentage(displayNumb);
            content = "";
        } else if (action == "equal"){
            let totals = operate(operand);
            display.textContent = totals;
            total.textContent = totals;
            equalSign = true;
            content = "";
        } else if (action == "plusMinus") {
            plusMinus(displayNumb);
            content = "";
        }
        else if (action == "CE"){
            clearAll();
            content = "";
        } else if (action == "clear"){
            clear();
            content = "";
        } else {
            if (equalSign == true){
                clearAll();
                operand.push(total.textContent);
                operates += total.textContent;                
            }
            display.textContent = content;
            operates += content;
            signs = true;
        }
        if (content != ""){
            operand.push(content)
        };
        operation.textContent = operates;
    }
});

// function for operation
function operate(array){
    equalSign = true;
    if (isNaN(array.slice(-1)) || isNaN(array.slice(0,1))){
        return "OOPS";
     }
    const arry = array.join("");
    const times = arry.toString().replace("\u00F7","/");
    const multy = times.toString().replace("\u00D7","*")
    const equals = multy;
    return eval(equals);
}

// clear all
function clearAll(){
    signs = false;
    operand = [];
    operates = "";
    display.textContent = "0";
    operation.textContent = "0";
}

// clear
function clear(){
    operand.pop();
    let removed = operates.slice(0,operates.length - 1);
    operates = removed;
    display.textContent = "";
}

// plus and minus (give negative sign)
function plusMinus(x){
    console.log(x);
    let numb;
    for (let i = 0;i<x.length;i++){
        operand.pop();
    }
    if (x > 0){
        operand.push(x);
        operand.push("*");
        operand.push("-1");
        numb = x * -1;
    } else if (x < 0){
        numb = Math.abs(x);
        operand.push(numb);
    }
    let removed = operates.slice(0,operates.length - x.length);
    operates = removed + numb;
    display.textContent = numb;
}

// percentage button
function percentage(x){
    let percents = x/100;
    display.textContent = percents;
    for (let i = 0;i<x.length;i++){
        operand.pop();
    }
    operand.push(percents);
    let removed = operates.slice(0,operates.length - x.length);
    operates = removed + percents;
}

// errors
window.onerror = (e)=>{
    display.textContent = "Error use CE"
}
