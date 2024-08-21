'use strict';

const gameBoard = (()=> {
    // const board = [
    //     '1','2','3',
    //     '4','5','6',
    //     '7','8','9',
    // ];

    const board = [
        '_','_','_',
        '_','_','_',
        '_','_','_',
    ];

    // const showBoard = ()=> board;
    const showBoard = () => {
        console.log(`[${board[0]}|${board[1]}|${board[2]}]`);
        console.log(`[${board[3]}|${board[4]}|${board[5]}]`);
        console.log(`[${board[6]}|${board[7]}|${board[8]}]`);
    }

    function isValidMarker(marker) {
        if (marker === "x" || marker === "o") {
            return true;
        }
        return false;
    }

    function setMarker(marker, place) {
        if (!isValidMarker(marker) || checkIfAMarkAlreadyExists(place) === true) return false;
        board[place] = `${marker}`;
        return true;
    }

    function checkIfAMarkAlreadyExists(place){
        if (board[place] === "x" || board[place] === "o") return true;
        else false;
    }

    return { board, showBoard, setMarker };
})();

const winningCombinations = (()=> {
    const winningCombinationsArray = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
})();

gameBoard.setMarker("x", 0);
gameBoard.showBoard();

gameBoard.setMarker("o", 1);
gameBoard.showBoard();

gameBoard.setMarker("o", 2);
gameBoard.showBoard();