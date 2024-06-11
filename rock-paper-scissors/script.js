let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice"); // we are selecting all the divs inside the choices, rock-paper-scissor
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"]; // options in the form of array
    // rock, paper,scissors -> random selection
    // Math.floor(Math.random()); // this will give the floor value // Math is a class in JavaScript, generates between 0 to 1,
    // we multiply it with 2 so that we can get values between 0 to 2
    const randIdx = Math.floor(Math.random()*3);
    return options[randIdx];

};

const drawGame = () => {
    msg.innerText = "Game was draw. Play Again!";
    msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lose! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor= "red";
    }
};
 
const playGame = (userChoice) => {
    console.log("user choice = ", userChoice);
    //Generate computer choice
    const compChoice = genCompChoice();
    console.log("comp choice = ", compChoice);

    if(userChoice === compChoice) {
        //Draw Game
        drawGame();
    } else {
        let userWin = true;
        if(userChoice === "rock") {
            // compChoice would have been scissors, paper otherwise it would have been drawn
            userWin = compChoice === "paper" ? false : true;
        } else if(userChoice === "paper") {
            // compChoice would have been rock, scissors
            userWin = compChoice === "scissors" ? false : true;
        } else {
            // user is left with scissors, compChoice would have been rock, paper
            userWin = compChoice=== "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }

};

choices.forEach((choice) => {
    // console.log(choice); // print div for each individual choice
    choice.addEventListener("click", () => {
        const userChoice= choice.getAttribute("id");
        // console.log("choice was clicked" , userChoice);
        playGame(userChoice);
    })
});