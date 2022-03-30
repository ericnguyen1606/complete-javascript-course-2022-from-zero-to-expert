const cards = [
    {
        name: "blank",
        link: "images/blank.png"
    },
    {
        name: "cheeseburger",
        link: "images/cheeseburger.png"
    },
    {
        name: "fries",
        link: "images/fries.png"
    },
    {
        name: "hotdog",
        link: "images/hotdog.png"
    },
    {
        name: "ice-cream",
        link: "images/ice-cream.png"
    },
    {
        name: "milkshake",
        link: "images/milkshake.png"
    },
    {
        name: "pizza",
        link: "images/pizza.png"
    },
    {
        name: "white",
        link: "images/white.png"
    }
]

const gameSize = document.getElementById('gameSize');
let grid = document.getElementById('grid');
let scoreNotify = document.getElementById('score');
let score = 0;
let generateCards = [];
const cardSize = '300';
const cardsLength = cards.length;
const gameSizeDefault = 7;
const defaultIndex = 0;
const enterKeyword = 13;

gameSize.addEventListener("keyup", (event) => {
    if (event.code === enterKeyword) {
        createBoard();
        grid.innerHTML = cards;
    }
});

function createCard() {
    const card = document.createElement('img');
    card.style.width = cardSize;
    return card;
}

(function createBoard() {
    for (let i = 1; i < gameSizeDefault; i++) {
        for (let j = 0; j < 2; j++) {
            let card = createCard();
            card.setAttribute('src', cards[defaultIndex].link);
            card.setAttribute('data-id', i);
            card.setAttribute('is-open', false);
            generateCards.push(card);
        }
    }
    randomCards();
    generateCards.forEach((card) => grid.append(card));
})();

function randomCards() {
    generateCards.sort(() => 0.5 - Math.random() * 1);
}

function generateGame(size) {
    for (let i = 0; i < size; i++) {
        let card = createCard();
        card.setAttribute('src', cards[i]);
        cards.push(card);
    }
}

let cardChoosen = [];
let numberOfChoosen = 0;
document.querySelectorAll('img').forEach((image) => {
    image.addEventListener('click', () => {
        let isDeleted = false;

        cardChoosen.push(image);
        const index = image.getAttribute('data-id');
        image.setAttribute('is-open', true);
        image.setAttribute('src', cards[index].link);

        console.log(cardChoosen);
        if (cardChoosen[1] !== 'undefined' && cardChoosen[1].src === cardChoosen[0].src) {
            setTimeout(function () {
                const isOpenImage = image.getAttribute('is-open');
                // click đúng image cần tìm
                if (isOpenImage === 'true') {
                    grid.removeChild(cardChoosen[0]);
                    grid.removeChild(cardChoosen[1]);
                    scoreNotify.innerHTML = ++score;
                    isDeleted = true;
                    cardChoosen = [];
                }
            }, 1000);
        }

        setTimeout(function () {
            if (cardChoosen.length !== 1 && !isDeleted) {
                cardChoosen[0].setAttribute('is-open', false);
                cardChoosen[0].setAttribute('src', cards[defaultIndex].link);
                cardChoosen[1].setAttribute('is-open', false);
                cardChoosen[1].setAttribute('src', cards[defaultIndex].link);
                cardChoosen = [];
            }
        }, 1000);

        console.log(grid.childElementCount);
        setTimeout(function () {
            if (grid.childElementCount === 2) {
                window.alert('Game Over');
            }
        }, 1000);

    });
});

// 1. chỉ 2 hình ảnh được mở cùng 1 lúc 
// 2. Nếu 2 ảnh có cùng data-id thì xóa sự kiện và đặt hình ảnh mặc định
function playGame() {



}
