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




//deck class

class Deck {
  constructor(numDecks) {
    console.log("deck constructor")
    this.cards = []
    this.used = []
    for (let i = 0; i < suits.length; i++) {
      for (let a = 0; a < values.length; a++) {
        this.cards.push({ value: values[a], suit: suits[i] })
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







