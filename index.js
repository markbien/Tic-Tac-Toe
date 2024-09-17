"use strict";

const gameBoard = (() => {
  const board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const showBoard = () => {
    console.log(`[${board[0]}|${board[1]}|${board[2]}]`);
    console.log(`[${board[3]}|${board[4]}|${board[5]}]`);
    console.log(`[${board[6]}|${board[7]}|${board[8]}]\n`);
  };

  function setMarker(marker, place) {
    place -= 1; // Since array starts from 0
    board[place] = `${marker}`;

    return checkWinner(marker) ? true : false;
  }

  function checkIfAMarkAlreadyExists(place) {
    place -= 1;
    if (board[place] === "x" || board[place] === "o") return true;
    else false;
  }

  // function isBoardFull(){
  //     for (let i = 0, len = board.length; i < len; i++) {
  //         if (board[i] === "x" || board[i] === "o") continue;
  //         else return false;
  //     }
  //     return true;
  // }

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

  return { showBoard, setMarker, checkIfAMarkAlreadyExists };
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
    gameBoard.showBoard();

    gameBoard.setMarker("x", 1);

    gameBoard.showBoard();
  }

  function askForInput(marker) {
    const index = prompt(`Player ${marker}, enter a digit to place marker: `);
    return index;
  }

  return { init };
})();

// function createPlayer(name, marker){
//     const getName = ()=> name;
//     const getMarker = ()=> marker;

//     return { getName, getMarker };
// }

gameHandler.init();
