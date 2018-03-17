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
  }
  hitMe() {
    this.currentPlayer.hit(this.deck.deal())
  }
}


//class player(s)
class Player {
  constructor(name, money) {
    this.name = name
    this.money = money
    this.hand = []
  }
  bet(amount) {
    console.log("bet")
    this.money -= amount
  }
  win(amount) {
    console.log("win")
    this.money += amount
  }
  deal(cards) {
    this.hand = cards
  }
  hit(card) {
    this.hand.push(card)
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







