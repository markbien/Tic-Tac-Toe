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
  let isPlayerOnesTurn = true;
  let currentMarker = "x";
  const players = [];

  function addPlayerToArray(player) {
    players.push(player);
  }

  function showPlayers() {
    return players;
  }

  function swapTurns() {
    isPlayerOnesTurn = !isPlayerOnesTurn;
    swapMarker();
  }

  function showCurrentTurn() {
    return isPlayerOnesTurn;
  }

  function swapMarker() {
    if (showCurrentTurn()) {
      currentMarker = "x";
    } else {
      currentMarker = "o";
    }
  }

  function showCurrentMarker() {
    return currentMarker;
  }

  function init() {
    // const playerX = createPlayer(prompt("Enter name for Player 1"), "x");
    // const playerY = createPlayer(prompt("Enter name for Player 2"), "o");
    const playerX = createPlayer("Mark", "x");
    const playerY = createPlayer("Jac", "o");

    addPlayerToArray(playerX);
    addPlayerToArray(playerY);

    addEventListenerToCells();
    domHandler.changeNameNameBasedOnTurnInDom(
      playerX.getName(),
      playerX.getMarker()
    );
  }
  
  const cells = document.querySelectorAll(".box");
  function addEventListenerToCells() {    
    cells.forEach((cell) => {
      cell.addEventListener("click", function(){
        addMarkerAndSetToBoard(cell)
      });
    });
  }

  function addMarkerAndSetToBoard(cell) {
    const dataCellNumber = cell.getAttribute("data-cell");
    if (gameBoard.checkIfAMarkAlreadyExists(dataCellNumber)) {
      alert(
        "You can't add another marker to this cell! Please select another cell."
      );
      return;
    }

    gameBoard.setMarker(showCurrentMarker(), dataCellNumber);

    domHandler.changeFromNumberToMarker(showCurrentMarker(), dataCellNumber);

    const currentPlayerName = getNameOfCurrentPlayer();
    if (gameBoard.checkWinner(showCurrentMarker())) {
      alert(`Player: ${currentPlayerName} has won the game! Click OK to restart the game.`);
      location.reload();
    }

    swapTurns();
    const nextPlayerName = getNameOfCurrentPlayer();
    domHandler.changeNameNameBasedOnTurnInDom(
      nextPlayerName,
      showCurrentMarker()
    );
  }

  function getNameOfCurrentPlayer() {
    return showCurrentTurn()
      ? showPlayers()[0].getName()
      : showPlayers()[1].getName();
  }
  return { init };
})();

function createPlayer(name, marker) {
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker };
}

const domHandler = (() => {
  function changeFromNumberToMarker(marker, index) {
    index -= 1;
    const cells = document.querySelectorAll(".text-box");
    const markerImage = document.createElement("img");
    markerImage.src = `img/${marker}.png`;
    cells[index].innerHTML = "";
    cells[index].appendChild(markerImage);
  }

  function changeNameNameBasedOnTurnInDom(name, marker) {
    const turnDiv = document.querySelector(".turn");
    const playerName = document.querySelector(".player-name");
    const playerMarker = document.querySelector(".marker");
    playerName.textContent = name;
    playerMarker.textContent = marker;

    if (marker === "x") {
      turnDiv.style.backgroundColor = "greenyellow";
    } else if (marker === "o") {
      turnDiv.style.backgroundColor = "yellow";
    }
  }

  return { changeFromNumberToMarker, changeNameNameBasedOnTurnInDom };
})();

gameHandler.init();
