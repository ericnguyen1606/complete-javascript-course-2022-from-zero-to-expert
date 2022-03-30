$(document).ready(() => {
    const getAllSeller = document.getElementById('get-all-seller');
    const showAllSeller = document.getElementById('show-all-seller');
    const emailContent = document.getElementById('email-content');
    const sendEmail = document.getElementById('send-email');
    const sellers = [];

    getAllSeller.addEventListener("click", getAllSellerFunction);
    showAllSeller.addEventListener("click", displayAllSeller);

    function getAllSellerFunction() {
        Array.from(document.querySelectorAll('[class="styles__box--2Ufmy styles__text--23E5U styles__body2--2dvwJ styles__nowrap--33UtL styles__display-block--3kWC4"]')).forEach(seller => {
            sellers.push(seller.innerText);
            console.log(seller.innerText);
        });
    }

    function displayAllSeller() {
        window.alert(document.querySelectorAll('[class="styles__box--2Ufmy styles__text--23E5U styles__body2--2dvwJ styles__nowrap--33UtL styles__display-block--3kWC4"]').length);
    }
});