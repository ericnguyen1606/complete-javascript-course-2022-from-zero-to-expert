let grid = document.getElementById('grid');
let score = document.getElementById('score');
let timeLeft = document.getElementById('time-left');
let squareArray = [];
let timerId = null;
let hitSquare = null;
let targetSquare = null;
let count = 0;
let countDownTimerId = null;
let timmer = 60;

function createSquare() {
    let square = null;
    const squaresIndex = Math.floor(Math.random() * 8);
    for (let i = 0; i < 8; i++) {
        square = document.createElement('img');
        square.style.width = '100px';
        square.style.height = '100px';
        square.style.border = '1px solid black';
        square.setAttribute('name', i);
        squareArray.push(square);
        grid.appendChild(square);
    }
    targetSquare = squareArray[squaresIndex];
    squareArray[squaresIndex].classList.add('target-quare');
    timeLeft.innerText = timmer;
}

createSquare();

function randomSquare() {
    let randomSquareIndex = Math.floor(Math.random() * 8);
    while (randomSquareIndex === Number.parseInt(targetSquare.name)) {
        randomSquareIndex = Math.floor(Math.random() * 8);
    }
    targetSquare.classList.remove('target-quare');
    squareArray[randomSquareIndex].classList.add('target-quare');
    targetSquare = squareArray[randomSquareIndex];
}

function checkScore() {
    hitSquare = this;
    if (hitSquare.name === targetSquare.name) {
        score.innerText = ++count;
    }
}

squareArray.forEach((square, index) => {
    square.addEventListener('click', checkScore);
});


function moveMole() {
    timerId = setInterval(randomSquare, 1000);
}

function countDown() {
    timeLeft.innerText = --timmer;
    if (timmer < 51) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        squareArray.forEach((square, index) => {
            square.removeEventListener('click', checkScore);
        });
    }
}
countDownTimerId = setInterval(countDown, 1000);

moveMole();