"use strict";

const gameBoard = (() => {
  const board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const showBoard = () => {
    const str = `[${board[0]}|${board[1]}|${board[2]}]\n[${board[3]}|${board[4]}|${board[5]}]\n[${board[6]}|${board[7]}|${board[8]}]\n`;
    return str;
  };

  function setMarker(marker, place) {
    place -= 1; // Since array starts from 0
    board[place] = `${marker}`;
  }

  function checkIfAMarkAlreadyExists(place) {
    place -= 1;
    if (board[place] === "x" || board[place] === "o") return true;
    else false;
  }

  function isBoardFull() {
    for (let i = 0, len = board.length; i < len; i++) {
      if (board[i] === "x" || board[i] === "o") continue;
      else return false;
    }
    return true;
  }

  function checkWinner(marker) {
    const combinations = winningCombinations.showWinningCombinations();
    const winningInput = `${marker}${marker}${marker}`;

    const isThereAWinner = combinations.some((com) => {
      let userInput = `${board[com[0]]}${board[com[1]]}${board[com[2]]}`;
      if (winningInput === userInput) {
        return true;
      }
    });

    return isThereAWinner ? true : false;
  }

  return {
    showBoard,
    setMarker,
    checkIfAMarkAlreadyExists,
    checkWinner,
    isBoardFull,
  };
})();

const winningCombinations = (() => {
  const winningCombinationsArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const showWinningCombinations = () => winningCombinationsArray;

  return { showWinningCombinations };
})();

const gameHandler = (() => {
  function init() {
    const playerX = createPlayer("Mark", "x");
    const playerY = createPlayer("Jacque", "o");

    alert(gameBoard.showBoard());

    while (true) {
      // if (gameBoard.isBoardFull() === true) {
      //   alert("Board is full, game is a tie!");
      //   break;
      // }

      if (isWinnerInThisTurn(playerX) === true) break;
      if (isWinnerInThisTurn(playerY) === true) break;
    }

    alert(gameBoard.showBoard());
  }

  function isWinnerInThisTurn(player) {
    const playerInput = askForInput(player.getMarker());
    gameBoard.setMarker(player.getMarker(), playerInput);
    alert(gameBoard.showBoard());
    if (gameBoard.checkWinner(player.getMarker()) === true) {
      alert(`Congratulations Player: ${player.getName()}, you won the game!`);
      return true;
    }
    return false;
  }

  function askForInput(marker) {
    while (true) {
      const index = prompt(`Player ${marker}, enter a digit to place marker: `);
      if (gameBoard.checkIfAMarkAlreadyExists(index) === true) {
        alert("Digit already has a marker! Select another digit.");
        continue;
      }
      return index;
    }
  }

  return { init };
})();

function createPlayer(name, marker) {
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker };
}

// gameHandler.init();

const domHandler = (() => {
  function changeFromNumberToMarker(marker, index) {
    const cells = document.querySelectorAll(".text-box");
    const markerImage = document.createElement("img");
    markerImage.src = `img/${marker}.png`;
    cells[index].innerHTML = "";
    cells[index].appendChild(markerImage);
  }

  function changeNameNameBasedOnTurnInDom(name, marker){
    const turnDiv = document.querySelector('.turn');
    const playerName = document.querySelector('.player-name');
    const playerMarker = document.querySelector('.marker');
    playerName.textContent = name;
    playerMarker.textContent = marker;

    if (marker === 'x') {
      turnDiv.style.backgroundColor = "greenyellow";
    }
    else if(marker === "o") {
      turnDiv.style.backgroundColor = "yellow";
    }
  }

  return { changeFromNumberToMarker, changeNameNameBasedOnTurnInDom };
})();

domHandler.changeNameNameBasedOnTurnInDom("Jacque", "o");