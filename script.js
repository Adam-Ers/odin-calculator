const screen = document.querySelector('#screen');

const maxCharacters = 9;
const clearLongPressDelay = 500;
let clearClicked = 0;

function addNumber(num) {
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
    if (Date.now() - clearClicked >= clearLongPressDelay) { screen.textContent = '0'; }
    else {
        screen.textContent = screen.textContent.slice(0, screen.textContent.length - 1);
    }
}

function toggleNegative()
{
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

function start() {
    document.querySelectorAll('.number').forEach( element => {
        element.addEventListener('click', e => { addNumber(e.target.id); });
    });
    document.querySelector('#decimal').addEventListener('click', addDecimal);
    document.querySelector('#clear').addEventListener('mousedown', clearMouseDown);
    document.querySelector('#clear').addEventListener('mouseup', clearNumber);
    document.querySelector('#plusMinus').addEventListener('click', toggleNegative);
    document.querySelector('#percent').addEventListener('click', toPercent);
}

window.onload = start