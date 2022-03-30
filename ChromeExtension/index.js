let myLeads = [];
const inputEl = document.getElementById('input-el');
const btnEl = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');
const target = '_blank';
let listItems = "";


btnEl.addEventListener('click', function () {
    if (inputEl.value !== '0') {
        myLeads.push(inputEl.value);
        renderFunction();
    }
    inputEl.value = '';
});

function renderFunction() {
    const length = myLeads.length;
    listItems = "";
    for (let i = 0; i < length; i++) {
        listItems += renderLink(myLeads[i]);
    }
    ulEl.innerHTML = listItems;
}

function renderLink(input) {
    return `<li><a href='${input}' target='_blank'>${input}</a></li>`;
}

show = function (t) { console.log(new Date(t).toString()); };
getServertimeFromFacebook = function (cb) {
    ajax("https://api.facebook.com/method/fql.query?query=SELECT+now%28%29+FROM+link_stat+WHERE+url+%3D+%271.2%27&format=json", function (responsetext) {
        var obj = JSON.parse(responsetext);
        var ts = obj[0].anon,
            tms = ts * 1000;
        cb(tms);
    });
};

var isPalindrome = function (x) {
    let reverseX = '';
    const copyX = x;
    while (x >= 1) {
        const y = Math.floor(x) % 10;
        x = x / 10;
        reverseX += y;
    }
    return Number.parseInt(reverseX) === copyX;
};


window.alert(isPalindrome(121));

const favorite = "Java & Javascript";
const course = {
    "name": "Javascript basic!",
    getName: () => {
        return this;
    }
}
