  const startGameWindow = document.getElementById('startWindow');
  const startBtn = document.getElementById('startBtn');
  const gameWindow = document.getElementById('playingField');
  const congratulationWinow = document.getElementById('end');
  const numberArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

  function generateNumberArray() {
    numberArray.sort(() => Math.random() - 0.5);
    //console.log(numberArray);
  }

  function renderCards() {
    let gameWindow = '';
    numberArray.forEach((element, index) => {
      gameWindow += `<div class="scene">
    <div id=${index} class='card' data-card=${element} onclick='rotationCard(this.id)'>
      <div class="card__face--back card__face"></div>
      <div class="card__face--front card__face">${element}</div>
    </div>
  </div>`
    });
    document.getElementById('gameWindow').innerHTML = gameWindow;
  }

  function startGame() {
    startGameWindow.style.display = 'none';
    generateNumberArray();
    renderCards();
    gameWindow.style.display = 'block'
  }

  function restartGame() {
    congratulationWinow.style.display = 'none'
    generateNumberArray();
    renderCards();
    gameWindow.style.display = 'block'
  }


  let winerCards = 0;
  function victoryCheck() {
    const victoryСards = document.getElementsByClassName('winCard')[0].childElementCount;
    winerCards += victoryСards
    // console.log(winerCards);
    if (winerCards == 12) {
      gameWindow.style.display = 'none';
      congratulationWinow.style.display = 'block';
    }
  }

  let OpenCard = [];

  function checkedQuantityOpenCards() {
    if (OpenCard.length === 2) {
      compareDataCard();
    }
  }

  function rotationCard(id) {
    if (OpenCard.indexOf(id) === -1) {
      const thisCard = document.getElementById(`${id}`);
      thisCard.classList.toggle('is-flipped');

      OpenCard.push(id);
      checkedQuantityOpenCards();
    }
  }


  function compareDataCard() {
    const firstOpenCard = document.getElementById(OpenCard[0]);
    const secondOpenCard = document.getElementById(OpenCard[1]);

    function flippCard() {
      firstOpenCard.classList.toggle('is-flipped');
      secondOpenCard.classList.toggle('is-flipped');
    }
    function winnerCard() {
      firstOpenCard.classList.add('winCard');
      secondOpenCard.classList.add('winCard');
      firstOpenCard.removeAttribute('onclick');
      secondOpenCard.removeAttribute('onclick');
      victoryCheck();
    }


    if (firstOpenCard.dataset.card === secondOpenCard.dataset.card) {
      setTimeout(winnerCard, 450);
    } else {
      setTimeout(flippCard, 1200);
    }
    //console.log(OpenCard);
    OpenCard = [];
  }