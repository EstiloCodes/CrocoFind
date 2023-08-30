const time = document.getElementById('timer-value');
const Hscorechanger = document.getElementById('highest-score-value');
const scorechanger = document.getElementById('score-value');
const durationbtns = document.querySelectorAll('.btn.btn-outline-primary'); 
const crocodile = document.getElementById('crocodile');
const instructions = document.getElementById('instructions');
const restartbutton = document.getElementById('restart'); // Add restart button
let timerInterval;
let gameStarted = false; // Flag to track if the game has started
let durationSelected = false; 
let currentScore = 0; // Initialize current score

// Retrieve the highest score from local storage or set it to 0
let highestScore = localStorage.getItem('highestScore') || 0;

function startTimer(durationInSeconds) {
  let secondsRemaining = durationInSeconds;

  function updateTimer() {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    time.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (secondsRemaining === 0) {
      clearInterval(timerInterval);
      crocodile.style.display = 'none'; // Hide the crocodile when the game ends
      instructions.style.display = 'block'; // Show instructions when the game ends
      
      // Check if current score is higher than highest score
      if (currentScore > highestScore) {
        highestScore = currentScore;
        localStorage.setItem('highestScore', highestScore);
        Hscorechanger.textContent = highestScore;
      }
      
      currentScore = 0; // Reset current score
    } else {
      secondsRemaining--;
    }
    
    // Call popUpCrocodileRandomly only if the game has started and duration is selected
    if (gameStarted && durationSelected) {
      popUpCrocodileRandomly();
    }
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

crocodile.style.display = 'none'; // Hide the crocodile initially

durationbtns.forEach(button => {
  button.addEventListener('click', () => {
    if (!durationSelected) {
      instructions.style.display = 'none'; // Hide the instructions
      crocodile.style.display = 'inline-block'; // Show the crocodile when the game starts
      gameStarted = true; // Set the gameStarted flag to true
      durationSelected = true; // Set the durationSelected flag to true
      const durationInSeconds = parseInt(button.getAttribute('data-duration'), 10);
      startTimer(durationInSeconds);
    }
  });
});

restartbutton.addEventListener('click', () => {
  clearInterval(timerInterval);
  crocodile.style.display = 'none';
  instructions.style.display = 'block';
  gameStarted = false;
  durationSelected = false;
  time.textContent = '0:00';
  scorechanger.textContent = '0';
  currentScore = 0; // Reset current score
});

crocodile.addEventListener('click', handleCrocodileClick);

function popUpCrocodileRandomly() {
  const viewportWidth = window.innerWidth;
  const maxWidth = viewportWidth - crocodile.clientWidth;

  const randomLeft = Math.random() * maxWidth;
  const randomBottom = Math.random() * 200; // Adjust this value for the desired vertical position

  crocodile.style.left = `${randomLeft}px`;
  crocodile.style.bottom = `${randomBottom}px`;

  crocodile.style.display = 'inline-block';
}

function handleCrocodileClick() {
  playWaterSplashSound();
  increaseScore();
  crocodile.style.display = 'none'; // Hide the crocodile after clicking

  setTimeout(() => {
    crocodile.style.display = 'block';
    popUpCrocodileRandomly();
  }, 1000); // Show the crocodile after a delay
}

function playWaterSplashSound() {
  const sound = new Audio('assets/watersplash.mp3');
  sound.volume = 0.09;
  sound.play();
}

function increaseScore() {
  currentScore += 1;
  scorechanger.textContent = currentScore;

  // Update highest score if the current score is higher
  if (currentScore > highestScore) {
    highestScore = currentScore;
    localStorage.setItem('highestScore', highestScore);
    Hscorechanger.textContent = highestScore;
  }
}

// Set initial highest score value
Hscorechanger.textContent = highestScore;

// Initial call to start the game

