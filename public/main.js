//class game
class Blackjack {
  constructor(decks) {
    console.log("blackjack")
    decks = decks || 1
    this.deck = new Deck(decks)
    this.players = []
    this.house = new House
    this.currentPlayerIndex = 0
  }
  addPlayer(name, money) {
    this.players.push(new Player(name, money))
  }
  get currentPlayer() {
    if (isHousesTurn()) {
      return this.house
    }
    return this.players[this.currentPlayerIndex]
  }
  dealCards() {
    console.log("dealcards")
    this.currentPlayerIndex = 0
    this.deck.shuffle()
    for (let i = 0; i < this.players.length; i++) {
      const cards = [this.deck.deal(), this.deck.deal()]
      this.players[i].deal(cards)
    }
    const cards = [this.deck.deal(), this.deck.deal()]
    this.house.deal(cards)
    while (this.currentPlayer && this.currentPlayer.hasBlackjack()) {
      this.currentPlayerIndex++
    }
  }
  hitMe() {
    if (this.currentPlayer.canHit()) {
      this.currentPlayer.hit(this.deck.deal())
      this.checkForPlayerBust()
    }
  }
  stay() {
    this.currentPlayerIndex++
  }
  checkForPlayerBust() {
    if (this.currentPlayer.isBusted()) {
      this.currentPlayerIndex++
    }
  }
  isHousesTurn() {
    console.log("notturn")
    return this.currentPlayerIndex >= this.players.length
  }
  playHouse() {
    console.log("I get to use a while loop")
    while(this.currentPlayer.canHit() && this.currentPlayer.score < 17) {
      this.hitMe() 
    }
    this.scoreGame() 
  }
  scoreGame() {
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i]
      if(player.hasBlackjack() && this.house.hasBlackjack()) {
        continue
      } else if(player.hasBlackjack) {
        player.win(Math.floor(1.5*player.bet))
      } else if(!player.isBusted() && player.score > house.score) {
        player.win(player.bet)
      } else if(!player.isBusted() && player.score === house.score) {
        continue 
      } else {
        player.lose()
      }
    }
  }
}

//class player(s)
class Player {
  constructor(name, money) {
    this.name = name
    this.money = money
    this.hand = []
    this.valueForAce = 1
    this.bet = 0
  }
  scoreFor(card) {
    switch (card.value) {
      case "K":
      case "Q":
      case "J":
        return 10
      case "A":
        return this.valueForAce
      default:
        return parseInt(card.value)
    }
  }
  get score() {
    console.log("get score")
    let total = 0
    for (let i = 0; i < this.hand.length; i++) {
      total += this.scoreFor(this.hand[i])
    }
    return total
  }
  hasBlackjack() {
    return this.score === 21
  }
  makeBet(amount) {
    console.log("bet")
    this.bet = amount
  }
  lose() {
    console.log("lose")
    this.money -= this.bet
  }
  win(amount) {
    console.log("win")
    this.money += amount
  }
  deal(cards) {
    this.hand = cards
    this.valueForAce = 1
  }
  canHit() {
    return this.hand.length < 5 && !this.isBusted()
  }
  hit(card) {
    this.hand.push(card)
  }
  chooseValueForAce(choice) {
    console.log("choice")
    this.valueForAce = choice
  }
  isBusted() {
    console.log("busted")
    return this.score > 21
  }

}

//class house
class House extends Player {
  constructor() {
    console.log("house")
    super("House", 0)
  }

}


//build deck
const suits = ["spades", "clubs", "hearts", "diamonds"]
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

//deck class
class Deck {
  constructor(numDecks) {
    console.log("deck constructor")
    this.cards = []
    this.used = []
    numDecks = numDecks || 1
    for (let d = 0; d < numDecks; d++) {
      for (let i = 0; i < suits.length; i++) {
        for (let a = 0; a < values.length; a++) {
          this.cards.push({ value: values[a], suit: suits[i] })
        }
      }
    }
  }

  shuffle() {
    console.log("shuffle")
    this.cards.concat(this.used)
    this.used = []
    for (let i = 0; i < 1000; i++) {
      const location1 = Math.floor(Math.random() * this.cards.length)
      const location2 = Math.floor(Math.random() * this.cards.length)
      const tmp = this.cards[location1]
      this.cards[location1] = this.cards[location2]
      this.cards[location2] = tmp
    }
  }

  deal() {
    console.log("deal")
    const result = this.cards.pop()
    this.used.push(result)
    return result
  }

}

//As a user I should be able to see three buttons for each player
const gameStart = () => {
    const game = new Blackjack
}


document.addEventListener('DOMContentLoaded', gameStart)






//document.querySelector(".players .deal").addEventListener("click", () => {
//  // playerChoice(0, "deal")
// })
// document.querySelector(".players .hit").addEventListener("click", () => {
//   playerChoice(0, "hit")
// })
// document.querySelector(".players .stay").addEventListener("click", () => {
//   playerChoice(0, "stay")
// })
// document.querySelector(".players .playAgain").addEventListener("click", () => {
//   playerChoice(0, "playAgain")
// })


// document.querySelector("").addEventListener("click", choseWinner)