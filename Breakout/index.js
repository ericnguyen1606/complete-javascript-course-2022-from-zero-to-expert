const grid = document.querySelector('.grid');

const gridWidth = 560;
const gridHeight = 300;
const blockWidth = 100;
const blockHeight = 20;
const userStartPosition = [230, 20];
let currentUserPostition = userStartPosition;
const ballStartPosition = [270, 50];
let currentBallPostition = ballStartPosition;
const ballWidth = 20;
const ballHeight = 20;
let timmerId;
const ballWidthChange = 5;
const ballHeightChange = 5;
const userXMove = 5;
const userYMove = 5;
const unit = 'px';
let xPastPosition = ballStartPosition[0];
let yPastPosition = ballStartPosition[1];
let xCurrentUser;
let blockArray = document.getElementsByClassName('block');
let score = document.querySelector('.score');
let count = 0;
let isGameOver = false;

const user = document.createElement('div');
const ball = document.createElement('div');

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockHeight, yAxis + blockHeight]
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)
]
const ceilBlock = 280;

function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + unit;
        block.style.bottom = blocks[i].bottomLeft[1] + unit;
        grid.appendChild(block);
    }
}

function addUser() {
    user.classList.add('user');
    user.style.left = userStartPosition[0] + unit;
    user.style.bottom = userStartPosition[1] + unit;
    grid.append(user);
}

function drawBall() {
    ball.classList.add('ball');
    ball.style.left = ballStartPosition[0] + unit;
    ball.style.bottom = ballStartPosition[1] + unit;
    ball.style.width = ballWidth + unit;
    ball.style.height = ballHeight + unit;
    grid.appendChild(ball);
}

function moveUser(event) {
    const user = document.querySelector('[class="user"]');
    xCurrentUser = Number.parseInt(user.style.left);
    if (event.key === 'ArrowRight' && xCurrentUser < gridWidth - blockWidth) {
        user.style.left = xCurrentUser + userXMove + unit;
    }

    if (event.key === 'ArrowLeft' && xCurrentUser > 0) {
        user.style.left = xCurrentUser - userXMove + unit;
    }
}

let startGame = true;
let isCollision = false;
let isUpRight = false;
let isUpLeft = true;
let isDownLeft = false;
let isDownRight = false;

let left;
let right;
let height;
let xIntersectionPoint;
let yIntersectionPoint;
let position = [];

function moveBall() {
    const ball = document.querySelector('[class="ball"]');
    let xCurrentBall = Number.parseInt(ball.style.left);
    let yCurrentBall = Number.parseInt(ball.style.bottom);
    xPastPosition = xCurrentBall;
    yPastPosition = yCurrentBall;
    currentUserPostition = Number.parseInt(document.querySelector('[class="user"]').style.left);

    if (yCurrentBall == 0 || isGameOver) {
        clearInterval(timmerId);
        window.alert('Game Over!');
        isUpRight = false;
        isUpLeft = false;
        isDownLeft = false;
        isDownRight = false;
    }
    // 
    xIntersectionPoint = xCurrentBall;
    yIntersectionPoint = yCurrentBall + ballHeight;
    // play game
    for (let blockIndex = 0; blockIndex < blockArray.length; blockIndex++) {
        // position of block
        position = blockArray[blockIndex].style.cssText.split(';');
        xMin = Number.parseInt(position[0].split(' ')[1]);
        xMax = xMin + blockWidth;
        height = Number.parseInt(position[1].split(' ')[2]);
        if ((yIntersectionPoint == height || yIntersectionPoint - ballHeight == height) && (xIntersectionPoint >= xMin && xIntersectionPoint <= xMax)) {
            grid.removeChild(blockArray[blockIndex]);
            count++;
            score.innerText = 'Score : ' + count;
            if (blockArray.length == 0) {
                isGameOver = true;
            }
        }
    }

    if (isUpLeft) {
        ball.style.left = xCurrentBall - ballWidthChange + unit;
        ball.style.bottom = yCurrentBall + ballHeightChange + unit;
        xCurrentBall = Number.parseInt(ball.style.left);
        yCurrentBall = Number.parseInt(ball.style.bottom);
        if (xCurrentBall == 0) {
            isUpLeft = false;
            isUpRight = true;
        }
        if (yCurrentBall == ceilBlock) {
            isUpLeft = false;
            isDownLeft = xPastPosition > xCurrentBall && yPastPosition < yCurrentBall ? true : false;
            isDownRight = xPastPosition < xCurrentBall && yPastPosition < yCurrentBall ? true : false;
        }
    }
    if (isDownLeft) {
        ball.style.left = xCurrentBall - ballWidthChange + unit;
        ball.style.bottom = yCurrentBall - ballHeightChange + unit;
        xCurrentBall = Number.parseInt(ball.style.left);
        yCurrentBall = Number.parseInt(ball.style.bottom);
        if (xCurrentBall == 0) {
            isDownLeft = false;
            // 1: downRight
            isDownRight = true;
        }
    }

    if (isDownRight) {
        ball.style.left = xCurrentBall + ballWidthChange + unit;
        ball.style.bottom = yCurrentBall - ballHeightChange + unit;
        xCurrentBall = Number.parseInt(ball.style.left);
        yCurrentBall = Number.parseInt(ball.style.bottom);

        if (xCurrentBall == gridWidth - ballWidth) {
            isDownRight = false;
            isDownLeft = true;
        }
    }
    if (yCurrentBall == userStartPosition[1] + blockHeight && xCurrentBall >= xCurrentUser && xCurrentBall <= xCurrentUser + blockWidth) {
        isUpRight = isDownRight ? true : false;
        isUpLeft = isDownLeft ? true : false;
        isDownRight = false;
        isDownLeft = false;
    }

    if (isUpRight) {
        ball.style.left = xCurrentBall + ballWidthChange + unit;
        ball.style.bottom = yCurrentBall + ballHeightChange + unit;
        xCurrentBall += ballWidthChange;
        yCurrentBall += ballHeightChange;
        xCurrentBall = Number.parseInt(ball.style.left);
        yCurrentBall = Number.parseInt(ball.style.bottom);
        if (xCurrentBall >= gridWidth - ballWidth) {
            isUpRight = false;
            isUpLeft = true;
        }

        if (yCurrentBall == ceilBlock) {
            isUpRight = false;
            // 1: downRight
            isDownRight = true;
        }
    }
}

addBlocks();
addUser();
drawBall();

document.addEventListener('keydown', moveUser);
timmerId = setInterval(moveBall, 100);