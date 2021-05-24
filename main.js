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
  while (gameBoard.players[0].playerCards.length > 1 && gameBoard.players[1].playerCards.length > 1 && counter < 1000) { // had these && as || before
    counter++
    war();
  }
  console.log(gameBoard.players);
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
  gameBoard.players[0].playerCards.shift()
  gameBoard.players[1].playerCards.shift()
  if (gameBoard.players[0].playerCards.length < 1) {
    alert('Player 2 Won!!!!');
  }
  if (gameBoard.players[1].playerCards.length < 1) {
    alert('Player 1 Won!!!!');
  }
  var checkCard = true;
  while (checkCard){
    if (gameBoard.field1[0].value === gameBoard.field2[0].value) {
    alert('War!');
    checkCard = true;
    if (gameBoard.players[0].playerCards.length < 1) {
      for (i = 0; i < gameBoard.field2.length; i++){
      gameBoard.players[1].playerCards.push(gameBoard.field2[i])
      gameBoard.players[1].playerCards.push(gameBoard.field1[i])
    }
      alert('Player 2 Won!!!!');
      break;
    }
    if (gameBoard.players[1].playerCards.length < 1) {
      for (i = 0; i < gameBoard.field1.length; i++){
      gameBoard.players[0].playerCards.push(gameBoard.field2[i])
      gameBoard.players[0].playerCards.push(gameBoard.field1[i])
    }
      alert('Player 1 Won!!!!');
      break;
    }
    for (i = 0; i < 2; i++) {
      gameBoard.field1[i + 1] = gameBoard.players[0].playerCards[0]
      gameBoard.field2[i + 1] = gameBoard.players[1].playerCards[0]
      gameBoard.players[0].playerCards.shift()
      gameBoard.players[1].playerCards.shift()
    }
  } else {
    checkCard = false;
  }
}
  if (gameBoard.field1[gameBoard.field1.length-1].value > gameBoard.field2[gameBoard.field2.length-1].value) {
    for (i = 0; i < gameBoard.field1.length; i++){
    gameBoard.players[0].playerCards.push(gameBoard.field2[i])
    gameBoard.players[0].playerCards.push(gameBoard.field1[i])
  }
    gameBoard.field1 = []
    gameBoard.field2 = []
    return
  }
  if (gameBoard.field1[gameBoard.field1.length-1].value < gameBoard.field2[gameBoard.field2.length-1].value) {
    for (i = 0; i < gameBoard.field2.length; i++) {
    gameBoard.players[1].playerCards.push(gameBoard.field2[0])
    gameBoard.players[1].playerCards.push(gameBoard.field1[0])
  }
    gameBoard.field1 = []
    gameBoard.field2 = []
    return
  }

}


// Teacher Solution

// (function(){
//   'use strict';
// const Card = function({
//   value,
//   suit
// } = {}) {
//   this.value = value;
//   this.suit = suit;
// }
// Card.prototype.print = function() {
//   const suits = [
//     'spades',
//     'diamonds',
//     'clubs',
//     'hearts'
//   ];
//   const values = [
//     null,
//     null,
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//     "10",
//     "J",
//     "Q",
//     "K",
//     "A",
//   ]
//
//   return `${values[this.value]} of ${suits[this.suits][0].toUpperCase()}${suits[this.suit].slice(1)}}`;
// }
// const Deck = function() {
//   this.cards = [];
//   this.suits = ['Clubs', 'Hearts', 'Spades', 'Diamonds'];
//   for (let i = 0; i < 4; i++) { // this is the suit and there are 4
//     for (let j = 2; j <= 14; j++) { // this is setting the first card with value of 2 with all 4 suits and ending with Ace having a value of 14
//       this.cards.push(new Card({
//         suit: i,
//         value: j
//       }))
//     }
//   }
// }
// const Player = function({name} = {}) {
//   this.name = name;
//   this.hand = [];
//   this.cardCount = 0;
//   this.draw = null;
//
// }
//
// const Game = function() {
//   const player1 = prompt(`Enter player one's name`);
//   const player2 = prompt(`Enter player two's name`);
//
//   this.player1 = new Player({
//     name: player1
//   }); // this could be written in shorthand if the key is the same as the value
//   this.player2 = new Player({
//     name: player2
//   }); // this could be written in shorthand if the key is the same as the value
//   this.deck = new Deck
//   this.pot = [];
// }
//
// Game.prototype.shuffle = function(deck) {
//   let i = deck.length, j, temp;
//   while (i--) { // i is 52 because it is set to deck.length so i-- goes down from 52 to 0 which would be the whole deck
//     j = Math.floor(Math.random() * (i + 1));
//     temp = deck[i];
//     deck[i] = deck[j];
//     deck[j] = temp;
//   }
// }
//
// Game.prototype.deal = function() {
//   this.shuffle(this.deck.cards);
//   this.player1.hand = this.deck.cards.filter(function(item, index) {
//     return !(index % 2); // this gives the remainder of the number and if it doesnt have one so its 0 this function will return it to true
//   });
//   this.player2.hand = this.deck.cards.filter(function(item, index) {
//     return index % 2;
//   });
//
//   this.player1.cardCount = this.player1.hand.length;
//   this.player2.cardCount = this.player2.hand.length;
// }
//
// Game.prototype.draw = function(){
//   const player1Card = this.player1.hand.shift();
//   const player2Card = this.player2.hand.shift();
//
//   this.player1.cardCount -= 1;
//   this.player2.cardCount -= 1;
//
//   if(!this.player1.cardCount) {
//     this.shuffle(this.player1.hand);
//   }
//   if(!this.player2.cardCount) {
//     this.shuffle(this.player2.hand);
//   }
//   this.player1.draw = player1Card;
//   this.player2.draw = player2Card;
//
//   this.pot = [player1Card, player2Card, ...this.pot];
//   console.log(`${this.player1.name} draws a ${player1Card.print()}.`)
//   console.log(`${this.player2.name} draws a ${player1Card.print()}.`)
// }
//
// Game.prototype.play = function() {
//   this.shuffle(this.deck.cards);
//   this.deal();
//   console.log(`Let's play WAR!`);
//   console.log(`\n`);
//   game.draw();
// }
//
//
// const game = new Game();
// game.play();
// })();
