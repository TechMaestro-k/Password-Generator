const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwaordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMSg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols='`~!@#$%^&*()-_+={}[];,."/:<>?\|'



let password="";
let passwordLength=10;
let checkCount=0 ;
setIndicator("#ccc")
handleSlider();

//set password length
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;

    const min=inputSlider.min;
    const max=inputSlider.max;

    inputSlider.style.backgroundSize=(((passwordLength-min)*100)/(max-min)) +"% 100%"
}


function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;


}

function getRndNumber(min,max){
    return Math.floor(Math.random() * (max-min))+min;
}

function generateNumber(){
    return getRndNumber(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndNumber(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndNumber(65,91));
}

function generateSymbol(){
    const RandNum=getRndNumber(0,symbols.length)
    return symbols.charAt(RandNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numberCheck.checked) hasNum = true;
    if (symbolCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
    } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
    ) {
    setIndicator("#ff0");
    } else {
    setIndicator("#f00");
    }
}


async function copycontent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="failed";
    }

    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout(() =>{
        copyMsg.classList.remove("active");
    },2000 );
}

inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value
    handleSlider();
})


copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    {
        copycontent();
    }
})
function handleCheckboxChange(){
    checkCount=0
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
        {
            checkCount++;
        }
    })

    if(passwordLength < checkCount)
    {
        passwordLength=checkCount
        handleSlider();
    }
}
allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckboxChange)
});

function shufflepassword(array){
    for(let i=Array.length-1;i>0;i--)
    {
        // get random j
        const j=Math.floor(Math.random() * (i+1))
        //swap
        const temp=arr[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str=""
    array.forEach((e)=>(str+=e))
    return str;

}


generateBtn.addEventListener('click',()=>{
    if(checkCount<=0) return;//none of the check box are checked
    
    //special case
    if(passwordLength<checkCount)
    {
        passwordLength=checkCount
        handleSlider()
    }


    //creating new password

    //remove old password
    password=""

    //put checked case
//     if(uppercaseCheck.checked)
//     {
//         password += generateUpperCase();
//     }
//     if(lowercaseCheck.checked)
//     {
//         password += generatelowerCase();
//     }

//     if(numberCheck.checked)
//     {
//         password += generateNumber();
//     }

//     if(symbolCheck.checked)
//     {
//         password += generateSymbol();
//     }
//
    let funArr=[];
    if(uppercaseCheck.checked)
        funArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funArr.push(generateLowerCase);
    
    if(numberCheck.checked)
        funArr.push(generateNumber);

    if(symbolCheck.checked)
        funArr.push(generateSymbol);


    //compulsary addition
    for(let i=0;i<funArr.length;i++){
        password += funArr[i]()
    }

    for(let i=0;i<passwordLength-funArr.length;i++){
        let random=getRndNumber(0,funArr.length);
        password += funArr[random]();
    }

    password=shufflepassword(Array.from(password));

    passwordDisplay.value=password;

    calcStrength();
})