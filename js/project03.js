document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("game-grid");
  const moveCountDisplay = document.getElementById("move-count");
  const timeElapsedDisplay = document.getElementById("time-elapsed");
  const restartButton = document.getElementById("restart-button");

  const symbols = ["💖", "💎", "🌸", "🌟", "🎀", "🍓", "🦄", "🎉"];
  let cards = [];
  let firstCard = null;
  let secondCard = null;
  let moves = 0;
  let matches = 0;
  let timer = null;
  let secondsElapsed = 0;

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const startGame = () => {
    // Reset game state
    cards = [...symbols, ...symbols]; // Duplicate symbols for pairs
    shuffleArray(cards);
    grid.innerHTML = "";
    moves = 0;
    matches = 0;
    secondsElapsed = 0;
    firstCard = null;
    secondCard = null;
    moveCountDisplay.textContent = moves;
    timeElapsedDisplay.textContent = secondsElapsed;

    // Stop any running timer
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      secondsElapsed++;
      timeElapsedDisplay.textContent = secondsElapsed;
    }, 1000);

    // Create card elements
    cards.forEach(symbol => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.symbol = symbol;
      card.textContent = ""; // Start with empty content
      card.addEventListener("click", () => flipCard(card));
      grid.appendChild(card);
    });
  };

  const flipCard = card => {
    if (card.classList.contains("flipped") || card.classList.contains("matched") || secondCard) {
      return;
    }

    card.classList.add("flipped");
    card.textContent = card.dataset.symbol;

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      moves++;
      moveCountDisplay.textContent = moves;

      if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        // Match found
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        firstCard = null;
        secondCard = null;
        matches++;

        if (matches === symbols.length) {
          clearInterval(timer);
          alert(`You completed the game in ${moves} moves and ${secondsElapsed} seconds!`);
        }
      } else {
        // No match, flip back
        setTimeout(() => {
          firstCard.classList.remove("flipped");
          firstCard.textContent = "";
          secondCard.classList.remove("flipped");
          secondCard.textContent = "";
          firstCard = null;
          secondCard = null;
        }, 1000);
      }
    }
  };

  restartButton.addEventListener("click", startGame);

  // Initialize the game
  startGame();
});
