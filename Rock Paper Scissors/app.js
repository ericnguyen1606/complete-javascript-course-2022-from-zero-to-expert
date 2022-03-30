const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');

const userChoiceContent = userChoiceDisplay.textContent;
const computerChoiceContent = computerChoiceDisplay.textContent;
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (event) => {
    userChoiceDisplay.textContent = userChoiceContent + event.target.textContent;
    const computerChoice = randomComputerChoice();
    computerChoiceDisplay.textContent = computerChoiceContent + computerChoice;
}));

function randomComputerChoice() {
    let computerChoice;
    const randomChoice = Math.floor(Math.random() * 3 + 1);
    switch (randomChoice) {
        case 1:
            computerChoice = 'Rock';
            break;
        case 2:
            computerChoice = 'Paper';
            break;
        case 3:
            computerChoice = 'Scissors';
            break;
        default:
            computerChoice = '';
            break;
    }
    return computerChoice;
}