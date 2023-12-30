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

window.onload = function () {
  generateInput();
};
