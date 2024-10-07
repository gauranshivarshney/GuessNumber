let randomNumber = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const para = document.querySelector('.lowOrHi');
const result = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if(playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault();
        const guessValue = parseInt(userInput.value);
        validateGuess(guessValue);
    })
}

function validateGuess(guessValue){
    if(isNaN(guessValue)){
        alert('Please enter a valid number.');
    }
    else if(guessValue < 1){
        alert('Please enter a value more than one.');
    }
    else if(guessValue > 100){
        alert('Please enter a value less than 100.');
    }
    else{
        prevGuess.push(guessValue);
        if(numGuess > 10){
            displayGuess(guessValue);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endGame();
        }
        else{
            displayGuess(guessValue);
            checkGuess(guessValue);
        }
    }
}

function checkGuess(guessValue){
    if(guessValue === randomNumber){
        displayMessage(`You guessed it right`);
        endGame();
    }
    else if(guessValue < randomNumber){
        displayMessage(`Number is lower`);
    }
    else{
        displayMessage(`Number is higher`);
    }
}

function displayGuess(guessValue){
    userInput.value = '';
    guessSlot.innerHTML += `${guessValue}  `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message){
    para.innerHTML = `<h3>${message}</h3>`;
}

function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h3 id="newGame" style="color: green; border: 1px solid white; width: 200px; height: 30px; padding-top: 5px; margin-left: 150px; cursor: pointer;"> Start new Game!!</h3>`
    result.appendChild(p);
    playGame = false;
    newGame();
}

function newGame(){
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function(e){
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess}`;
        para.innerHTML = '';
        userInput.removeAttribute('disabled');
        result.removeChild(p);
        playGame = true;
    })
}