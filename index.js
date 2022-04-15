const Player = sign => {
    const _sign = sign;
    
    const getSign = ()=> _sign;

    return { getSign }
}

const gameBoard = (()=>{
    const $ = document.querySelector.bind(document);

    let _board = new Array(9);
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



    const getField = num => _board[num];

    const setField = (num, player) => {
        const cellToFill = $(`.cell:nth-child(${num + 1})`);
        cellToFill.classList.add(player);
        cellToFill.dataset.value = player;
        _board[num] = player;
    }

    const checkArr = ()=> {
        console.log(_board);
    }

    return { getField, setField, checkArr }
})();



const displayController = (()=>{

})();