const slider = document.querySelector(".slider");

let password = "";
let passwordLength = 10;
const lengthDisplay = document.querySelector("[lengthDisplay]");

const indicator = document.querySelector("[indicator]");
const symbols = '~`!@#$%^&*()_-+=[{}]\|;:",<.>/?';

const upperCheck = document.querySelector("#upper");
const lowerCheck = document.querySelector("lower");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");

const passwordDisplay = document.querySelector(".display");
const copyMsg = document.querySelector("[copyMsg]");

handleSlider();
// sets the password length
function handleSlider(){
    slider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color){
     indicator.style.backgroundColor = color;
}

function getRandomInteger(min,max){
    return Math.floor(Math.random()* (max-min)) + min;
}

function getRandomNumber(){
    return getRandomInteger(0,9);
}

function getLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

function getUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}

function generateSymbol(){
    const randNum = getRandomInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calStrength(){
    let hasNumber = false;
    let hasUpper = false;
    let hasLower = false;
    let hasSymbol = false;

    if(upperCheck.checked) hasUpper = true;
    if(lowerCheck.checked) hasLower = true;
    if(numberCheck.checked) hasNumber = true;
    if(symbolCheck.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength>=8){
        setIndicator("#0f0");
    }
    else if((hasLower || hasUpper) && (hasNumber || hasSymbol) && passwordLength>=6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }

    catch(e){
        copyMsg.innerText = "failed";
    }

    copyMsg.classList.add("active");
}