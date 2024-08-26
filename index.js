'use strict';

const gameBoard = (()=> {
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

    function isGoodToSetMarker(marker, place) {
        if (!isValidMarker(marker) || checkIfAMarkAlreadyExists(place) === true) return false;
        return true;
    }

    function setMarker(marker, place) {
        if (isGoodToSetMarker(marker, place) == true) board[place] = `${marker}`;
    }

    function checkIfAMarkAlreadyExists(place){
        if (board[place] === "x" || board[place] === "o") return true;
        else false;
    }

    // function isBoardFull(){
    //     for (let i = 0, len = board.length; i < len; i++) {
    //         if (board[i] === '_') return false;
    //     }
    //     return true;
    // }

    function checkWinner(marker){
        // [x,o,o,x,_,_,x,_,_]
        // [0,1,2,3,4,5,6,7,8]
        const combinations = winningCombinations.showWinningCombinations();
        let winner = false;
        const winningInput = `${marker}${marker}${marker}`;

        // Loop each winning combination
        for (let i = 0, combinationsArrLen = combinations.length; i < combinationsArrLen; i++) {
            let str = "";
            str += board[combinations[i][0]];
            str += board[combinations[i][1]];
            str += board[combinations[i][2]];

            if (str === winningInput) {
                winner = true;
                break;
            }
        }

        return winner;
    }

    return { board, showBoard, setMarker, checkWinner };
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

    const showWinningCombinations = ()=> winningCombinationsArray;

    return {showWinningCombinations};
})();

gameBoard.setMarker("o", 0);
// gameBoard.showBoard();

gameBoard.setMarker("o", 1);
// gameBoard.showBoard();

gameBoard.setMarker("o", 2);
// gameBoard.showBoard();

gameBoard.setMarker("x", 2);
// gameBoard.showBoard();

gameBoard.setMarker("x", 3);
// gameBoard.showBoard();

gameBoard.setMarker("x", 6);
gameBoard.showBoard();

console.log(gameBoard.checkWinner("o"));

// console.log(gameBoard.isBoardFull());