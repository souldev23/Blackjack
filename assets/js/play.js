
// Modulo pattern & 'use strict'
(() => {
    'use strict'
    let deck = [];
    const cardTypes = ['C', 'D', 'H', 'S'],
          specialCards = ['A', 'J', 'Q', 'K'];

    let scorePlayers = [];
    // HTML Reference
    const btnStart = document.querySelector('#btnStart'),
          btnGetCard = document.querySelector('#btnGetCard'),
          btnStop = document.querySelector('#btnStop');

    const playerCards = document.querySelector('#player-cards'),
          computerCards = document.querySelector('#computer-cards'),
          dashboards = document.querySelectorAll('small');

    const initGame = (numPlayers = 2) => {
        deck = createDeck();
        for(let i = 0; i < numPlayers; i++){
            scorePlayers.push(0);
        }
    };

    const createDeck = () => {
        deck = [];
        for(let cardType of cardTypes){
            for(let i = 2; i <= 10; i++){
                deck.push(i + cardType);
            }
            for(let specialCard of specialCards){
                deck.push(specialCard + cardType);
            }
        }
    // Reassign the array but reordered by shuffle method from underscore.js
        return _.shuffle(deck);
    };

    const getCard = () => {
        if( deck.length === 0)
            throw "deck doesn't have any cards";        
        return deck.pop();
    };

    const getCardValue = (card) => {
        const val = card.substring(0, card.length - 1);
        return (isNaN(val) ? ((val === 'A') ? 11 : 10) : val * 1);
    };

    const checkScore = () => {
        if (scorePlayer === scoreComputer)
            alert('Draw game.');
        else if (scorePlayer > 21 || (scorePlayer < 21 && scoreComputer === 21) || (scorePlayer < 21 && scoreComputer < 21 && scorePlayer < scoreComputer))
            alert(`I'm sorry, you lose`);
        else if (scorePlayer === 21 || (scorePlayer < 21 && scoreComputer > 21) || (scorePlayer < 21 && scoreComputer < 21 && scorePlayer > scoreComputer))
            alert('Congrats! You won!');
    };

    const computerShift = (minScore) => {
        do{
            const card = getCard();
            scoreComputer = scoreComputer + getCardValue(card);
            dashboards[1].innerText = scoreComputer;
            //<img class="pCard" src="/assets/cards/10S.png">
            const pCard = document.createElement('img');
            pCard.src = `/assets/cards/${ card }.png`;
            pCard.classList.add('pCard');
            computerCards.append(pCard);
            if(scorePlayer > 21)
            {break;}
        }while(scoreComputer < minScore);
        setTimeout(checkScore, 100);
    };

    // Events
    btnStart.addEventListener('click', () => {
        deck = [];
        deck = createDeck();
        scorePlayer = 0;
        dashboards[0].innerText = scorePlayer;
        scoreComputer = 0;
        dashboards[1].innerText = scoreComputer;
        playerCards.innerHTML = '';
        computerCards.innerHTML = '';
        btnGetCard.disabled = false;
        btnStop.disabled = false;
    });
    btnStop.addEventListener('click', () => {
        btnGetCard.disabled = true;
        btnStop.disabled = true;
        computerShift(scorePlayer);
    });
    btnGetCard.addEventListener('click', () => {
        const card = getCard();
        scorePlayer = scorePlayer + getCardValue(card);
        dashboards[0].innerText = scorePlayer;
        //<img class="pCard" src="/assets/cards/10S.png">
        const pCard = document.createElement('img');
        pCard.src = `/assets/cards/${ card }.png`;
        pCard.classList.add('pCard');
        playerCards.append(pCard);
        if(scorePlayer > 21){        
            btnGetCard.disabled = true;
            btnStop.disabled = true;
            computerShift(scorePlayer);
        }else if (scorePlayer === 21){        
            btnGetCard.disabled = true;
            btnStop.disabled = true;
            computerShift(scorePlayer);
        }
    });
})();
