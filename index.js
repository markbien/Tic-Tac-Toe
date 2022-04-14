// const gameController = (function(){
//     'use strict';
//     const $ = document.querySelector.bind(document);
    
//     const winnerContainer = $('.announcement-container');
//     const announceWinner = $('.announce-winner');
//     const showWinner = function(){
//         winnerContainer.style.display = 'flex';
//         setTimeout(()=>{
//             winnerContainer.classList.add('transition');
//             announceWinner.classList.add('transition');
//         }, 100);
//     }
        
//     winnerContainer.addEventListener('transitionend', e=>{
//         if(e.propertyName === "padding-bottom"){
//             setTimeout(()=>{
//                 winnerContainer.classList.remove('transition');
//                 announceWinner.classList.remove('transition');
//             }, 2500);
    
//             setTimeout(()=>{
//                 winnerContainer.style.display = 'none';
//             }, 3250);
//         }
//     });

//     return { showWinner };
// })();