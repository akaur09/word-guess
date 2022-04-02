// what needs to be done?
// button to start game
    // button element in html
// create a timer
    // timer starts when button is pressed (add event listner connected to the start button)
    // ends game if word is not guessed
    // timer resets when start button is clicked again
// create a variable of words- array of words in game
    // change from actual letter to blank underline and vice versa
    // loop that takes word into the blank spaces in game
    // iterate through the word and place correct letter in correct spot
    // if wrong, then no return
    // game done when either timer runs out or the word is guessed correctly
// wins and losses
    //  intially set to zero
    // increment based on results
    // store those values on local storage
    // display message (alert)
// use key event
// use keyboard event
// use array
// loops and iteration
// setInterval
// use localStorage


//variables needed:
var wordBlanks = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerEl = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var chooseWord = "";
var numBlanks = 0;
var winCount = 0;
var lossCount = 0;
var isWin = false;
var timer;
var timeLeft;

//variables for creating game word and blanks
var lettersInWord = [];
var blanksLetters = [];

//Array of words to be used in the game
var gameWords = ["function", "array", "concatenate", "parse", "integer", "boolean", "console"];

//init function when page loads
function init() {
    getWins();
    getLosses();
}

//function to start the game by pressing start game button
function startGame () {
    win = false;
    timeLeft = 10;
    //prevent start button from being pressed during ongoing game
    startButton.disabled = true;
    renderBlanks()
    startTimer()
}

//this function is called when its a win
function winGame () {
    wordBlanks.textContent = "Congratulations, You Won!";
    winCount++
    startButton.disabled = false;
    setWins ()
}

//this function is called when its a loss
function loseGame () {
    wordBlanks.textContent = "You lose, Game Over!";
    lossCount++
    startButton.disabled = false;
    setLosses ()
}

//this function starts and stops the timer and triggers either winGame() of loseGame ()
function startTimer () {
    //sets the timer
    timer = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft >= 0) {
            //test if win
            if (isWin && timeLeft > 0) {
                //cleas interval and stops timer
                clearInterval(timer);
                winGame();
            }
        }
        //test if time is up
        if (timeLeft === 0) {
            //clears interval
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

//create blanks
function renderBlanks () {
    //pick random word from words array
    chooseWord = gameWords[Math.floor(Math.random() * gameWords.length)];
    lettersInWord = chooseWord.split("");
    numBlanks = lettersInWord.length;
    blanksLetters = []
    //use for loop to push blanks to blanksLetters array
    for (var i = 0; i < numBlanks; i++) {
        blanksLetters.push("_");
    }
    //convert blanksLetters array into string and render to screen
    wordBlanks.textContent = blanksLetters.join(" ")
}

//update win count on screen and saves to storage
function setWins () {
    win.textContent = winCount;
    localStorage.setItem("winCount", winCount);
}

//update lose count on screen and saves to storage
function setLosses() {
    lose.textContent = lossCount;
    localStorage.setItem("lossCount", lossCount);
}

//functions used by the init function
function getWins() {
    //get stored value of wins if it exists
    var savedWins = localStorage.getItem("winCount");
    //if no stored wins, set counter to 0
    if (savedWins === null) {
        winCount = 0;
    } else {
        //if a value is stored, set to that value
        winCount = savedWins;
    }
    //render to page
    win.textContent = winCount;
}

function getLosses() {
    var savedLosses = localStorage.getItem("lossCount");
    if (savedLosses === null) {
        lossCount = 0;
    } else {
        lossCount = savedLosses;
    }
    lose.textContent = lossCount;
}

function checkWin () {
    //if the word is equal to the blanksLetters array when converted to a string, set isWin to true
    if (chooseWord === blanksLetters.join("")) {
        //This value is used in the timer function to test if win condition is met
        isWin = true;
    }
}

//tests if player guess is correct, then renders to screen
function checkLetters(letter) {
    var wordLetter = false;
    for (var i = 0; i < numBlanks; i++) {
        if (chooseWord[i] === letter) {
            wordLetter = true;
        }
    }
    if (wordLetter) {
        for (var j = 0; j < numBlanks; j++) {
            if (chooseWord[j] === letter) {
                blanksLetters[j] = letter;
            }
        }
        wordBlanks.textContent = blanksLetters.join(" ");
    }
}

//Attach event listener for keyevent
document.addEventListener("keydown", function(event) {
    //if zero, exit function
    if (timeLeft === 0) {
    return;
}
//convert all keys to lower case
var key = event.key.toLowerCase();
var alphaNumericChars = "abcdefghijklmnopqrstuvwxyz0123456789".split("");
//test if key pushed is a letter
if (alphaNumericChars.includes(key)) {
    var letterGuess = event.key;
    checkLetters(letterGuess)
    checkWin();
}
});

//add event listener to start button to call startGame function when clicked
startButton.addEventListener("click", startGame);

//calls init when page is opened
init();
