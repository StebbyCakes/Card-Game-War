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


function game(){
  while (gameBoard.players[0].playerCards.length > 0 || gameBoard.players[1].playerCards.length > 0 || counter < 100){
    counter++
    war();
  } console.log(gameBoard.players);
  if (gameBoard.players[0].playerCards.length < 0) {
    alert('Player 2 Won!!!!');
  }
  if (gameBoard.players[1].playerCards.length < 0) {
    alert('Player 1 Won!!!!');
  }
}

function war() {
  gameBoard.field1[0] = gameBoard.players[0].playerCards[0]
  gameBoard.field2[0] = gameBoard.players[1].playerCards[0]
  if (gameBoard.players[0].playerCards.length < 0) {
    alert('Player 2 Won!!!!');
  }
  if (gameBoard.players[1].playerCards.length < 0) {
    alert('Player 1 Won!!!!');
  }
  gameBoard.players[0].playerCards.shift()
  gameBoard.players[1].playerCards.shift()
  if (gameBoard.field1[0].value > gameBoard.field2[0].value) {
    gameBoard.players[0].playerCards.push(gameBoard.field2[0])
    gameBoard.players[0].playerCards.push(gameBoard.field1[0])
    gameBoard.field1= []
    gameBoard.field2= []
    return
  }
  if (gameBoard.field1[0].value < gameBoard.field2[0].value) {
    gameBoard.players[1].playerCards.push(gameBoard.field2[0])
    gameBoard.players[1].playerCards.push(gameBoard.field1[0])
    gameBoard.field1= []
    gameBoard.field2= []
    return
  }
  if (gameBoard.field1[0].value === gameBoard.field2[0].value) {
    // alert('War!');
    for (i = 0; i < 2; i++) {
      gameBoard.field1[i + 1] = gameBoard.players[0].playerCards[0]
      gameBoard.field2[i + 1] = gameBoard.players[1].playerCards[0]
      gameBoard.players[0].playerCards.shift()
      gameBoard.players[1].playerCards.shift()
      if (gameBoard.players[0].playerCards.length < 0) {
        alert('Player 2 Won!!!!');
      }
      if (gameBoard.players[1].playerCards.length < 0) {
        alert('Player 1 Won!!!!');
      }
    }
    if (gameBoard.field1[gameBoard.field1.length-1].value > gameBoard.field2[gameBoard.field2.length-1].value) {
      for (i = 0; i < 3; i++) {
        gameBoard.players[0].playerCards.push(gameBoard.field2[i])
        gameBoard.players[0].playerCards.push(gameBoard.field1[i])
      }gameBoard.field1= []
      gameBoard.field2= []
      return
    }
    if (gameBoard.field1[gameBoard.field1.length-1].value < gameBoard.field2[gameBoard.field2.length-1].value) {
      for (i = 0; i < 3; i++) {
        gameBoard.players[1].playerCards.push(gameBoard.field2[i])
        gameBoard.players[1].playerCards.push(gameBoard.field1[i])
      }gameBoard.field1= []
      gameBoard.field2= []
      return
    }
    if (gameBoard.field1[gameBoard.field1.length-1].value === gameBoard.field2[gameBoard.field2.length-1].value) {
      worldWar();
    }
  }
}

function worldWar(){
  alert('World War!')
  for (i = 0; i < 2; i++) {
    gameBoard.field1[i + 3] = gameBoard.players[0].playerCards[0]
    gameBoard.field2[i + 3] = gameBoard.players[1].playerCards[0]
    gameBoard.players[0].playerCards.shift()
    gameBoard.players[1].playerCards.shift()
  } if (gameBoard.players[0].playerCards.length < 0) {
    alert('Player 2 Won!!!!');
  }
  if (gameBoard.players[1].playerCards.length < 0) {
    alert('Player 1 Won!!!!');
  }gameBoard.field1 = []
  gameBoard.field2 = []
  return
}
