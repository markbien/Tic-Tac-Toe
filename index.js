'use strict';

const gameBoard = (()=> {
    const board = [
        '1','2','3',
        '4','5','6',
        '7','8','9',
    ];

    const showBoard = () => {
        console.log(`[${board[0]}|${board[1]}|${board[2]}]`);
        console.log(`[${board[3]}|${board[4]}|${board[5]}]`);
        console.log(`[${board[6]}|${board[7]}|${board[8]}]\n`);
    }

    const getCurrentMarkerInACell = index => {
        return board[index];
    }

    // function isValidMarker(marker) {
    //     if (marker === "x" || marker === "o") {
    //         return true;
    //     }
    //     return false;
    // }

    // function isValidPlace(place) {
    //     if (place >= 0 && place <= 8) return true;
    //     return false;
    // }

    // function isGoodToSetMarker(marker, place) {
    //     if (!isValidMarker(marker) || !isValidPlace(place) || checkIfAMarkAlreadyExists(place) === true) return false;
    //     return true;
    // }

    function setMarker(marker, place) {
        place -= 1; // Since array starts from 0
        // if (isGoodToSetMarker(marker, place) == true) {
        //     board[place] = `${marker}`;
        //     return true;
        // // }
        // else return false;
        board[place] = `${marker}`;
    }

    // function checkIfAMarkAlreadyExists(place){
    //     if (board[place] === "x" || board[place] === "o") return true;
    //     else false;
    // }

    // function isBoardFull(){
    //     for (let i = 0, len = board.length; i < len; i++) {
    //         if (board[i] === "x" || board[i] === "o") continue;
    //         else return false;
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
            let str = `${board[combinations[i][0]]}${board[combinations[i][1]]}${board[combinations[i][2]]}`;
            if (str === winningInput) {
                winner = true;
                break;
            }
        }
        return winner;
    }

    return { showBoard, setMarker, checkWinner, getCurrentMarkerInACell };
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

const gameHandler = (()=> {
    function init(){
        const player1 = createPlayer("Player 1", "x");
        // const player2 = createPlayer(askForName("Player 2"), "o");

        gameBoard.showBoard();

        gameBoard.setMarker(player1.getMarker(), 1);

        gameBoard.showBoard();

        gameBoard.setMarker(player1.getMarker(), 4);

        gameBoard.showBoard();

        gameBoard.setMarker(player1.getMarker(), 7);

        gameBoard.showBoard();

        console.log(gameBoard.checkWinner(player1.getMarker()));
    }

    return { init };
})();

function createPlayer(name, marker){
    const getName = ()=> name;
    const getMarker = ()=> marker;

    return { getName, getMarker };
}

// gameBoard.setMarker("o", 0);
// // gameBoard.showBoard();

// gameBoard.setMarker("o", 1);
// // gameBoard.showBoard();

// gameBoard.setMarker("o", 2);
// // gameBoard.showBoard();

// gameBoard.setMarker("x", 2);
// // gameBoard.showBoard();

// gameBoard.setMarker("x", 3);
// // gameBoard.showBoard();

// gameBoard.setMarker("x", 6);
// gameBoard.showBoard();

// console.log(gameBoard.checkWinner("o"));

// // console.log(gameBoard.isBoardFull());

gameHandler.init(); 
// console.log(gameBoard.isBoardFull());