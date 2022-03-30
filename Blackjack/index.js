let title = document.getElementById('title');
let notify = document.getElementById('notify');
let cards = document.getElementById('cards');
let sum = document.getElementById('sum');
const startGame = document.getElementById('start_game');
const newCard = document.getElementById('new_card');
let isAlive = false;
let message;

startGame.addEventListener("click", function () {

    if (!isAlive && sum.textContent !== '') {
        cards.textContent = 'Cards :';
        sum.textContent = '';
    } else if (!isAlive) {
        isAlive = true;
        const randomCard = Math.floor((Math.random() * 13) + 1);
        cards.textContent += randomCard;
        sum.textContent += randomCard;
    } else {
        window.alert("Game's starting!");
    }
});

newCard.addEventListener("click", function () {
    if (isAlive) {
        const randomCard = Math.floor((Math.random() * 13) + 1);
        if (randomCard < 11 && randomCard > 1) {
            sum.textContent = Number.parseInt(sum.textContent) + Number.parseInt(randomCard);
        }
        cards.textContent += " " + randomCard;
    }

    if (Number.parseInt(sum.textContent) === 21) {
        isAlive = false;
        message = 'You win!';
    } else if (Number.parseInt(sum.textContent) < 21) {
        message = 'Do you want to new card ?';
    } else {
        isAlive = false;
        message = 'You lose!';
    }

    if (!Number.isNaN(Number.parseInt(sum.textContent))) {
        notify.textContent = message;
    }
});

