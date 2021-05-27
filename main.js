var counter = 0;
class Card {
  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
  }
}
class Deck {
  constructor() {
    this.cards = [];
  }
  createDeck() {
    let suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
    let ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.cards.push(new Card(suits[i], ranks[j], values[j]));
      }
    }
  }
  shuffleDeck() {
    let location1, location2, tmp;
    for (let i = 0; i < 1000; i++) {
      location1 = Math.floor((Math.random() * this.cards.length));
      location2 = Math.floor((Math.random() * this.cards.length));
      tmp = this.cards[location1];
      this.cards[location1] = this.cards[location2];
      this.cards[location2] = tmp;
    }
  }
}
class Player {
  constructor(name) {
    this.playerName = name;
    this.playerCards = [];
  }
}
class Board {
  constructor() {
    this.field1 = [];
    this.field2 = [];
    this.players = [];
  }
  start(playerOneName, playerTwoName) {
    this.players.push(new Player(playerOneName));
    this.players.push(new Player(playerTwoName));
    let d = new Deck();
    d.createDeck();
    d.shuffleDeck();
    this.players[0].playerCards = d.cards.slice(0, 26);
    this.players[1].playerCards = d.cards.slice(26, 52);
  }
}
let gameBoard = new Board();
gameBoard.start('Player1', 'Player2');
game();

function game() {
  while (gameBoard.players[0].playerCards.length > 1 && gameBoard.players[1].playerCards.length > 1) {
     // had these && as || before
    war();
  }
  console.log(gameBoard.players);
    // in case game ends suddenly
  if (gameBoard.players[0].playerCards.length <= 0) {
    for (i = 0; i < gameBoard.field2.length; i++) {
      gameBoard.players[1].playerCards.push(gameBoard.field2[i])

    }for (i = 0; i < gameBoard.field1.length; i++) {
      gameBoard.players[1].playerCards.push(gameBoard.field1[i])

    }
    alert('Player 2 Won!!!!');
    console.log("Player 2 wins")
  }
  if (gameBoard.players[1].playerCards.length <= 0) {
    for (i = 0; i < gameBoard.field2.length; i++) {
      gameBoard.players[0].playerCards.push(gameBoard.field2[i])
// if card is undefined continue
    }for (i = 0; i < gameBoard.field1.length; i++) {
      gameBoard.players[0].playerCards.push(gameBoard.field1[i])
    }
    alert('Player 1 Won!!!!');
    console.log("Player 1 wins")
  }
}

function war() {
  // this assigns the first card on field for each player & removes from players hands
  gameBoard.field1[0] = gameBoard.players[0].playerCards[0]
  gameBoard.field2[0] = gameBoard.players[1].playerCards[0]
  gameBoard.players[0].playerCards.shift()
  gameBoard.players[1].playerCards.shift()
  // check in case players dont have cards to play
  if (gameBoard.players[0].playerCards.length < 1) {
    alert('Player 2 Won!!!!');
  }
  if (gameBoard.players[1].playerCards.length < 1) {
    alert('Player 1 Won!!!!');
  }
  // check for = value on the card on the field
  var checkCard = true;
  // if cards are === then adds 2 more cards to fields
  while (checkCard) {
    if (gameBoard.field1[0].value === gameBoard.field2[0].value) {
      alert('War!');
      checkCard = true;
      // checks if player1 has less than one card(or no cards) && pushes cards from fields to players2
      if (gameBoard.players[0].playerCards.length < 1) {
        for (i = 0; i < gameBoard.field2.length; i++) {
          gameBoard.players[1].playerCards.push(gameBoard.field2[i])

        }
        for (i = 0; i < gameBoard.field1.length; i++) {
          gameBoard.players[1].playerCards.push(gameBoard.field1[i])
        }
        // clearing the fields for noDupe
        gameBoard.field1=[]
        gameBoard.field2=[]
        break;
      }
      // checks if player2 has less than one card(or no cards) && pushes cards from fields to players1
      if (gameBoard.players[1].playerCards.length < 1) {
        for (i = 0; i < gameBoard.field2.length; i++) {
          gameBoard.players[0].playerCards.push(gameBoard.field2[i])
        }
        for (i = 0; i < gameBoard.field1.length; i++) {
          gameBoard.players[0].playerCards.push(gameBoard.field1[i])
        }
        gameBoard.field1=[]
        gameBoard.field2=[]
        // break in place so if cards are undefined, get out of while loop before bugs galore(pushing more undefined cards into player fields)
        break;
      }
      // adds 2 cards to each players field and removes cards from player hands
      for (i = 0; i < 2; i++) {
        gameBoard.field1.push(gameBoard.players[0].playerCards[0]);
        gameBoard.field2.push(gameBoard.players[1].playerCards[0]);
        gameBoard.players[0].playerCards.shift()
        gameBoard.players[1].playerCards.shift()
      }
      // in case card values are not the same exit while loop
    } else {
      checkCard = false;
    }
  }
  // ends game once players have less than 1 card
  if (gameBoard.field1.length < 1 || gameBoard.field2.length < 1){
return;
}
// check is player has bigger value card than other & pushes field cards into hands
  if (gameBoard.field1[gameBoard.field1.length - 1].value > gameBoard.field2[gameBoard.field2.length - 1].value) {
    for (i = 0; i < gameBoard.field1.length; i++) {
      gameBoard.players[0].playerCards.push(gameBoard.field2[i])
      gameBoard.players[0].playerCards.push(gameBoard.field1[i])
    }
    gameBoard.field1 = []
    gameBoard.field2 = []
    return
  }
  // check is player has bigger value card than other & pushes field cards into hands
  if (gameBoard.field1[gameBoard.field1.length - 1].value < gameBoard.field2[gameBoard.field2.length - 1].value) {
    for (i = 0; i < gameBoard.field2.length; i++) {
      gameBoard.players[1].playerCards.push(gameBoard.field2[0])
      gameBoard.players[1].playerCards.push(gameBoard.field1[0])
    }
    gameBoard.field1 = []
    gameBoard.field2 = []
    return
  }

}
