// Estado do jogo: elementos da tela, variáveis e ações
const state = {
  view: {
    squares: document.querySelectorAll(".square"), // Quadrados do jogo
    enemy: document.querySelector(".enemy"), // Inimigo
    timeLeft: document.querySelector("#time-left"), // Tempo restante
    score: document.querySelector("#score"), // Pontuação
    life: document.querySelector("#life"), // Pontos de vida
  },
  values: {
    gameVelocity: 1000, // Velocidade do jogo
    hitPosition: 0, // Posição do inimigo
    result: 0, // Pontuação
    curretTime: 20, // Tempo restante
    lifePoints: 5, // Pontos de vida
  },
  actions: {
    timerId: setInterval(randomSquare, 1000), // Atualiza a posição do inimigo
    countDownTimerId: setInterval(countDown, 1000), // Atualiza o tempo restante
  },
};

// Decrementa o tempo e finaliza o jogo quando acabar
function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    playSound("game-over.mp3");
    clearInterval(state.actions.countDownTimerId); // Para o contador de tempo
    clearInterval(state.actions.timerId); // Para o movimento do inimigo
    alert("Game Over! O seu resultado foi: " + state.values.result); // Exibe a pontuação
  }
}

// Reproduz um som
function playSound(audioName) {
  let audio = new Audio(`./src/sounds/${audioName}`);
  audio.volume = 0.2; // Ajusta o volume
  audio.play(); // Reproduz o som
}

// Escolhe aleatoriamente um quadrado para o inimigo aparecer
function randomSquare() {
  state.view.squares.forEach((square) => square.classList.remove("enemy")); // Remove o inimigo dos quadrados

  let randomNumber = Math.floor(Math.random() * 9); // Gera número aleatório
  let randomSquare = state.view.squares[randomNumber]; // Escolhe quadrado aleatório
  randomSquare.classList.add("enemy"); // Adiciona a classe 'enemy'
  state.values.hitPosition = randomSquare.id; // Atualiza a posição do inimigo
}

// Adiciona evento de clique para verificar acertos
function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) { // Acerto no inimigo
        state.values.result++;
        state.view.score.textContent = state.values.result; // Atualiza a pontuação
        state.values.hitPosition = null; // Reseta a posição do inimigo
        playSound("coins.mp3");
      } else {
        state.values.lifePoints--;
        state.view.life.textContent = state.values.lifePoints; // Atualiza pontos de vida
        playSound("damage.mp3");

        // Se a vida acabar, termina o jogo
        if (state.values.lifePoints <= 0) {
          playSound("game-over.mp3");
          clearInterval(state.actions.countDownTimerId); // Para o temporizador
          clearInterval(state.actions.timerId); // Para o movimento do inimigo
          alert("Game Over! Você perdeu todos os pontos de vida."); // Alerta de fim de jogo
        }
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
}

initialize(); // Inicia o jogo

// Função para mover o inimigo
function init() {
  moveEnemy();
}

init(); // Inicia o movimento do inimigo
