"use strict";

const gameBoard = (() => {
  const board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  function setMarker(marker, place) {
    place -= 1; // Since array starts from 0
    board[place] = `${marker}`;
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
    setMarker,
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
    setTimeout(()=>{
      // Set 200ms timeout to allow html to load for a bit
    },200)
    const playerX = createPlayer(addDefaultNameIfBlank(), "x");
    const playerY = createPlayer(addDefaultNameIfBlank(), "o");

    addPlayerToArray(playerX);
    addPlayerToArray(playerY);

    addEventListenerToCells();
    domHandler.changeNameNameBasedOnTurnInDom(
      playerX.getName(),
      playerX.getMarker()
    );
  }

  function addDefaultNameIfBlank(){
    let playerName = prompt("Enter name for Player 1", "Guest");
    if (playerName === null || playerName === "") {
      playerName = "Guest";
    }
    return playerName;
  }

  const cells = document.querySelectorAll(".box");

  function addEventListenerToCells() {
    cells.forEach((cell) => {
      cell.addEventListener("click", function () {
        const dataCellNumber = cell.getAttribute("data-cell");

        gameBoard.setMarker(showCurrentMarker(), dataCellNumber);

        domHandler.changeFromNumberToMarker(
          showCurrentMarker(),
          dataCellNumber
        );

        const currentPlayerName = getNameOfCurrentPlayer();
        if (gameBoard.checkWinner(showCurrentMarker())) {
          domHandler.changeNameNameBasedOnTurnInDom(
            currentPlayerName,
            showCurrentMarker()
          );

          // Adding timeout so that alert will not occur before the board in UI updates
          setTimeout(function () {
            alert(
              `Player: ${currentPlayerName} has won the game! Click OK to restart the game.`
            );
            location.reload(); // Refresh the page
          }, 50);
        }

        if (gameBoard.isBoardFull() && gameBoard.checkWinner(showCurrentMarker()) === false) {
          setTimeout(function () {
            alert(`The game is tie! Press OK to restart the game.`);
            location.reload(); // Refresh the page
          }, 50);
        }

        swapTurns();
        const nextPlayerName = getNameOfCurrentPlayer();
        domHandler.changeNameNameBasedOnTurnInDom(
          nextPlayerName,
          showCurrentMarker()
        );
      }, {
        once: true,
      });
    });
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

document.addEventListener("DOMContentLoaded", function(event) { 
  gameHandler.init();
});