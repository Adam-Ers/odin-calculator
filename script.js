const screen = document.querySelector('#screen');

const maxCharacters = 9;
const clearLongPressDelay = 1000;
let clearClicked = 0;

function addNumber(num) {
    if (screen.textContent == '0')
    {
        screen.textContent = num;
    }
    else
    {
        if (screen.textContent.length >= maxCharacters)
        {
            screen.textContent = screen.textContent.slice(1, maxCharacters);
        }
        screen.textContent += num;
    }
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

function start() {
    document.querySelectorAll('.number').forEach( element => {
        element.addEventListener('click', e => { addNumber(e.target.id); });
    });
    document.querySelector('#clear').addEventListener('mousedown', clearMouseDown);
    document.querySelector('#clear').addEventListener('mouseup', clearNumber);
    document.querySelector('#plusMinus').addEventListener('click', toggleNegative);
}

window.onload = start