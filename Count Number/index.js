document.getElementById('number').innerHTML = '0';
// const number = document.getElementById('number');
const increseButton = document.querySelector('button');
const number = document.getElementById('number');
const previous = document.getElementById('previous');

increseButton.addEventListener("click", () => {
    this.number.innerHTML = Number.parseInt(number.innerHTML) + 1;
});

save.onclick = () => {
    this.previous.innerHTML = this.previous.innerHTML + "-" + this.number.innerHTML;
};