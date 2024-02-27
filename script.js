const screen = document.querySelector('#screen');

const maxCharacters = 9;
const clearLongPressDelay = 500;
let clearClicked = 0;
let lastNum = undefined;
let lastOperationNum = undefined;
let mode = '';
let showResult = false;
let equalsPressed = false;

// document.designMode = "on"; // Mark this page as receiving keyboard input to prevent things like 'Backspace to Go Back'.

function addNumber(num) {
    if (showResult) { 
        screen.textContent = '0'; 
        showResult = false;
        if (equalsPressed)
        {
            mode = '';
            lastnum = undefined;
            equalsPressed = false;
        }
     }
    if (screen.textContent == '0')
    {
        screen.textContent = num;
        if (num === '.') { screen.textContent = "0."; }
    }
    else
    {
        if (screen.textContent.length >= maxCharacters)
        {
            if (screen.textContent.charAt(2) == '.') { return; }
            else if (screen.textContent.charAt(0) == '-') { screen.textContent = '-' + screen.textContent.slice(2, maxCharacters); }
            else { screen.textContent = screen.textContent.slice(1, maxCharacters); }
        }
        screen.textContent += num;
    }
}

function addDecimal() {
    if (screen.textContent.includes('.')) { return; }
    else { addNumber('.'); }
}

function clearMouseDown() {
    clearClicked = Date.now();
}

function clearNumber() {
    if (screen.textContent === '0') { return; }
    if (Date.now() - clearClicked >= clearLongPressDelay) { 
        screen.textContent = '0'; 
        lastNum = undefined;
        mode = '';
    }
    else {
        screen.textContent = screen.textContent.slice(0, screen.textContent.length - 1);
    }
    if (screen.textContent === '-0' ||
        screen.textContent === '-' ||
        screen.textContent === '') { screen.textContent = '0'; }
}

function toggleNegative()
{
    if (screen.textContent === '0') { return; }
    let isNegative = screen.textContent.charAt(0) === '-'
    if (isNegative) {
        screen.textContent = screen.textContent.slice(1, screen.textContent.length);
    }
    else {
        if (screen.textContent.length == maxCharacters) { screen.textContent = screen.textContent.slice(1, screen.textContent.length); }
        screen.textContent = '-' + screen.textContent;
    }
}

function toPercent() {
    let num = parseFloat(screen.textContent);
    num *= 0.01
    let numString = num.toString();
    if (numString.length > maxCharacters) { numString = numString.slice(0, maxCharacters); }
    screen.textContent = numString;
}

function operationButton(operation) {
    if (isNaN(parseFloat(screen.textContent))) { return; }
    if (equalsPressed) {
        equalsPressed = false;
        mode = '';
    }
    displayResult = false;
    if (lastNum != undefined && mode != '')
    {
        mode = operation;
        lastNum = operate()
        if (lastNum == undefined) { mode = ''; return; }
    }
    else
    {
        lastNum = parseFloat(screen.textContent);
        screen.textContent = '0';
    }
    mode = operation;
}

function operate() {
    let currentNum = parseFloat(screen.textContent);
    if (equalsPressed)
    {
        currentNum = lastOperationNum;
    }
    else
    {
        lastOperationNum = currentNum;
    }
    let result = 0;
    switch (mode) {
        case 'add':
            result = lastNum + currentNum;
            break;
        case 'subtract':
            result = lastNum - currentNum;
            break;
        case 'multiply':
            result = lastNum * currentNum;
            break;
        case 'divide':
            if (currentNum == 0) { 
                screen.textContent = 'lmao';
                showResult = true;
                return undefined; }
            result = lastNum / currentNum;
            break;
        case '':
            return;
    }
    let resultString = result.toString();
    if (Math.abs(result) > 9 * Math.pow(10, maxCharacters - 1))
    {
        resultString = 'TOO BIG';
    }
    else if (resultString.length > maxCharacters) {
        resultString = resultString.slice(0, maxCharacters);
        if (resultString.charAt(maxCharacters - 1) === '.')
        {
            resultString = resultString.slice(0, maxCharacters - 1)
        }
    }
    screen.textContent = resultString;
    showResult = true;
    return result;
}

function parseKeyPress(event) {
    let key = event.key;
    let possibleNumber = parseInt(key);
    if (possibleNumber.toString() != 'NaN') { addNumber(possibleNumber); }
    switch (key.toLowerCase())
    {
        case 'backspace':
            event.preventDefault();
            clearMouseDown(); 
            clearNumber(); 
            break;
        case 'delete':
            clearClicked = 0;
            clearNumber();
        case '%':
            toPercent();
            break;
        case '.':
            addDecimal();
            break;
        case 'n':
            toggleNegative();
            break;
        case '+':
            operationButton('add');
            break;
        case '-':
            operationButton('subtract');
            break;
        case '*':
        case 'x':
            operationButton('multiply');
            break;
        case '/':
            event.preventDefault();
            operationButton('divide');
            break;
        case 'enter':
        case '=':
            lastNum = operate();
            equalsPressed = true;
            break;
    }
}

function start() {
    document.querySelectorAll('.number').forEach( element => {
        element.addEventListener('click', e => { addNumber(e.target.id); });
    });
    document.querySelector('#decimal').addEventListener('click', addDecimal);
    document.querySelector('#clear').addEventListener('mousedown', clearMouseDown);
    document.querySelector('#clear').addEventListener('mouseup', clearNumber);
    document.querySelector('#plusMinus').addEventListener('click', toggleNegative);
    document.querySelector('#percent').addEventListener('click', toPercent);
    document.querySelectorAll('.operation').forEach( element => {
        element.addEventListener('click', e => { operationButton(e.target.id); });
    });
    document.querySelector('#operate').addEventListener('click', e => {
        lastNum = operate();
        equalsPressed = true;
    });
    document.addEventListener('keydown', parseKeyPress);
}

window.onload = start