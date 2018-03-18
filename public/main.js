//class game
class Blackjack {
  constructor(callBack) {
    console.log("blackjack")
    this.cb = callBack
    this.deck = new Deck()
    this.players = []
    this.house = new House
    this.currentPlayerIndex = 0
  }
  changeNumberOfDecks(numDecks) {
    this.deck = new Deck(numDecks)
    this.dealCards()
  }
  addPlayer(name, money) {
    const player = new Player(name, money)
    this.players.push(player)
    return player
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
      this.cb(this.players[i])
    }
    const cards = [this.deck.deal(), this.deck.deal()]
    this.house.deal(cards)
    this.cb(this.house)
    while (this.currentPlayer && this.currentPlayer.hasBlackjack()) {
      this.currentPlayerIndex++
      this.cb(this.currentPlayer)
    }
  }
  hitMe() {
    if (this.currentPlayer.canHit()) {
      this.currentPlayer.hit(this.deck.deal())
      this.cb(this.currentPlayer)
      this.checkForPlayerBust()
    }
  }
  stay() {
    this.currentPlayerIndex++
    this.cb(this.currentPlayer)
  }
  checkForPlayerBust() {
    if (this.currentPlayer.isBusted()) {
      this.currentPlayerIndex++
      this.cb(this.currentPlayer)
    }
  }
  isHousesTurn() {
    console.log("notturn")
    return this.currentPlayerIndex >= this.players.length
  }
  playHouse() {
    console.log("I get to use a while loop")
    while (this.currentPlayer.canHit() && this.currentPlayer.score < 17) {
      this.hitMe()
    }
    this.scoreGame()
  }
  scoreGame() {
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i]
      if (player.hasBlackjack() && this.house.hasBlackjack()) {
        continue
      } else if (player.hasBlackjack) {
        player.win(Math.floor(1.5 * player.bet))
      } else if (!player.isBusted() && player.score > house.score) {
        player.win(player.bet)
      } else if (!player.isBusted() && player.score === house.score) {
        continue
      } else {
        player.lose()
      }
      this.cb(player)
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

class playerRenderer {
  
}

//As a player .when the page loads I should be able to play a game of blackjack
const gameStart = () => {
  const playerTracker = ()
  const renderPlayer = (changedPlayer) => {

  }
  const game = new Blackjack(renderPlayer)
  document.querySelector("#addPlayer").addEventListener("click", () => {
    const playerName = document.querySelector(".playerName").value
    const playerStartingMoney = document.querySelector(".playerStartingMoney").value
    const player = game.addPlayer(playerName, playerStartingMoney)
  })
  document.querySelector("#hitButton").addEventListener("click", game.hitMe)
  document.querySelector("#stayButton").addEventListener("click", game.stay)
  document.querySelector("#dealButton").addEventListener("click", game.dealCards)
  document.querySelector("#splitButton").addEventListener("click", game.split)
}
document.addEventListener('DOMContentLoaded', gameStart)