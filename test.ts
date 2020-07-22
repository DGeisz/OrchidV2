// import * as $ from "jquery";

let element = document.getElementById('yanger');
element.innerText = 'Yotii';
setTimeout(() => {
    document.getElementById('yanger').innerHTML = 'Yoger';
}, 3000);

// $("#input").text('hey there buddy')
let input = document.getElementById("input");
input.innerText = 'gree';
document.addEventListener('keypress', (e) => {
    console.log(e.key);
    input.innerText += e.key + ' ' + e.code;
});