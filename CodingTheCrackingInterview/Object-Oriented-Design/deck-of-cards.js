const stdin = process.stdin;

var Suits = {
    'diamonds': 0,
    'hearts': 1,
    'clubs': 2,
    'spades': 3,
    names: {
        0: 'diamonds',
        1: 'hearts', 
        2: 'clubs',
        3: 'spades'
    }
}

class Card {
    constructor(faceValue, suit) {
        this.faceValue = faceValue;
        this.suit = Suits[suit];
        this.available = true;
    }
    
    getSuit() {
        return this.suit;
    }

    getValue() {
        if (this.faceValue < 10) {
            return this.faceValue;
        } else {
            return 10;
        }
    }

    isAvailable() {
        return this.available;
    }

    markAvailable() {
        this.available = true;
    }

    markUnavailable() {
        this.available = false;
    }
}

class Hand {
    constructor() {
        this.cards = [];
    }

    addCard(card) {
        console.log('regular hand: addCard');
        this.cards.push(card);
    }

    removeCard(card) {
        this.cards.forEach((val, i) => {
            if (val === card) {
               this.cards.splice(i, 1); 
            }
        }, this);
    }

    getCards() {
        return this.cards;
    }

    getScore() {
        let score = 0;
        for (let i = 0; i < this.cards.length; i++) {
            score += this.cards[i].getValue();
        }

        return score;
    }

    size() {
        return this.cards.length;
    }
}

class BlackJackHand extends Hand {
    constructor() {
        super();
        this.bust = false;
        this.fold = false;
        this.score = 0;
        this.numAces = 0;
    } 

    busted() {
        return this.bust;
    }

    addCard(card) {
        console.log('ADD CARD!!!');
        super.addCard(card);

        if (card.getValue() === 1) {    // ace
            this.numAces++;
        }

        this.score += card.getValue() === 1 ? 11 : card.getValue();

        if (this.score > 21 && this.numAces > 0) {  // convert ace from 11 to 1
            this.score -= 10;
            this.numAces--;
        }

        this.bust = this.score > 21 ? true : false;

        console.log('hand: ', this, 'card: ', card);

    }

    fold() {
        this.fold = true;
    }

    folded() {
        return this.fold;
    }
}

class Deck {
    constructor(gameType) {
        this.deck = [];
        this.maxSize = 52;
        this.empty = false;
        this.game = gameType;
        
        this.createDeck();
    }

    createDeck() {
        let cardsAvailable = []

        for (let i = 0; i < this.maxSize; i++) {
            cardsAvailable.push(i);
        }
        
        for(let i = 0; i < this.maxSize; i++) {
            let value = this.removeRandomCard(cardsAvailable);
            let faceValue = Math.floor(value / 4);
            let suit = value - faceValue;
            let newCard = new Card(faceValue + 1, Suits.names[suit]);
            this.deck.push(newCard);
        }
    }

    removeRandomCard(cardsAvailable) {
        let numAvailable = cardsAvailable.length;
        let availableIndex = Math.floor(Math.random() * numAvailable);
        let randCard = cardsAvailable.splice(availableIndex, 1);

        return randCard[0];
    }

    shuffle() {
        let cardsAvailable = this.deck.slice();
        
        this.deck = [];
        for(let i = 0; i < cardsAvailable.length; i++) {
            let card = this.removeRandomCard(cardsAvailable);
            this.deck.push(card);
        }
    }

    dealCard() {
        return this.deck.pop();
    }

    dealHand(num) {
        let hand;
        if (this.game === 'blackjack') {
            hand = new BlackJackHand();
        } else {
            hand = new Hand();
        }

        for (let i = 0; i < num; i++) {
            hand.addCard(this.deck.pop());
        }

        return hand;
    }

    addCard(card) {
        this.deck.push(card)
    }

    getSize() {
        return this.deck.length;
    }
}

class BlackJack {
    constructor(numPlayers) {
        this.deck = new Deck('blackjack');
        this.playerHands = [this.deck.dealHand(2)]; // dealer is in zeroth position
        this.gameOver = false;
        this.stillPlaying = numPlayers + 1;
        this.currTurn = 1;

        for (let i = 0; i < numPlayers; i++) {
            this.playerHands.push(this.deck.dealHand(2));
        }
    }

    turn() {
        let numPlayers = this.playerHands.length;
        let currPlayer = this.currTurn < numPlayers ? this.playerHands[this.currTurn++] : this.playerHands[0];
        console.log('currTurn: ', this.currTurn, ' , numPlayers: ', numPlayers)
        this.currTurn = this.currTurn % numPlayers;

        console.log('currPlayer: ', currPlayer, ', currTurn: ', this.currTurn);
        if (currPlayer.busted() || currPlayer.folded()) {    // player has lost
            return;
        } else {
            console.log('else: input: ', input, 'input===hit', input === "hit/n");
            // player does their turn
            if (input == "fold") {
                console.log('FOLD');
                currPlayer.fold();
            } else if (input == "hit") {
                console.log('HITME');
                currPlayer.addCard(this.deck.dealCard());
            }
        }

        // console.log('players after turn: ', this.playerHands);
        if (this.stillPlaying === 0) {
            console.log('Game Over: winner=', gameOver());
        }
    }

    gameOver() {
        return findWinner();
    }

    findWinner() {
        let winners = [];
        let highestScore = 0;
        for (let i = 0; i < this.playerHands.length; i++) {
            let player = this.playerHands[i];
            if (player.getScore() >= highestScore) {
                if (player.getScore === highestScore) {
                    winners.push(player);
                } else {
                    winners = [player];
                }
                highestScore = player.getScore();
            }
        }

        return winners;
    }
}

var input = "";

function main() {
    let game = new BlackJack(1);

    stdin.on('data', function(data) {
        // User input exit.
        if(data === 'exit\n'){
            // Program exit.
            console.log("User input complete, program exit.");
            process.exit();
        }else
        {
            // Print user input in console.
            // console.log('before turn players: ', game.playerHands);
            input = data.toString('utf-8');
            input = input.slice(0, input.length - 2);
            game.turn();
        }
    });
}

main();