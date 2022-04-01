const time = document.querySelector('.time');
const score = document.querySelector('.score');
const grid = document.querySelector('.grid');

const gameSize = 9;
const endPoint = 4;
const startPoint = 76;

const obstacleLogLeft = 'obstacle-log-left';
const obstacleLogRight = 'obstacle-log-right';
const logLeft = 'log-left';
const logRight = 'log-right';

const startBlock = 'start-block';
let timeLeft = 60;
let timmerId;
let count = 0;


function setUpBackgroundGame() {
    grid.style.width = '540px';
    grid.style.height = '540px';
    grid.style.display = 'flex';
    grid.style.border = '1px solid black';
    grid.style.margin = '0 auto';
    grid.style.flexWrap = 'wrap';
    time.innerText = 'Time : 60';
    score.innerText = 'Score : 0';
}

function drawFroggerGame(start, end, backgroundColor, classColor) {
    for (let i = start; i < end; i++) {
        grid.childNodes[i].classList.add(backgroundColor);
        if (i <= start + 2 || (i > start + 4 && i <= start + 7)) {
            grid.childNodes[i].classList.add(classColor);
        }

        if ((i >= start + gameSize + 1 && i <= start + gameSize + 3) || (i > start + gameSize + 5 && i <= start + gameSize + 8)) {
            grid.childNodes[i].classList.add(classColor);
        }
    }
}

function generateFroggerGame() {
    let div;
    for (let i = 0; i < gameSize; i++) {
        for (let j = 0; j < gameSize; j++) {
            div = document.createElement('div');
            div.style.width = '60px';
            div.style.height = '60px';
            grid.appendChild(div);
        }
    }
    grid.childNodes[4].classList.add('ending-block');
    grid.childNodes[76].classList.add('start-block');
    drawFroggerGame(gameSize * 2, gameSize * 4, logLeft, 'obstacle-log-left');
    drawFroggerGame(gameSize * 5, gameSize * 7, logRight, 'obstacle-log-right');
}

function moveObstacleMoveLeft(start = 2, end = 4) {
    let startObstacle = start * gameSize;
    let endObstacle = startObstacle + gameSize;
    const classListFirstNode = [grid.childNodes[startObstacle].classList[0]
        , grid.childNodes[startObstacle].classList[1]];
    for (let index = startObstacle; index < endObstacle - 1; index++) {
        grid.childNodes[index].classList = grid.childNodes[index + 1].classList;
    }

    grid.childNodes[endObstacle - 1].classList.remove(grid.childNodes[endObstacle - 1].classList[0]);
    grid.childNodes[endObstacle - 1].classList.remove(grid.childNodes[endObstacle - 1].classList[0]);
    grid.childNodes[endObstacle - 1].classList.add(classListFirstNode[0]);
    grid.childNodes[endObstacle - 1].classList.add(classListFirstNode[1]);
}

function moveObstacleMoveRight(start = 5, end = 7) {
    let startObstacle = start * gameSize;
    let endObstacle = startObstacle + gameSize;
    const classListLastNode = [grid.childNodes[endObstacle - 1].classList[0]
        , grid.childNodes[endObstacle - 1].classList[1]];
    let temp1 = [grid.childNodes[startObstacle + 1].classList[0], grid.childNodes[startObstacle + 1].classList[1]];
    grid.childNodes[startObstacle + 1].classList = grid.childNodes[startObstacle].classList;
    let temp2;
    for (let index = startObstacle + 2; index < endObstacle; index++) {
        temp2 = [grid.childNodes[index].classList[0], grid.childNodes[index].classList[1]];
        grid.childNodes[index].classList.remove(grid.childNodes[index].classList[0]);
        grid.childNodes[index].classList.remove(grid.childNodes[index].classList[0]);
        grid.childNodes[index].classList.add(temp1[0]);
        grid.childNodes[index].classList.add(temp1[1]);
        temp1 = temp2;
    }

    grid.childNodes[startObstacle].classList.remove(grid.childNodes[startObstacle].classList[0]);
    grid.childNodes[startObstacle].classList.remove(grid.childNodes[startObstacle].classList[0]);
    grid.childNodes[startObstacle].classList.add(classListLastNode[0]);
    grid.childNodes[startObstacle].classList.add(classListLastNode[1]);
}

function startFroggerGame() {
    // move left
    moveObstacleMoveLeft(2, 3);
    moveObstacleMoveLeft(3, 4);
    // move right
    moveObstacleMoveRight(5, 6);
    moveObstacleMoveRight(6, 7);
}

setUpBackgroundGame();
generateFroggerGame();

let timmer = setInterval(startFroggerGame, 500);

document.addEventListener('keydown', userMove);
let user = document.querySelector('.start-block');
let indexOfStartBlock = Array.from(grid.childNodes).indexOf(user);

function userMove(event) {

    switch (event.key) {
        case 'ArrowUp':
            if (indexOfStartBlock - gameSize >= 0) {
                if (grid.childNodes[indexOfStartBlock - gameSize].classList.contains(obstacleLogLeft) ||
                    grid.childNodes[indexOfStartBlock - gameSize].classList.contains(obstacleLogRight)) {
                    clearInterval(timmerId);
                    clearInterval(timmer);
                    window.alert('Game Over');
                } else {
                    grid.childNodes[indexOfStartBlock].classList.remove(startBlock);
                    indexOfStartBlock -= gameSize;
                    grid.childNodes[indexOfStartBlock].classList.add(startBlock);
                    score.innerText = 'Score : ' + (++count);
                }
            }
            break;
        case 'ArrowRight':
            if (indexOfStartBlock >= Math.floor(indexOfStartBlock / gameSize) * gameSize - 1 && indexOfStartBlock < Math.floor(indexOfStartBlock / gameSize) * gameSize + gameSize - 1) {
                grid.childNodes[indexOfStartBlock].classList.remove(startBlock);
                indexOfStartBlock += 1;
                grid.childNodes[indexOfStartBlock].classList.add(startBlock);
            }
            break;
        case 'ArrowLeft':
            if (indexOfStartBlock > Math.floor(indexOfStartBlock / gameSize) * gameSize && indexOfStartBlock <= Math.floor(indexOfStartBlock / gameSize) * gameSize + gameSize - 1) {
                grid.childNodes[indexOfStartBlock].classList.remove(startBlock);
                indexOfStartBlock -= 1;
                grid.childNodes[indexOfStartBlock].classList.add(startBlock);
            }
            break;
        case 'ArrowDown':
            if (indexOfStartBlock + gameSize <= gameSize * gameSize - 1) {
                grid.childNodes[indexOfStartBlock].classList.remove(startBlock);
                indexOfStartBlock += gameSize;
                grid.childNodes[indexOfStartBlock].classList.add(startBlock);
            }
            break;
    }
}

function countDown() {
    if (timeLeft == 0) {
        clearInterval(timmerId);
        clearInterval(timmer);
        window.alert('Game Over');
    }
    time.innerText = 'Time : ' + (--timeLeft);

}


timmerId = setInterval(countDown, 1000);
