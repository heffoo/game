let i = 0;
let start;
let Interval;

let appendSeconds = document.getElementById("seconds");
let appendTens = document.getElementById("tens");

function startCounter() {
  tens++;
  if (tens < 9) {
    appendTens.innerHTML = "0" + tens;
  }
  if (tens > 9) {
    appendSeconds.innerHTML = tens;
  }
  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }

  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
  }
}

const cards = document.querySelectorAll(".one-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  clearInterval(Interval);
  Interval = setInterval(startCounter, 10);
  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function unFlipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 700);
}

function checkForMatch() {
  let isMatch = firstCard.dataset.face === secondCard.dataset.face;
  isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function random() {
  cards.forEach((card) => {
    let randomCard = Math.floor(Math.random() * 12);
    card.style.order = randomCard;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
