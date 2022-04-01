const body = document.querySelector('body');

const grid = document.createElement('div');
grid.style.width = '378px';
grid.style.height = '378px';
grid.style.border = '1px solid black';
grid.style.margin = '0px auto';
grid.style.display = 'flex';
grid.style.flexWrap = 'wrap';
body.appendChild(grid);
const firstUserClass = 'first-user';
const secondUserClass = 'second-user';
let isFirstUser = true;
const lengthStringWin = 4;

let firstUserCheckedArray = [];
let secondUserCheckedArray = [];

const gameSize = 9;

for (let indexX = 0; indexX < gameSize; indexX++) {
    for (let indexY = 0; indexY < gameSize; indexY++) {
        let div = document.createElement('div');
        div.style.width = '40px';
        div.style.height = '40px';
        div.style.border = '1px solid black';
        div.classList.add('block');
        div.addEventListener('click', click);
        grid.appendChild(div);
    }
}

function click(event) {
    let index = Array.from(grid.childNodes).indexOf(this);
    let isExist = grid.childNodes[index].classList.contains(firstUserClass) ||
        grid.childNodes[index].classList.contains(secondUserClass);

    if (isExist) {
        return;
    }

    while (index < Math.pow(gameSize, 2) - gameSize) {
        isExist = grid.childNodes[index + gameSize].classList.contains(firstUserClass) ||
            grid.childNodes[index + gameSize].classList.contains(secondUserClass);
        if (isExist) {
            break;
        }
        index += gameSize;
    }

    grid.childNodes[index].classList = isFirstUser ? firstUserClass : secondUserClass;
    isFirstUser = !isFirstUser;

    const gameResult = gameCheck(this, index, !isFirstUser);
    console.log(gameResult);
    if (gameResult != undefined && gameResult != '') {
        let length = grid.childNodes.length;
        grid.childNodes.forEach(node => node.removeEventListener('click', click));
        window.alert(gameResult);
    }
}

function gameCheckRow(intArr) {
    const length = intArr.length;
    for (let index = 0; index < length; index++) {
        let isConnectFour = (intArr[index] == intArr[index + 1] + 1)
            && (intArr[index + 1] == intArr[index + 2] + 1)
            && (intArr[index + 2] == intArr[index + 3] + 1);
        if (isConnectFour) {
            return true;
        }
    }
}

function gameCheckCrossRow(intArr) {
    const length = intArr.length;
    for (let index = 0; index < length; index++) {
        let isConnectFour = (intArr[index] == intArr[index + 1] + 1 + gameSize)
            && (intArr[index + 1] == intArr[index + 2] + 1 + gameSize)
            && (intArr[index + 2] == intArr[index + 3] + 1 + gameSize);
        if (isConnectFour) {
            return true;
        }
    }
}

function gameCheckColumn(intArr) {
    const length = intArr.length;
    for (let index = 0; index < length; index++) {
        let isConnectFour = (intArr[index] == intArr[index + 1] + gameSize)
            && (intArr[index + 1] == intArr[index + 2] + gameSize)
            && (intArr[index + 2] == intArr[index + 3] + gameSize);
        if (isConnectFour) {
            return true;
        }
    }
}



function gameCheck(target, index, userType) {

    /* userType
    /   1: first user
    /   2: second user
    */
    if (userType) {
        firstUserCheckedArray.push(index);
        firstUserCheckedArray.sort((a, b) => (b - a));
    } else {
        secondUserCheckedArray.push(index);
        secondUserCheckedArray.sort((a, b) => (b - a));
    }


    if (firstUserCheckedArray.length < 4 && secondUserCheckedArray.length < 4) {
        return;
    }

    if (firstUserCheckedArray.length == 4) {
        return gameCheckRow(firstUserCheckedArray) || gameCheckCrossRow(firstUserCheckedArray) || gameCheckColumn(firstUserCheckedArray) ? 'First User Is Win' : '';
    }

    if (secondUserCheckedArray.length == 4) {
        return gameCheckRow(secondUserCheckedArray) || gameCheckCrossRow(secondUserCheckedArray) || gameCheckColumn(secondUserCheckedArray) ? 'Second User Is Win' : '';
    }
}