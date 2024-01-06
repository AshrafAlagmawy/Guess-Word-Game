// Setting Game Name
let gameName = 'Guess The Word';
document.title = gameName;
document.querySelector('h1').innerHTML = gameName;
document.querySelector(
  'footer'
).innerHTML = `${gameName} Game &copy; Created By Ashraf Alagmawy`;

// Setting Game Options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1; // Active try
let numberOfHints = 2;

// Manage Words
let wordToGuess = '';
let words = [
  'Create',
  'Update',
  'Delete',
  'Master',
  'Branch',
  'Mainly',
  'Elzero',
  'School',
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(wordToGuess);

// Message Area
let messageArea = document.querySelector('.message');

// Manage Hints
document.querySelector('.hint span').innerHTML = numberOfHints;
const getHintButton = document.querySelector('.hint');
getHintButton.addEventListener('click', getHint);

function generateInput() {
  const inputsContainer = document.querySelector('.inputs');

  // Create Main Try Div
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement('div');
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add('disabled-inputs');

    // Create Inputs
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute('maxlength', 1);
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }

  // Focus On The First Try Element
  inputsContainer.children[0].children[1].focus();

  // Disabled All Inputs Except The First One
  const inputsInDisabledDiv = document.querySelectorAll(
    '.disabled-inputs input'
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  // Convert All Inputs To Uppercase
  const inputs = document.querySelectorAll('input');
  inputs.forEach((input, index) => {
    input.addEventListener('input', function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      // Checking If The Next Input Exist
      if (nextInput) nextInput.focus();
    });

    // Using keyboard arrows
    input.addEventListener('keydown', function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target); // Or this
      // Going to the next input using arrow right
      if (event.key === 'ArrowRight') {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }

      // Going to the previous input using arrow left
      if (event.key === 'ArrowLeft') {
        const previousInput = currentIndex - 1;
        if (previousInput >= 0) inputs[previousInput].focus();
      }
    });
  });
}

const guessButton = document.querySelector('.check');

guessButton.addEventListener('click', handleGuesses);

// Game Word Check Function (Logic)
function handleGuesses() {
  let successGuess = true;
  console.log(wordToGuess);
  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    // Game Logic
    if (letter === actualLetter) {
      // Letter Is Correct And In The Right PLace
      inputField.classList.add('correct');
    } else if (wordToGuess.includes(letter) && letter !== '') {
      // Letter Is Correct But Not In The Right PLace
      inputField.classList.add('not-in-place');
      successGuess = false;
    } else {
      // Letter Is Not Correct
      inputField.classList.add('wrong');
      successGuess = false;
    }
  }

  // Check If User Win Or Lose
  if (successGuess) {
    // Success Guess
    messageArea.innerHTML = `You Win 🥳, The Word Is <span>${wordToGuess}</span>`;

    if (numberOfHints === 2) {
      messageArea.innerHTML = `<p>Congrats 🎉, You Didn't Use Hints</p>`;
    }

    // Add Disabled Class To All Tries Divs
    let allTries = document.querySelectorAll('.inputs > div');
    allTries.forEach((tryDiv) => tryDiv.classList.add('disabled-inputs'));

    // Disable Guess Button & Hint Button
    guessButton.disabled = true;
    getHintButton.disabled = true;
  } else {
    // Wrong Guess
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add('disabled-inputs');
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInputs.forEach((input) => (input.disabled = true));

    currentTry++;

    const nextTryInput = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInput.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);

    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.add('disabled-inputs');
      el.children[1].focus();
    } else {
      guessButton.disabled = true;
      getHintButton.disabled = true;
      messageArea.innerHTML = `You Lose The Game 😭, The Word Is <span>${wordToGuess}</span>`;
    }
  }
}

function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector('.hint span').innerHTML = numberOfHints;
  }

  if (numberOfHints === 0) {
    getHintButton.disabled = true;
  }

  const enabledInputs = document.querySelectorAll('input:not([disabled])');

  const emptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ''
  );

  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);

    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}

function handleBackSpace(event) {
  if (event.key === 'Backspace') {
    const inputs = document.querySelectorAll('input:not([disabled])');
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.value = '';
      prevInput.value = '';
      prevInput.focus();
    }
  }
}

document.addEventListener('keydown', handleBackSpace);

window.onload = function () {
  generateInput();
};
