let playerSelection = prompt("Rock Paper Scissors");
// let playerSelection = "Rock";
const computerChoice = ["Rock", "Paper", "Scissors"];
let playerWin = 0;
let computerWin = 0;



function getComputerChoice() {
    return computerChoice[Math.floor(Math.random() * computerChoice.length)]
}

let computerSelection = getComputerChoice();

function playRound(playerSelection, computerSelection) {
    if (computerSelection == "Rock" && playerSelection == "Rock" ||
        computerSelection == "Scissors" && playerSelection == "Scissors" ||
        computerSelection == "Paper" && playerSelection == "Paper") {

            return alert("Tied " + computerSelection + " is tied with " + playerSelection);
        // return "Tied " + computerSelection + " is tied with " + playerSelection;
    }
    else if (
        playerSelection == "Rock" && computerSelection == "Scissors" ||
        playerSelection == "Scissors" && computerSelection == "Paper" ||
        playerSelection == "Paper" && computerSelection == "Rock") {
        playerWin++;
        return alert(" You Win " + playerSelection + " defeats " + computerSelection);
        // return "You Win " + playerSelection + " defeats " + computerSelection;
    } else (
        playerSelection == "Rock" && computerSelection == "Paper" ||
        playerSelection == "Scissors" && computerSelection == "Rock" ||
        playerSelection == "Paper" && computerSelection == "Scissors"
    )
    computerWin++;
    return alert( "You Lost " + computerSelection + " defeats " + playerSelection);
    // return "You Lost " + computerSelection + " defeats " + playerSelection;
}

for (let i=0;i<5;i++){
    playRound();
}


console.log("Computer picked " + computerSelection);
console.log("You Picked " + playerSelection);
console.log(playRound());
console.log(playerWin);
console.log(ComputerWin)