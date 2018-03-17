const blackjack = {
  winner: "",
  choices: ["deal", "hit", "stay"],
  players: [
    {
      choice: ""

    },
    {
      choice: ""

    }
  ]
}


//build deck
const suits = ["spades", "clubs", "hearts", "diamonds"]
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]


//create deck
const getDeck = () => {
  const deck = []
  for (let i = 0; i < suits.length; i++) {
    for (let a = 0; a < values.length; a++) {
      deck.push({ value: values[a], suit: suits[i] })
    }
  }
  return deck
}


//shuffle deck
const shuffle = () => {
  for (let i = 0; i < 1000; i++) {
    const location1 = Math.floor(Math.random() * deck.length)
    const location2 = Math.floor(Math.random() * deck.length)
    const tmp = deck[location1]

    deck[location1] = deck[location2]
    deck[location2] = tmp
  }
}

//create players




//deal the hand





//As a user I should be able to see three buttons for each player
const gameStart = () => {
  document.querySelector(".players .deal").addEventListener("click", () => {
    playerChoice(0, "deal")
  })
  document.querySelector(".players .hit").addEventListener("click", () => {
    playerChoice(0, "hit")
  })
  document.querySelector(".players .stay").addEventListener("click", () => {
    playerChoice(0, "stay")
  })
  document.querySelector(".players .playAgain").addEventListener("click", () => {
    playerChoice(0, "playAgain")
  })


  document.querySelector("").addEventListener("click", choseWinner)
}



//below is more time consuming and confusing. keep to attempt class tonight

//build deck
//interface Card { 
//   suit: string
// rank: string
//limit: number 
//} 

//interface DeckOptions
//{ 
//   extend: Card[] 
// suits: string[]
//ranks: string[] 
//multiply: number 
//}

//create deck
//Class Deck
//{ 
//  private _opt: DeckOptions;

//cards: Card[];
//constructor(opt: Object = {})
//{
//this._opt = {
//extend: opt['extend'] || [],
//suits: opt['suits'] || ['spades', 'hearts', 'diamonds', 'clubs'],
//ranks: opt['ranks'] || ['ace', 'king', 'queen', 'jack', '10', '9', '8', '7', '6', '5', '4', '3', '2'],
//multiply: opt['multiply'] || 1
//};

//if (this._opt.multiply < 1)
//this._opt.multiply = 1;
//this.shuffle();
//}

//shuffle deck
//shuffle()
//{
//this.cards = [];

//for (let i = 0; i < this._opt.multiply; i++) {
//for (let suit of this._opt.suits) {
//for (let rank of this._opt.ranks) {
//this.inlay({ suit: suit, rank: rank });
//}
//}
//for (let card of this._opt.extend) {
//if (!card.limit || i < card.limit)
//this.inlay({ suit: card.suit, rank: card.rank });
//}
//}
//}

//}



