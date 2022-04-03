const body = document.querySelector('body');
const score = document.querySelector('.score');

const grid = document.createElement('div');
grid.style.width = '600px';
grid.style.height = '600px';
grid.style.border = '1px solid black';
grid.style.margin = '0px auto';
grid.style.display = 'flex';
grid.style.flexWrap = 'wrap';

let invadersId;
let bulletId;
const invadarClass = 'invadar';
const shooterClass = 'shooter';
const bulletClass = 'bullet';

body.appendChild(grid);
let isMovedRight = true;

const gameSize = 15;
let indexOfShooter = 218;
let count = 0;

let alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8
    , 15, 16, 17, 18, 19, 20, 21, 22, 23
    , 30, 31, 32, 33, 34, 35, 36, 37, 38
    , 45, 46, 47, 48, 49, 50, 51, 52, 53
]

let alienShooter = [];

function draw(array, className) {
    if (alienInvaders.length === 0) {
        clearInterval(invadersId);
        clearInterval(bulletId);
        window.alert('Game Over!!!');
    }
    let length = array.length;
    for (let index = 0; index < length; index++) {
        if (className === bulletClass) {
            if (grid.childNodes[array[index]].classList.contains(invadarClass)) {
                grid.childNodes[array[index]].classList.remove(invadarClass);
                const indexAlienInvaders = alienInvaders.indexOf(array[index]);
                const indexAlienShooter = alienShooter.indexOf(array[index]);
                alienInvaders.splice(indexAlienInvaders, 1);
                alienShooter.splice(indexAlienShooter, 1);
                --index;
                --length;
                score.innerHTML = 'Your score: ' + (++count);
                continue;
            }
        }
        grid.childNodes[array[index]].classList.add(className);
    }
}

function createBoard() {
    for (let index = 0; index < gameSize * gameSize; index++) {
        const square = document.createElement('div');
        square.style.width = '40px';
        square.style.height = '40px';

        if (index == indexOfShooter) {
            square.classList.add('shooter');
        }
        grid.appendChild(square);
    }
}

createBoard();
draw(alienInvaders, invadarClass);

function moveInvadar() {
    const invadarBlock = document.querySelectorAll('.' + invadarClass);
    invadarBlock.forEach(node => node.classList.remove(invadarClass));

    const length = alienInvaders.length;
    if (alienInvaders[length - 1] > 209) {
        clearInterval(invadersId);
        window.alert('Game Over');
    }
    if (alienInvaders[length - 1] % gameSize === gameSize - 1) {
        alienInvaders.forEach((item, index) => alienInvaders[index] += gameSize);
        isMovedRight = false;
    }

    if (alienInvaders[0] % gameSize === 0) {
        alienInvaders.forEach((item, index) => alienInvaders[index] += gameSize);
        isMovedRight = true;
    }

    if (isMovedRight) {
        for (let index = 0; index < length; index++) {
            alienInvaders[index] += 1;
        }
    } else {
        for (let index = 0; index < length; index++) {
            alienInvaders[index] -= 1;
        }
    }
    draw(alienInvaders, invadarClass);
}

invadersId = setInterval(moveInvadar, 1000);

document.addEventListener('keydown', moveShooter);

function moveShooter(event) {
    document.querySelector('.' + shooterClass).classList.remove(shooterClass);
    switch (event.code) {
        case 'ArrowUp':
            if (indexOfShooter > 14) {
                indexOfShooter -= gameSize;
            }
            break;
        case 'ArrowDown':
            if (indexOfShooter < 209) {
                indexOfShooter += gameSize;
                grid.childNodes[indexOfShooter].classList.add(shooterClass);
            }
            break;
        case 'ArrowLeft':
            if (indexOfShooter % gameSize > 0)
                indexOfShooter -= 1;
            break;
        case 'ArrowRight':
            if (indexOfShooter % gameSize < 14) {
                indexOfShooter += 1;
            }
            break;
        case 'Space':
            alienShooter.push(indexOfShooter);
            break;
    }
    grid.childNodes[indexOfShooter].classList.add(shooterClass);
}

bulletId = setInterval(moveBullet, 500);

function moveBullet() {
    let length = alienShooter.length;

    if (length !== 0) {
        const bulletBlock = document.querySelectorAll('.' + bulletClass);
        if (bulletBlock !== null)
            bulletBlock.forEach((item) => item.classList.remove(bulletClass));
    }
    for (let index = 0; index < length; index++) {
        if (alienShooter[index] - gameSize > 0)
            alienShooter[index] -= gameSize;
        else {
            alienShooter.shift();
        }
    }



    draw(alienShooter, bulletClass);
}

function findCommonElements(invadarBlock, bulletBlock) {
    let invadarBlockLength = invadarBlock.length;
    let bulletBlockLength = bulletBlock.length;
    let middleInvadarBlock = invadarBlockLength / 2;
    while (invadarBlock[middleInvadarBlock] < bulletBlock[bulletBlockLength - 1]) {
        middleInvadarBlock = middleInvadarBlock / 2;
    }

}
