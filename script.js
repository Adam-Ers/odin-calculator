const screen = document.querySelector('#screen');

const max_characters = 9;

function add_number(num) {
    if (screen.textContent == '0')
    {
        screen.textContent = num;
    }
    else
    {
        if (screen.textContent.length >= max_characters)
        {
            screen.textContent = screen.textContent.slice(1, max_characters);
        }
        screen.textContent += num;
    }
}

function start() {
    document.querySelectorAll('.number').forEach( element => {
        element.addEventListener('click', e => { add_number(e.target.id); });
    })
}

window.onload = start