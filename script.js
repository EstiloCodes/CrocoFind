const time = document.getElementById('timer-value');
const Hscorechanger = document.getElementById('highest-score-value');
const scorechanger = document.getElementById('score-value');
const durationbtns = document.querySelectorAll('.btn.btn-outline-primary'); 
const crocodile = document.getElementById('crocodile');
const instructions = document.getElementById('instructions');
const restartbutton = document.getElementById('restart'); 
let timerInterval;
let gameStarted = false; 
let durationSelected = false; 
let currentScore = 0; 


let highestScore = localStorage.getItem('highestScore') || 0;

function startTimer(durationInSeconds) {
  let secondsRemaining = durationInSeconds;

  function updateTimer() {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    time.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (secondsRemaining === 0) {
      clearInterval(timerInterval);
      crocodile.style.display = 'none'; 
      instructions.style.display = 'block'; 
      
      
      if (currentScore > highestScore) {
        highestScore = currentScore;
        localStorage.setItem('highestScore', highestScore);
        Hscorechanger.textContent = highestScore;
      }
      
      currentScore = 0; 
    } else {
      secondsRemaining--;
    }
    
    
    if (gameStarted && durationSelected) {
      popUpCrocodileRandomly();
    }
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

crocodile.style.display = 'none'; 

durationbtns.forEach(button => {
  button.addEventListener('click', () => {
    if (!durationSelected) {
      instructions.style.display = 'none'; 
      crocodile.style.display = 'inline-block'; 
      gameStarted = true; 
      durationSelected = true; 
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
  currentScore = 0; 
});

crocodile.addEventListener('click', handleCrocodileClick);

function popUpCrocodileRandomly() {
  const viewportWidth = window.innerWidth;
  const maxWidth = viewportWidth - crocodile.clientWidth;

  const randomLeft = Math.random() * maxWidth;
  const randomBottom = Math.random() * 200; 

  crocodile.style.left = `${randomLeft}px`;
  crocodile.style.bottom = `${randomBottom}px`;

  crocodile.style.display = 'inline-block';
}

function handleCrocodileClick() {
  playWaterSplashSound();
  increaseScore();
  crocodile.style.display = 'none'; 

  setTimeout(() => {
    crocodile.style.display = 'block';
    popUpCrocodileRandomly();
  }, 1000); 
}

function playWaterSplashSound() {
  const sound = new Audio('assets/watersplash.mp3');
  sound.volume = 0.09;
  sound.play();
}

function increaseScore() {
  currentScore += 1;
  scorechanger.textContent = currentScore;

  
  if (currentScore > highestScore) {
    highestScore = currentScore;
    localStorage.setItem('highestScore', highestScore);
    Hscorechanger.textContent = highestScore;
  }
}


Hscorechanger.textContent = highestScore;



