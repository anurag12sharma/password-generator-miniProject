const slider = document.querySelector(".slider");

let password = "";
let passwordLength = 10;
const lengthDisplay = document.querySelector("[lengthDisplay]");

const indicator = document.querySelector("[indicator]");
const symbols = '~`!@#$%^&*()_-+=[{}]\|;:",<.>/?';

const upperCheck = document.querySelector("#upper");
const lowerCheck = document.querySelector("#lower");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");

const passwordDisplay = document.querySelector(".display");
const copyBtn = document.querySelector("[copyBtn]");
const copyMsg = document.querySelector("[copyMsg]");

let count = 0;
const allCheckbox = document.querySelectorAll("input[type=checkbox]");

const generateBtn = document.querySelector("[generate-btn]");

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

function getSymbol(){
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

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
}

slider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
})

function countChecks(){
    count = 0;
    allCheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
            count++;
    });

    if(passwordLength<count){
        passwordLength = count;
        handleSlider();
    }
}

allCheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',countChecks);
})

function shuffle(array){
    for(let i=array.length-1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((val)=>{str+=val});
    return str;
}

generateBtn.addEventListener('click',()=>{
    if (count==0)
        return;
    
    password = "";

    let funcArr = [];

    if(upperCheck.checked)
        funcArr.push(getUpperCase);
    
    if(lowerCheck.checked)
        funcArr.push(getLowerCase); 
    
    if(symbolCheck.checked)
        funcArr.push(getSymbol);
    
    if(numberCheck.checked)
        funcArr.push(getRandomNumber);

    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }

    for(let i=0; i<passwordLength-funcArr.length; i++){
        let ind = getRandomInteger(0,funcArr.length);
        password += funcArr[ind]();
    }

    password = shuffle(Array.from(password));

    passwordDisplay.value = password;

    calStrength();

});
