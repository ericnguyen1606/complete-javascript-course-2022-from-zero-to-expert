let score = document.getElementById('score');
let time = document.getElementById('time');
let grid = document.getElementById('grid');
let squareArray = [];
let count = 60;
let scoreNumber = 0;
const images = [
    { name: 'white', src: 'image/white.png' },
    { name: 'hotdog', src: 'image/hotdog.png' }
]

function createBoard() {
    const randomIndex = Math.floor(Math.random() * 9);
    score.innerText = scoreNumber;
    time.innerText = count;
    for (let i = 0; i < 9; i++) {
        let image = document.createElement('img');
        image.setAttribute('name-id', i);
        image.style.border = '1px solid black';
        if (randomIndex === i) {
            image.setAttribute('src', images[1].src);
        } else {
            image.setAttribute('src', images[0].src);
        }
        grid.append(image);
        image.addEventListener('click', scoreGame);
    }
};

function scoreGame() {
    let previousWhole = document.querySelector('[src="image/hotdog.png"]');
    if (this.src === previousWhole.src) {
        score.innerText = ++scoreNumber;
    }
}


function gameOver() {
    if (count < 55) {
        clearInterval(timeId);
        clearInterval(countDownTimerId);
        alert('GAME OVER! Your final score is ' + score);
    }
}

function countDown() {
    time.innerText = --count;
    let hitSquare = document.querySelector('[src="image/hotdog.png"]');
    let imageArray = document.querySelectorAll('img');
    const randomIndex = Math.floor(Math.random() * 9);
    hitSquare.src = images[0].src;
    imageArray[randomIndex].src = images[1].src;
}

let countDownTimerId = setInterval(gameOver, 1000);
let timeId = setInterval(countDown, 1000);


function xxx() {
    console.log('Hello World');
}

createBoard();
scoreGame();