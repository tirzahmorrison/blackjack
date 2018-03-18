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
    if (this.isHousesTurn()) {
      return this.house
    }
    return this.players[this.currentPlayerIndex]
  }
  dealCards() {
    console.log("dealcards")
    this.currentPlayerIndex = 0
    this.deck.shuffle()
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].splitFrom) {
        this.players[i].finishSplit()
        this.players.splice(i, 1)
      }
      if (!this.players[i]) {
        continue
      }
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
  split() {
    console.log("split work")
    if (this.currentPlayer.canSplit()) {
      const splitPlayer = new Player(this.currentPlayer.name, this.currentPlayer.bet, this.currentPlayer)
      splitPlayer.makeBet(this.currentPlayer.bet)
      const cards = this.currentPlayer.hand
      this.currentPlayer.deal([this.deck.deal(), cards[0]])
      splitPlayer.deal([this.deck.deal(), cards[1]])
      this.players.splice(this.currentPlayerIndex + 1, 0, splitPlayer)
      this.cb(this.currentPlayer)
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
      } else if (player.hasBlackjack()) {
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
  constructor(name, money, splitFrom) {
    this._name = name
    this.money = money
    this.hand = []
    this.valueForAce = 1
    this.bet = 0
    this.splitFrom = splitFrom
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
  get name() {
    console.log("-split name")
    if (this.splitFrom) {
      return this._name + "-split"
    }
    return this._name
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
  canSplit() {
    console.log("can split")
    return this.hand.length === 2 && this.hand[0].value === this.hand[1].value
  }
  finishSplit() {
    console.log("give money back")
    this.splitFrom.win(this.money)
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

class PlayerRenderer {
  constructor(watchedPlayer) {
    this.watchedPlayer = watchedPlayer
    const playersArea = document.querySelector("#players-area")
    this.template = document.querySelector(".templates #player > section").cloneNode(true)
    this.template.classList.add(this.watchedPlayer.name)
    playersArea.appendChild(this.template)
    this.template.querySelector(".playerBet").addEventListener("blur", () => { this.makeBet() })
    this.render()
  }
  render() {
    this.template.querySelector("h1").textContent = this.watchedPlayer.name
    this.template.querySelector(".playerMoney").textContent = this.watchedPlayer.money
    this.template.querySelector(".player-score span").textContent = this.watchedPlayer.score
    this.template.querySelector(".playerBet").value = this.watchedPlayer.bet
  }
  makeBet() {
    const newBet = this.template.querySelector(".playerBet").value
    this.watchedPlayer.makeBet(parseInt(newBet))
  }
}

//As a player .when the page loads I should be able to play a game of blackjack
const gameStart = () => {
  const playerTracker = {}
  const renderPlayer = (changedPlayer) => {
    playerTracker[changedPlayer.name].render()
  }
  const game = new Blackjack(renderPlayer)
  playerTracker[game.house.name] = new PlayerRenderer(game.house)
  document.querySelector("#addPlayer").addEventListener("click", () => {
    const playerName = document.querySelector(".playerName").value
    const playerStartingMoney = document.querySelector(".playerStartingMoney").value
    const player = game.addPlayer(playerName, playerStartingMoney)
    const render = new PlayerRenderer(player)
    playerTracker[player.name] = render
  })
  document.querySelector("#hitButton").addEventListener("click", game.hitMe)
  document.querySelector("#stayButton").addEventListener("click", game.stay)
  document.querySelector("#dealButton").addEventListener("click", game.dealCards)
  document.querySelector("#splitButton").addEventListener("click", game.split)
}
document.addEventListener('DOMContentLoaded', gameStart)