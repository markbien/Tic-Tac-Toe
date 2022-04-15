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
            const cellToFill = $(`.cell[data-index="${num}"]`);
            cellToFill.classList.add(input);
            cellToFill.dataset.value = input;            
        }
    }

    // checks that input is  only x and o
    const checkInput = input => {
        if(input === 'x' || input === 'o'){
            return input;
        }
    }

    const resetGame = ()=> {
        _board = [];
        cells.forEach(cell => {
            cell.classList.remove('x');
            cell.classList.remove('o');
        });
        $('.announcement-container').classList.remove('show');
    };

    $('.controls > button').addEventListener('click', resetGame);


    // Array.from(cells).forEach(cell => {
    //     cell.addEventListener('click', ()=> {
    //         setField(cell.dataset.index, currentPlayer);
    //     });
    // });

    const getBoard = ()=> _board;

    return { setField, resetGame, getBoard, _winningCombinations }
})();



const displayController = (()=>{
    const player1 = Player('x');
    const player2 = Player('o');

    let activePlayer = true;
    let currentClass;

    function nextPlayer() {
        activePlayer = !activePlayer;

        if(activePlayer){
            $('.cell-container').classList.toggle('o');
            $('.cell-container').classList.toggle('x');
        } else {
            $('.cell-container').classList.toggle('x');
            $('.cell-container').classList.toggle('o');
        }
    }

    const markCell = (cell)=> {
        currentClass = activePlayer ? player1.getSign() : player2.getSign();
        cell.classList.add(currentClass);
    }

    const checkWin = (currentClass, cells) => {
        return gameBoard._winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(currentClass);
            });
        });
    }

    $$('.cell').forEach(cell=> {
        cell.addEventListener('click', ()=> {
            markCell(cell);
            gameBoard.setField(cell.dataset.index, currentClass);
            if(checkWin(currentClass, $$('.cell'))) {
                $('.announcement-container').classList.add('show');
                $('.announce-winner > h1 > span').textContent = currentClass.toUpperCase();
            }
            nextPlayer();
        }, {once: true});
    });

    return {checkWin};
})();