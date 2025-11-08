let maxNumber = 100;
let randomNumber = Math.floor(Math.random() * maxNumber) + 1;
let attempts = 0;
let hints = [];
let hintIndex = 0;
let bestScores = JSON.parse(localStorage.getItem("bestScores")) || {};


function setLevel() {
    const level = document.getElementById("level").value;
    maxNumber = Number(level);

    document.getElementById("rangeText").innerHTML =
        `Guess a number between <strong>1</strong> and <strong>${maxNumber}</strong>`;

    resetGame();
    updateScoreboard();
}


function generateHints(number) {
    let hintList = [];


    if (number % 2 === 0) hintList.push("The number is even.");
    else hintList.push("The number is odd.");

    if (number % 3 === 0) hintList.push("The number is divisible by 3.");
    if (number % 5 === 0) hintList.push("The number is divisible by 5.");

  
    hintList.push(`The number is between ${Math.max(1, number - 10)} and ${Math.min(maxNumber, number + 10)}.`);


    if (number > maxNumber / 2) hintList.push("The number is greater than half of the max number.");
    else hintList.push("The number is less than or equal to half of the max number.");

    return hintList.sort(() => Math.random() - 0.5);
}


function showHint() {
    const hintText = document.getElementById("hintText");
    if (hintIndex < hints.length) {
        hintText.textContent = hints[hintIndex];
        hintIndex++;
    } else {
        hintText.textContent = "No more hints!";
    }
}


function checkGuess() {
    const guess = Number(document.getElementById("guessInput").value);
    const message = document.getElementById("message");
    const attemptInfo = document.getElementById("attempts");

    if (!guess || isNaN(guess)) {
        message.textContent = "Please enter a valid number!";
        message.style.color = "#ffffffff";
        return;
    }

    if (guess < 1 || guess > maxNumber) {
        message.textContent = `Enter a number between 1 and ${maxNumber}!`;
        message.style.color = "#f4f3f3ff";
        return;
    }

    attempts++;

    if (guess === randomNumber) {
        message.textContent = `Correct! The number was ${randomNumber}.`;
        message.style.color = "#e4e4e4ff";
        document.getElementById("guessInput").disabled = true;
        showCongratulations();
        updateBestScore();
    } else {
        message.textContent = guess < randomNumber ? "Too low!" : "Too high!";
        message.style.color = "#ffffff";
    }

    attemptInfo.textContent = `Attempts: ${attempts}`;
}


function resetGame() {
    randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    attempts = 0;
    hintIndex = 0;
    hints = generateHints(randomNumber);

    document.getElementById("message").textContent = "";
    document.getElementById("attempts").textContent = "Attempts: 0";
    document.getElementById("guessInput").value = "";
    document.getElementById("guessInput").disabled = false;
    document.getElementById("hintText").textContent = "";


    const congratsBox = document.getElementById("congratsMessage");
    congratsBox.textContent = "";
    congratsBox.style.display = "none";
}


function showCongratulations() {
    const congratsBox = document.getElementById("congratsMessage");
    congratsBox.textContent = "Congratulations.. You guessed the correct number!";
    congratsBox.style.display = "block";
    congratsBox.style.opacity = "1";
}



