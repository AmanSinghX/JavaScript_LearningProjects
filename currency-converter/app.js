const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button"); // searching for button in form 
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns) {
    for(currCode in countryList) {
        // this is basically adding all the country code in the dropdown
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR") {
            newOption.selected = "selected"; // at the beginning, they will be USD and INR, then they can be changed
        }
        select.append(newOption); // we are appending them in both the dropdowns
    }   
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}   

const  updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal <1) {
        amtVal = 1;
        amount.value = "1";
    }
    console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    //rate = URL[fromCurr][toCurr];
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);

    let finalAmount = amtVal*rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};



const updateFlag = (element) => { // this element that we are getting is actually select
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; 
    let img = element.parentElement.querySelector("img"); // we are going to the parent of select and then finding img
    img.src = newSrc;
};

btn.addEventListener("click",  (evt) => {
    evt.preventDefault(); // we do not want any default behaviour of form
    updateExchangeRate();
});



window.addEventListener("load", () => {
    updateExchangeRate();
});