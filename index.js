'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const Player = sign => {
    const _sign = sign;
    
    const getSign = ()=> _sign;

    return { getSign }
}

const gameBoard = (()=>{
    const cells = $$('.cell');
    const cellContainer = $('.cell-container');

    // creates the board array to hold values
    let _board = new Array(9);

    // reference for winning values
    const _winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    // set the value for the chosen field
    // input player sign to array and DOM
    const setField = (num, marker) => {
        const input = checkInput(marker);

        // ensures that chosen field is not filled yet
        if(input){
            _board[num] = input;
            // const cellToFill = $(`.cell[data-index="${num}"]`);
            // cellToFill.classList.add(input);
            // cellToFill.dataset.value = input;            
        }
    }

    // checks that input is only x and o
    const checkInput = input => {
        if(input === 'x' || input === 'o'){
            return input;
        }
    }

    // resets the game
    const resetGame = ()=> {
        // sets the value of the _board back to 0
        _board = [];
        _board = new Array(9);
        // removes x and o classes for all cells
        cells.forEach(cell => {
            if(cell.classList.contains('x')) {
                cell.classList.remove('x');
            } 
            if(cell.classList.contains('o')) {
                cell.classList.remove('o');
            }
            // if(cell.dataset.value) {
            //     delete cell.dataset.value;
            // }
        });
        // hides the announcement window
        $('.announcement-container').classList.remove('show');

        // removes the o class from the board
        if(cellContainer.classList.contains('o')) cellContainer.classList.remove('o');
        // checks if the cell contains has the x class, if not, add it
        if(!cellContainer.classList.contains('x')) cellContainer.classList.add('x');

        // resets active player
        displayController.resetValues();
    };

    // adds event listener to the reset button
    $('.controls > button').addEventListener('click', resetGame);

    // returns the board
    const getBoard = ()=> _board;

    return { setField, resetGame, getBoard, _winningCombinations }
})();



const displayController = (()=>{
    // creates the players
    const player1 = Player('x');
    const player2 = Player('o');

    const cellContainer = $('.cell-container');

    // checks if the player1 is the active player
    let activePlayer = true;

    let currentClass;

    function nextPlayer() {
        // reverses the activePlayer, from true to false, vice versa
        activePlayer = !activePlayer;

        cellContainer.classList.toggle('o');
        cellContainer.classList.toggle('x');
    }

    const resetValues = ()=> {
        if(!activePlayer) activePlayer = true;
        currentClass = undefined;
    }

    // responsible for adding classes to the cells
    const markCell = (cell)=> {
        // if active player is true, player1 is the current player
        currentClass = activePlayer ? player1.getSign() : player2.getSign();
        // then add player1's sign to the current cell
        cell.classList.add(currentClass);
    }

    // responsible for checking who's the winner
    // is ran everytime the user clicks on a cell to check for winning combinations
    const checkWin = (currentClass, cells) => {
        // checks if SOME of the combination matches
        // [0,1,2],[3,4,5],[6,7,8] etc.
        return gameBoard._winningCombinations.some(combination => {
            // checks that EVERY index of the current combination matches
            return combination.every(index => {
                // checks if every index of the current combination HAS either x or o class
                return cells[index].classList.contains(currentClass);
            });
        });
    }

    // responsible for adding event listeners to the cells
    $$('.cell').forEach(cell=> {
        cell.addEventListener('click', ()=> {
            // adds the mark to the cell
            if(!cell.classList.contains(currentClass)){
                markCell(cell);

                // adds the x or o to the gameBoard array
                gameBoard.setField(cell.dataset.index, currentClass);
                if(checkWin(currentClass, $$('.cell'))) {
                    // shows the announcement board
                    $('.announcement-container').classList.add('show');
                    // shows who the winner is
                    $('.announce-winner > h1 > span').textContent = currentClass.toUpperCase();
                }

                nextPlayer();
            }
        });
    });

    return {checkWin, resetValues};
})();