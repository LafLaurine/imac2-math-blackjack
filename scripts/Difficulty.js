function clickHandlerEasy() {
    localStorage.setItem('difficulty', 'easy')
}

function clickHandlerNormal() {
    localStorage.setItem('difficulty', 'normal')

}

function clickHandlerHard() {
    localStorage.setItem('difficulty', 'hard')
}

let easyElement = document.getElementById('easy');
let normalElement = document.getElementById('normal');
let hardElement = document.getElementById('hard');


if (easyElement !== null && normalElement !== null && hardElement !== null) {
    easyElement.addEventListener('click', clickHandlerEasy);
    normalElement.addEventListener('click', clickHandlerNormal);
    hardElement.addEventListener('click', clickHandlerHard);
}