const typed = document.getElementById('typedDisplay');
const operation = document.getElementById('operationDisplay');
const percent = document.getElementById('percent');
const clearEvery = document.getElementById('clearEvery');
const clear = document.getElementById('clear');
const divide = document.getElementById('divide');
const one = document.getElementById('1');
const two = document.getElementById('2');
const three = document.getElementById('3');
const four = document.getElementById('4');
const five = document.getElementById('5');
const six = document.getElementById('6');
const seven = document.getElementById('7');
const eight = document.getElementById('8');
const nine = document.getElementById('9');
const zero = document.getElementById('0');
const multiply = document.getElementById('multiply');
const subtract = document.getElementById('subtract');
const add = document.getElementById('add');
const equal = document.getElementById('equal');
const negative = document.getElementById('negative');
const period = document.getElementById('period');
let operand = [];
let number;
let sign = false;
let equalPressed = false;
let lastPressed;

one.onclick = (e) => text(e.target.value);
two.onclick = (e) => text(e.target.value);
three.onclick = (e) => text(e.target.value);
four.onclick = (e) => text(e.target.value);
five.onclick = (e) => text(e.target.value);
six.onclick = (e) => text(e.target.value);
seven.onclick = (e) => text(e.target.value);
eight.onclick = (e) => text(e.target.value);
nine.onclick = (e) => text(e.target.value);
zero.onclick = (e) => text(e.target.value);
add.onclick = () => display("adds");
multiply.onclick = () => display("multiplies");
divide.onclick = () => display("divides");
subtract.onclick = () => display("subtracts");
equal.onclick = () => operates(operand);
clear.onclick = () => clearText();
clearEvery.onclick = () => cleared();


// functions
function equals(final){   
    operation.textContent += "=" ;
    typed.textContent = final;
}

function text(value){
    if (equalPressed == true){
        cleared();
        operation.textContent += value;
        typed.textContent = value;
        lastPressed = value;
        number += value;
    } else if (sign == true){
        operation.textContent += value;
        typed.textContent = value;
        lastPressed = value;
        number += value;
    } else {
        operation.textContent += value;
        typed.textContent += value;
        lastPressed = value;
        number += value;
        sign = false;
    }
}

function display(arg){
    if (arg == "adds" || "divides" || "subracts" || "multiplies"){
        operand.unshift(arg)
    }
    if (arg == "adds"){
        operation.textContent += "+";
        typed.textContent = "+"
        lastPressed = "+";
        sign = true;
    } else if (arg == "divides") {
        operation.textContent += divide.textContent;;
        typed.textContent = divide.textContent;
        lastPressed = divide.textContent;
        sign = true;
    } else if (arg == "multiplies"){
        operation.textContent += multiply.textContent;
        typed.textContent = multiply.textContent;
        lastPressed = multiply.textContent;
        sign = true;
    } else if (arg == "subtracts"){
        operation.textContent += "-";
        typed.textContent = "-";
        lastPressed = "-";
        sign = true;
    }
    operand.push(Number(number));
    number = "";
}

function clearText(){
    if (equalPressed == true){
        cleared();
    } else {
        if (sign == true){
            operand.shift();
            sign = false;
        } else {
            operand.pop();
        }
        console.log(operand);
        let text = operation.textContent;
        let newest = text.replace(lastPressed,"");
        operation.textContent = newest;
        typed.textContent = "";
    }
}

function adds(arguments){
    const args = arguments;
    return args.reduce((a, b) => (a + b));
}

function subtracts(arguments){
    const args = arguments;
    return args.reduce((a, b) => (a - b));
}

function divides(arguments){
    const args = arguments;
    return args.reduce((a, b) => (a/b));
}

function multiplies(arguments){
    const args = arguments;
    return args.reduce((a, b) => (a * b));
}

function percentage(){

}

function operates(array){
    operand.push(Number(number));
    let equation;
    if (array[0] == "adds"){
        equation = adds(array.slice(1));
    } else if (array[0] == "subtracts"){
        equation = subtracts(array.slice(1));
    } else if (array[0] == "multiplies"){
        equation = multiplies(array.slice(1));
    } else if (array[0] == "divides"){
        equation = divides(array.slice(1));
    }
    operand = []
    equalPressed = true
    equals(equation);
}

function cleared(){
    equalPressed = false;
    number = "";
    operand = [];
    typed.textContent = "";
    operation.textContent = "";
}

window.onload = cleared();